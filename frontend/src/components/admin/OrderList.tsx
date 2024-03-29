import React from "react";
import {Link} from "react-router-dom";
import {MDBDataTable} from "mdbreact";
import {History} from "history";
import {useAlert} from "react-alert";
import {useDispatch, useSelector} from "react-redux";

import MetaData from "../layouts/MetaData";
import Loader from "../layouts/Loader";
import Sidebar from "./Sidebar";
import {allOrders, clearErrors, deleteOrder} from "../../redux/actions/orderActions";
import {DELETE_ORDER_RESET} from "../../redux/constants/orderConstants";

const OrdersList = ({history}: {history: History}): JSX.Element => {
  const alert = useAlert();
  const dispatch: Dispatch = useDispatch();

  const {loading, error, orders} = useSelector((state: State) => state.allOrders);
  const {isDeleted} = useSelector((state: State) => state.order);

  React.useEffect(() => {
    dispatch(allOrders());

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Order deleted successfully");
      history.push("/admin/orders");
      dispatch({type: DELETE_ORDER_RESET});
    }
  }, [dispatch, alert, error, isDeleted, history]);

  const deleteOrderHandler = (id: string) => {
    dispatch(deleteOrder(id));
  };

  const setOrders = () => {
    const data = {
      columns: [
        {
          label: "Order ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "No of Items",
          field: "numOfItems",
          sort: "asc",
        },
        {
          label: "Amount",
          field: "amount",
          sort: "asc",
        },
        {
          label: "Status",
          field: "status",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
        },
      ],
      rows: [] as any,
    };

    orders.forEach((order: Order) => {
      data.rows.push({
        id: order._id,
        numOfItems: order.orderItems.length,
        amount: `$${order.totalPrice}`,
        status:
          order.orderStatus && String(order.orderStatus).includes("Delivered") ? (
            <p style={{color: "green"}}>{order.orderStatus}</p>
          ) : order.orderStatus && String(order.orderStatus).includes("Shipped") ? (
            <p style={{color: "orange"}}>{order.orderStatus}</p>
          ) : (
            <p style={{color: "red"}}>{order.orderStatus}</p>
          ),
        actions: (
          <React.Fragment>
            <Link to={`/admin/order/${order._id}`} className="btn btn-primary py-1 px-2">
              <i className="fa fa-eye"></i>
            </Link>
            <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteOrderHandler(order._id)}>
              <i className="fa fa-trash"></i>
            </button>
          </React.Fragment>
        ),
      });
    });

    return data;
  };

  return (
    <React.Fragment>
      <MetaData title={"All Orders"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <React.Fragment>
            <h1 className="my-5">All Orders</h1>

            {loading ? <Loader /> : <MDBDataTable data={setOrders()} className="px-3" bordered striped hover />}
          </React.Fragment>
        </div>
      </div>
    </React.Fragment>
  );
};

export default OrdersList;
