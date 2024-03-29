import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {useAlert} from "react-alert";
import {Carousel} from "react-bootstrap";

import {getProductDetails, clearErrors, newReview} from "../../redux/actions/productActions";
import Loader from "../layouts/Loader";
import MetaData from "../layouts/MetaData";
import {addItemToCart} from "../../redux/actions/cartActions";
import {NEW_REVIEW_RESET} from "../../redux/constants/productConstants";
import ListReviews from "./ListReviews";

interface CustomHTMLLIElement extends HTMLLIElement {
  starValue: number;
}

const ProductDetails = ({match}: {match: {params: {id: string}}}): JSX.Element => {
  //  console.log({match});
  const dispatch: Dispatch = useDispatch();
  const alert = useAlert();

  const {loading, error, product} = useSelector((state: State) => state.productDetails);
  const {user} = useSelector((state: State) => state.auth);
  const {error: reviewError, success} = useSelector((state: State) => state.newReview);

  const [quantity, setQuantity] = React.useState<number>(1);
  const [rating, setRating] = React.useState<any>(0);
  const [comment, setComment] = React.useState<string>("");

  React.useEffect(() => {
    dispatch(getProductDetails(match.params.id));

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Review posted successfully");
      dispatch({type: NEW_REVIEW_RESET});
    }
  }, [alert, dispatch, error, match.params.id, reviewError, success]);

  const increaseQty = () => {
    const count = document.querySelector(".count") as HTMLInputElement;

    if (count?.valueAsNumber >= product.stock) return null;

    const qty = count.valueAsNumber + 1;
    setQuantity(qty);
  };

  const decreaseQty = () => {
    const count = document.querySelector(".count") as HTMLInputElement;

    if (count.valueAsNumber <= 1) return null;

    const qty = count.valueAsNumber - 1;
    setQuantity(qty);
  };

  const addToCart = () => {
    dispatch(addItemToCart(match.params.id, quantity));
    alert.success("Item Added to Cart");
  };

  function setUserRatings() {
    const stars = document.querySelectorAll(".star");
    // console.log({stars});

    stars.forEach((star, index) => {
      (star as CustomHTMLLIElement).starValue = index + 1;

      ["click", "mouseover", "mouseout"].forEach(function (event) {
        star.addEventListener(event, showRatings);
      });
    });

    function showRatings(this: any, event: {type: string}) {
      stars.forEach((star, index) => {
        if (event.type === "click") {
          if (index < this.starValue) {
            star.classList.add("orange");
            // console.log("this.starValue:", this.starValue);
            setRating(this.starValue);
          } else {
            star.classList.remove("orange");
          }
        }
        if (event.type === "mouseover") {
          if (index < this.starValue) {
            star.classList.add("yellow");
          } else {
            star.classList.remove("yellow");
          }
        }
        if (event.type === "mouseout") {
          star.classList.remove("yellow");
        }
      });
    }
  }

  const reviewHandler = () => {
    const formData = new FormData();
    formData.set("rating", rating);
    formData.set("comment", comment);
    formData.set("productId", match.params.id);
    dispatch(newReview(formData));
  };

  return (
    <React.Fragment>
      {loading ? (
        <Loader />
      ) : (
        <React.Fragment>
          <MetaData title={product.name} />
          <div className="row f-flex justify-content-around">
            <div className="col-12 col-lg-5 img-fluid" id="product_image">
              <Carousel pause="hover">
                {product.images &&
                  product.images.map((image: {public_id: string; url: string}) => (
                    <Carousel.Item key={image.public_id}>
                      <img className="d-block w-100" src={image.url} alt={product.title} />
                    </Carousel.Item>
                  ))}
              </Carousel>
            </div>

            <div className="col-12 col-lg-5 mt-5">
              <h3>{product.name}</h3>
              <p id="product_id">Product # {product._id}</p>
              <hr />
              <div className="rating-outer">
                <div className="rating-inner" style={{width: `${(product.ratings / 5) * 100}%`}}></div>
              </div>
              <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>
              <hr />
              <p id="product_price">${product.price}</p>
              <div className="stockCounter d-inline">
                <span className="btn btn-danger minus" onClick={decreaseQty}>
                  -
                </span>
                <input
                  type="number"
                  className="form-control count d-inline noArrows"
                  value={quantity}
                  readOnly={true}
                  style={{width: "5rem"}}
                />
                <span className="btn btn-primary plus" onClick={increaseQty}>
                  +
                </span>
              </div>
              <button
                type="button"
                id="cart_btn"
                className="btn btn-primary d-inline ml-4"
                disabled={product.stock === 0}
                onClick={addToCart}
              >
                Add to Cart
              </button>
              <hr />
              <p>
                Status:{" "}
                <span id="stock_status" className={product.stock > 0 ? "greenColor" : "redColor"}>
                  {product.stock > 0 ? "In Stock" : "Out of Stock"}
                </span>
                <span
                  id="stock_status"
                  className={product.stock > 1 ? "greenColor" : "redColor"}
                  style={product.stock === 1 ? {color: "orange"} : {color: ""}}
                >
                  (quantity: {product.stock})
                </span>
              </p>
              <hr />
              <h4 className="mt-2">Description:</h4>
              <p>{product.description}</p>
              <hr />
              <p id="product_seller mb-3">
                Sold by: <strong>{product.seller}</strong>
              </p>
              {user ? (
                <button
                  id="review_btn"
                  type="button"
                  className="btn btn-primary mt-4"
                  data-toggle="modal"
                  data-target="#ratingModal"
                  onClick={setUserRatings}
                >
                  Add Your Review
                </button>
              ) : (
                <div className="alert alert-danger mt-5" data-type="alert">
                  Login to post your review.
                </div>
              )}

              <div className="row mt-2 mb-5">
                <div className="rating w-50">
                  <div
                    className="modal fade"
                    id="ratingModal"
                    tabIndex={-1}
                    role="dialog"
                    aria-labelledby="ratingModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog" role="document">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="ratingModalLabel">
                            Submit Review
                          </h5>
                          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div className="modal-body">
                          <ul className="stars">
                            <li className="star">
                              <i className="fa fa-star"></i>
                            </li>
                            <li className="star">
                              <i className="fa fa-star"></i>
                            </li>
                            <li className="star">
                              <i className="fa fa-star"></i>
                            </li>
                            <li className="star">
                              <i className="fa fa-star"></i>
                            </li>
                            <li className="star">
                              <i className="fa fa-star"></i>
                            </li>
                          </ul>
                          <textarea
                            name="review"
                            id="review"
                            className="form-control mt-3"
                            value={comment}
                            onChange={(event) => setComment(event.target.value)}
                          ></textarea>
                          <button
                            className="btn my-3 float-right review-btn px-4 text-white"
                            onClick={reviewHandler}
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {product.reviews && product.reviews.length > 0 && <ListReviews reviews={product.reviews} />}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default ProductDetails;
