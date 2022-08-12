import React from "react";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {History} from "history";

import MetaData from "../layouts/MetaData";
import {addItemToCart, removeItemFromCart} from "../../redux/actions/cartActions";

const Cart = ({history}: {history: History}) => {
  const dispatch: Dispatch = useDispatch();

  const {cartItems} = useSelector((state: State) => state.cart);

  const removeCartItemHandler = (id: string) => {
    dispatch(removeItemFromCart(id));
  };

  const increaseQty = (id: string, quantity: number, stock: number) => {
    const newQty = quantity + 1;

    if (newQty > stock) return null;

    dispatch(addItemToCart(id, newQty));
  };

  const decreaseQty = (id: string, quantity: number) => {
    const newQty = quantity - 1;

    if (newQty <= 0) return null;

    dispatch(addItemToCart(id, newQty));
  };

  const checkoutHandler = () => {
    history.push("/login?redirect=shipping");
  };

  return (
    <React.Fragment>
      <MetaData title={"Your Cart"} />
      {cartItems.length === 0 ? (
        <h2 className="mt-5" style={{color: "orangered", textAlign: "center"}}>
          Your Cart is Empty
        </h2>
      ) : (
        <React.Fragment>
          <h2 className="mt-5">
            Your Cart: <b>{cartItems.length} items</b>
          </h2>

          <div className="row d-flex justify-content-between">
            <div className="col-12 col-lg-8">
              {cartItems.map((item: ItemInterface) => (
                <React.Fragment key={item.product}>
                  <hr />

                  <div className="cart-item" key={item.product}>
                    <div className="row">
                      <div className="col-4 col-lg-3">
                        <img src={item.image} alt="Laptop" height="90" width="115" />
                      </div>

                      <div className="col-5 col-lg-3">
                        <Link to={`/products/${item.product}`}>{item.name}</Link>
                      </div>

                      <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                        <p id="card_item_price">${item.price}</p>
                      </div>

                      <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                        <div className="stockCounter d-inline">
                          <span className="btn btn-danger minus" onClick={() => decreaseQty(item.product, item.quantity)}>
                            -
                          </span>

                          <input
                            type="number"
                            className="form-control count d-inline"
                            value={item.quantity}
                            readOnly
                            style={{width: "4rem"}}
                          />

                          <span
                            className="btn btn-primary plus"
                            onClick={() => increaseQty(item.product, item.quantity, item.stock)}
                          >
                            +
                          </span>
                        </div>
                      </div>

                      <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                        <i
                          id="delete_cart_item"
                          className="fa fa-trash btn btn-danger"
                          onClick={() => removeCartItemHandler(item.product)}
                        ></i>
                      </div>
                    </div>
                  </div>
                  <hr />
                </React.Fragment>
              ))}
            </div>

            <div className="col-12 col-lg-3 my-4">
              <div id="order_summary">
                <h4>Order Summary</h4>
                <hr />
                <p>
                  Subtotal:{" "}
                  <span className="order-summary-values">
                    {cartItems.reduce((acc: number, item: {quantity: number}) => acc + Number(item.quantity), 0)} (Units)
                  </span>
                </p>
                <p>
                  Est. total:{" "}
                  <span className="order-summary-values">
                    $
                    {cartItems
                      .reduce((acc: number, item: {quantity: number; price: number}) => acc + item.quantity * item.price, 0)
                      .toFixed(2)}
                  </span>
                </p>

                <hr />
                <button id="checkout_btn" className="btn btn-primary btn-block" onClick={checkoutHandler}>
                  Check out
                </button>
              </div>
            </div>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Cart;
