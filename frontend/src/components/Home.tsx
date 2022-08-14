import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {useAlert} from "react-alert";
import Pagination from "react-js-pagination";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

import MetaData from "./layouts/MetaData";
import {getProducts} from "../redux/actions/productActions";
import Product from "../components/product/Product";
import Loader from "./layouts/Loader";

const {createSliderWithTooltip} = Slider;
const Range = createSliderWithTooltip(Slider.Range);

const Home = ({match}: {match: {params: {keyword: string}}}): JSX.Element => {
  const dispatch: Dispatch = useDispatch();
  const alert: Dispatch = useAlert();

  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [price, setPrice] = React.useState<number[]>([1, 1000]);
  const [category, setCategory] = React.useState<string>("");
  const [rating, setRating] = React.useState<number>(0);

  const categories = [
    "Electronics",
    "Cameras",
    "Laptops",
    "Accessories",
    "Headphones",
    "Food",
    "Books",
    "Clothes/Shoes",
    "Beauty/Health",
    "Sports",
    "Outdoor",
    "Home",
  ];

  const {loading, products, error, productsCount, resPerPage, filteredProductsCount} = useSelector(
    (state: State) => state.products
  );

  const keyword: string = match.params.keyword;

  React.useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    dispatch(getProducts(keyword, currentPage, price, category, rating));
  }, [alert, currentPage, dispatch, error, keyword, price, category, rating]);

  function setCurrentPageNo(pageNumber: number) {
    setCurrentPage(pageNumber);
  }

  let count = productsCount;
  if (keyword) {
    count = filteredProductsCount;
  }
  // console.log({count});

  return (
    <React.Fragment>
      {loading ? (
        <Loader />
      ) : (
        <React.Fragment>
          <MetaData title={"Buy Best Products Online"} />
          <h1 id="products_heading" style={{textAlign: "center", marginTop: "40px"}}>
            Latest Products
          </h1>

          <section id="products" className="container mt-5">
            <div className="row">
              {keyword ? (
                <React.Fragment>
                  <div className="col-6 col-md-3 mt-5 mb-5">
                    <div className="px-5">
                      <Range
                        marks={{
                          1: `$1`,
                          1000: `$1000`,
                        }}
                        min={1}
                        max={1000}
                        defaultValue={[1, 1000]}
                        tipFormatter={(value) => `$${value}`}
                        tipProps={{
                          placement: "top",
                          visible: true,
                        }}
                        value={price}
                        onChange={(price) => setPrice(price)}
                      />
                      <hr className="my-5" />
                      <div className="mt-5">
                        <h4 className="mb-3">Categories</h4>
                        <ul className="pl-0">
                          {categories.map((category) => (
                            <li
                              style={{
                                cursor: "pointer",
                                listStyleType: "none",
                              }}
                              key={category}
                              onClick={() => setCategory(category)}
                            >
                              {category}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <hr className="my-3" />
                      <div className="mt-5">
                        <h4 className="mb-3">Ratings</h4>
                        <ul className="pl-0">
                          {[5, 4, 3, 2, 1].map((star) => (
                            <li
                              style={{
                                cursor: "pointer",
                                listStyleType: "none",
                              }}
                              key={star}
                              onClick={() => setRating(star)}
                            >
                              <div className="rating-outer">
                                <div
                                  className="rating-inner"
                                  style={{
                                    width: `${star * 20}%`,
                                  }}
                                ></div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-md-9">
                    <div className="row">
                      {products &&
                        products.map(
                          (product: {
                            name: string;
                            numOfReviews: number;
                            price: number;
                            images: {url: string}[];
                            _id: string;
                            ratings: number;
                          }) => <Product key={product._id} product={product} col={4} />
                        )}
                    </div>
                  </div>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {products &&
                    products.map(
                      (product: {
                        name: string;
                        numOfReviews: number;
                        price: number;
                        images: {url: string}[];
                        _id: string;
                        ratings: number;
                      }) => <Product key={product._id} product={product} col={3} />
                    )}
                </React.Fragment>
              )}
            </div>
          </section>
          <div className="d-flex justify-content-center mt-5">
            {resPerPage <= count <= productsCount && (
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText={"Next"}
                prevPageText={"Prev"}
                firstPageText={"First"}
                lastPageText={"Last"}
                itemClass="page-item"
                linkClass="page-link"
              />
            )}
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Home;
