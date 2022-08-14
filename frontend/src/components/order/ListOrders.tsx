import React from "react";
import {Link} from "react-router-dom";
import {MDBDataTable} from "mdbreact";
import {useAlert} from "react-alert";
import {useDispatch, useSelector} from "react-redux";

import MetaData from "../layouts/MetaData";
import Loader from "../layouts/Loader";
import {myOrders, clearErrors} from "../../redux/actions/orderActions";

const ListOrders = (): JSX.Element => {
  const alert = useAlert();
  const dispatch: Dispatch = useDispatch();

  const {loading, error, orders} = useSelector((state: State) => state.myOrders);
  // console.log({orders});

  React.useEffect(() => {
    dispatch(myOrders());

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, error]);

  const setOrders = () => {
    const data = {
      columns: [
        {
          label: "Order ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Num of Items",
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
          sort: "asc",
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
          <Link to={`/order/${order._id}`} className="btn btn-primary">
            <i className="fa fa-eye"></i>
          </Link>
        ),
      });
    });

    return data;
  };

  return (
    <React.Fragment>
      <MetaData title={"My Orders"} />

      <h1 className="my-5">My Orders</h1>

      {loading ? <Loader /> : <MDBDataTable data={setOrders()} className="px-3" bordered striped hover />}
    </React.Fragment>
  );
};

export default ListOrders;
