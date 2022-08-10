import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {useAlert} from "react-alert";

import MetaData from "./layouts/MetaData";
import {getProducts} from "../redux/actions/productActions";
import Product from "../components/product/Product";
import Loader from "./layouts/Loader";

const Home = () => {
  const dispatch: Dispatch = useDispatch();
  const alert: Dispatch = useAlert();

  const {loading, products, error, productsCount} = useSelector((state: State) => state.products);

  React.useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    dispatch(getProducts());
  }, [alert, dispatch, error]);

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
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Home;
