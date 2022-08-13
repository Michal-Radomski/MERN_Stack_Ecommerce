import React from "react";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import MetaData from "../layouts/MetaData";
import Loader from "../layouts/Loader";
import Sidebar from "./Sidebar";
import {getAdminProducts} from "../../redux/actions/productActions";
// import { allOrders } from '../../redux/actions/orderActions'
// import { allUsers } from '../../redux/actions/userActions'

const Dashboard = (): JSX.Element => {
  const dispatch: Dispatch = useDispatch();

  const {products} = useSelector((state: State) => state.products);
  // const {users} = useSelector((state: State) => state.allUsers);
  // const {orders, totalAmount, loading} = useSelector((state: State) => state.allOrders);

  let outOfStock = 0;
  products.forEach((product: {stock: number}) => {
    if (product.stock === 0) {
      outOfStock += 1;
    }
  });

  React.useEffect(() => {
    dispatch(getAdminProducts());
    // dispatch(allOrders());
    // dispatch(allUsers());
  }, [dispatch]);

  return (
    <React.Fragment>
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <h1 className="my-4">Dashboard</h1>

          {/* {loading ? (
            <Loader />
          ) : ( */}
          <React.Fragment>
            <MetaData title={"Admin Dashboard"} />

            <div className="row pr-4">
              <div className="col-xl-12 col-sm-12 mb-3">
                <div className="card text-white bg-primary o-hidden h-100">
                  <div className="card-body">
                    <div className="text-center card-font-size">
                      Total Amount
                      {/* <br /> <b>${totalAmount && totalAmount.toFixed(2)}</b> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row pr-4">
              <div className="col-xl-3 col-sm-6 mb-3">
                <div className="card text-white bg-success o-hidden h-100">
                  <div className="card-body">
                    <div className="text-center card-font-size">
                      Products
                      <br /> <b>{products && products.length}</b>
                    </div>
                  </div>
                  <Link className="card-footer text-white clearfix small z-1" to="/admin/products">
                    <span className="float-left">View Details</span>
                    <span className="float-right">
                      <i className="fa fa-angle-right"></i>
                    </span>
                  </Link>
                </div>
              </div>

              <div className="col-xl-3 col-sm-6 mb-3">
                <div className="card text-white bg-danger o-hidden h-100">
                  <div className="card-body">
                    <div className="text-center card-font-size">
                      Orders
                      {/* <br /> <b>{orders && orders.length}</b> */}
                    </div>
                  </div>
                  <Link className="card-footer text-white clearfix small z-1" to="/admin/orders">
                    <span className="float-left">View Details</span>
                    <span className="float-right">
                      <i className="fa fa-angle-right"></i>
                    </span>
                  </Link>
                </div>
              </div>

              <div className="col-xl-3 col-sm-6 mb-3">
                <div className="card text-white bg-info o-hidden h-100">
                  <div className="card-body">
                    <div className="text-center card-font-size">
                      Users
                      {/* <br /> <b>{users && users.length}</b> */}
                    </div>
                  </div>
                  <Link className="card-footer text-white clearfix small z-1" to="/admin/users">
                    <span className="float-left">View Details</span>
                    <span className="float-right">
                      <i className="fa fa-angle-right"></i>
                    </span>
                  </Link>
                </div>
              </div>

              <div className="col-xl-3 col-sm-6 mb-3">
                <div className="card text-white bg-warning o-hidden h-100">
                  <div className="card-body">
                    <div className="text-center card-font-size">
                      Out of Stock
                      <br /> <b>{outOfStock}</b>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </React.Fragment>
          {/* )} */}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
