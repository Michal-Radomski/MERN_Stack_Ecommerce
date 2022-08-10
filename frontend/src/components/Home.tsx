import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {useAlert} from "react-alert";
import Pagination from "react-js-pagination";

import MetaData from "./layouts/MetaData";
import {getProducts} from "../redux/actions/productActions";
import Product from "../components/product/Product";
import Loader from "./layouts/Loader";

const Home = ({match}: {match: {params: {keyword: string}}}): JSX.Element => {
  const dispatch: Dispatch = useDispatch();
  const alert: Dispatch = useAlert();

  const [currentPage, setCurrentPage] = React.useState<number>(1);

  const {loading, products, error, productsCount, resPerPage} = useSelector((state: State) => state.products);

  const keyword: string = match.params.keyword;

  React.useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    dispatch(getProducts(keyword, currentPage));
  }, [alert, currentPage, dispatch, error, keyword]);

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
              {products &&
                products.map(
                  (product: {
                    name: string;
                    numOfReviews: number;
                    price: number;
                    images: {url: string}[];
                    _id: string;
                    ratings: number;
                  }) => <Product key={product._id} product={product} />
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
