import React from "react";
import {Link} from "react-router-dom";

const CheckoutSteps = ({
  shipping,
  confirmOrder,
  payment,
}: {
  shipping: boolean;
  confirmOrder: boolean;
  payment: boolean;
}): JSX.Element => {
  // console.log({shipping});
  // console.log({confirmOrder});
  // console.log({payment});
  return (
    <React.Fragment>
      <div className="checkout-progress d-flex justify-content-center mt-5">
        {shipping ? (
          <Link to="/shipping" className="float-right">
            <div className="triangle2-active" style={{cursor: "pointer"}}></div>
            <div className="step active-step" style={{cursor: "pointer"}}>
              Shipping
            </div>
            <div className="triangle-active" style={{cursor: "pointer"}}></div>
          </Link>
        ) : (
          <Link to="#!" style={{pointerEvents: "none"}}>
            <div className="triangle2-incomplete"></div>
            <div className="step incomplete">Shipping</div>
            <div className="triangle-incomplete"></div>
          </Link>
        )}

        {confirmOrder ? (
          <Link to="/order/confirm" className="float-right">
            <div className="triangle2-active" style={{cursor: "pointer"}}></div>
            <div className="step active-step" style={{cursor: "pointer"}}>
              Confirm Order
            </div>
            <div className="triangle-active" style={{cursor: "pointer"}}></div>
          </Link>
        ) : (
          <Link to="#!" style={{pointerEvents: "none"}}>
            <div className="triangle2-incomplete"></div>
            <div className="step incomplete">Confirm Order</div>
            <div className="triangle-incomplete"></div>
          </Link>
        )}

        {payment ? (
          <Link to="/payment" className="float-right">
            <div className="triangle2-active" style={{cursor: "pointer"}}></div>
            <div className="step active-step" style={{cursor: "pointer"}}>
              Payment
            </div>
            <div className="triangle-active" style={{cursor: "pointer"}}></div>
          </Link>
        ) : (
          <Link to="#!" style={{pointerEvents: "none"}}>
            <div className="triangle2-incomplete"></div>
            <div className="step incomplete">Payment</div>
            <div className="triangle-incomplete"></div>
          </Link>
        )}
      </div>
    </React.Fragment>
  );
};

export default CheckoutSteps;
