import React from "react";
import {MDBDataTable} from "mdbreact";
import {useAlert} from "react-alert";
import {useDispatch, useSelector} from "react-redux";

import MetaData from "../layouts/MetaData";
import Loader from "../layouts/Loader";
import Sidebar from "./Sidebar";

import {getProductReviews, deleteReview, clearErrors} from "../../redux/actions/productActions";
import {DELETE_REVIEW_RESET} from "../../redux/constants/productConstants";

const ProductReviews = (): JSX.Element => {
  const [productId, setProductId] = React.useState<string>("");

  const alert = useAlert();
  const dispatch: Dispatch = useDispatch();

  const {error, reviews, loading} = useSelector((state: State) => state.productReviews);
  const {isDeleted, error: deleteError} = useSelector((state: State) => state.review);
  // console.log({loading});

  React.useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (productId !== "") {
      dispatch(getProductReviews(productId));
    }

    if (isDeleted) {
      alert.success("Review deleted successfully");
      dispatch({type: DELETE_REVIEW_RESET});
    }
  }, [dispatch, alert, error, productId, isDeleted, deleteError]);

  const deleteReviewHandler = (id: string) => {
    dispatch(deleteReview(id, productId));
  };

  const submitHandler = (event: React.SyntheticEvent) => {
    event.preventDefault();
    dispatch(getProductReviews(productId));
  };

  const setReviews = () => {
    const data = {
      columns: [
        {
          label: "Review ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Rating",
          field: "rating",
          sort: "asc",
        },
        {
          label: "Comment",
          field: "comment",
          sort: "asc",
        },
        {
          label: "User",
          field: "user",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
        },
      ],
      rows: [] as any,
    };

    reviews.forEach((review: Review) => {
      data.rows.push({
        id: review._id,
        rating: review.rating,
        comment: review.comment,
        user: review.name,

        actions: (
          <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteReviewHandler(review._id)}>
            <i className="fa fa-trash"></i>
          </button>
        ),
      });
    });

    return data;
  };

  return (
    <React.Fragment>
      <MetaData title={"Product Reviews"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <React.Fragment>
            <div className="row justify-content-center mt-5">
              <div className="col-5">
                <form onSubmit={submitHandler}>
                  <div className="form-group">
                    <label htmlFor="productId_field">Enter Product ID</label>
                    <input
                      type="text"
                      id="productId_field"
                      className="form-control"
                      value={productId}
                      onChange={(event) => setProductId(event.target.value)}
                    />
                  </div>

                  <button id="search_button" type="submit" className="btn btn-primary btn-block py-2">
                    SEARCH
                  </button>
                </form>
              </div>
            </div>

            {loading ? (
              <Loader />
            ) : reviews && reviews.length > 0 ? (
              <MDBDataTable data={setReviews()} className="px-3" bordered striped hover />
            ) : (
              <p className="mt-5 text-center">No Reviews.</p>
            )}
          </React.Fragment>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProductReviews;
