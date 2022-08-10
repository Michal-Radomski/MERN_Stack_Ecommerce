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

  const {loading, products, error, productsCount, resPerPage} = useSelector((state: State) => state.products);

  const keyword: string = match.params.keyword;

  React.useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    dispatch(getProducts(keyword, currentPage, price));
  }, [alert, currentPage, dispatch, error, keyword, price]);

  function setCurrentPageNo(pageNumber: number) {
    setCurrentPage(pageNumber);
  }

  return (
    <React.Fragment>
      {loading ? (
        <Loader />
      ) : (
        <React.Fragment>
          <MetaData title={"Buy Best Products Online"} />
          <h1 id="products_heading">Latest Products</h1>

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
            {resPerPage <= productsCount && (
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
