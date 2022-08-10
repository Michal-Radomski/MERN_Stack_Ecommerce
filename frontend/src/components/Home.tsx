import React from "react";
import {useDispatch, useSelector} from "react-redux";

import MetaData from "./layouts/MetaData";
import {getProducts} from "../redux/actions/productActions";
import Product from "../components/product/Product";

const Home = () => {
  const dispatch: Dispatch = useDispatch();

  const {loading, products, error, productsCount} = useSelector((state: State) => state.products);

  React.useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <React.Fragment>
      {loading ? (
        <h1>Loading...</h1>
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
