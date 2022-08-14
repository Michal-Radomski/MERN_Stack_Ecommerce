import React from "react";
import {useAlert} from "react-alert";
import {useDispatch, useSelector} from "react-redux";
import {useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement} from "@stripe/react-stripe-js";
import axios from "axios";
import {History} from "history";

import MetaData from "../layouts/MetaData";
import CheckoutSteps from "./CheckoutSteps";
import {createOrder, clearErrors} from "../../redux/actions/orderActions";
import {clearCart} from "../../redux/actions/cartActions";

const options = {
  style: {
    base: {
      fontSize: "16px",
    },
    invalid: {
      color: "#9e2146",
    },
  },
};

const Payment = ({history}: {history: History}): JSX.Element => {
  const alert = useAlert();
  const stripe = useStripe();
  const elements = useElements();
  const dispatch: Dispatch = useDispatch();

  const {user} = useSelector((state: State) => state.auth);
  const {cartItems, shippingInfo} = useSelector((state: State) => state.cart);
  const {error} = useSelector((state: State) => state.newOrder);

  React.useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, error]);

  const order = {
    orderItems: cartItems,
    shippingInfo: shippingInfo,
    itemsPrice: undefined,
    shippingPrice: undefined,
    taxPrice: undefined,
    totalPrice: undefined,
    paymentInfo: {
      id: "",
      status: "",
    },
  };
  // console.log({order});

  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo") as string);
  if (orderInfo) {
    order.itemsPrice = orderInfo.itemsPrice;
    order.shippingPrice = orderInfo.shippingPrice;
    order.taxPrice = orderInfo.taxPrice;
    order.totalPrice = orderInfo.totalPrice;
  }
  // console.log({orderInfo});

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  const submitHandler = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    (document.querySelector("#pay_btn") as HTMLButtonElement).disabled = true;

    let response;
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      response = await axios.post("/api/v1/payment/process", paymentData, config);
      // console.log({response});

      const clientSecret = response.data.client_secret;
      // console.log({clientSecret});

      if (!stripe || !elements) {
        return null;
      }

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement) as any,
          billing_details: {
            name: user.name,
            email: user.email,
          },
        },
      });
      // console.log({result});

      if (result.error) {
        alert.error(result.error.message);
        (document.querySelector("#pay_btn") as HTMLButtonElement).disabled = false;
      } else {
        // The payment is processed or not
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };
          dispatch(createOrder(order));
          dispatch(clearCart());
          history.push("/success");
        } else {
          alert.error("There is some issue while payment processing");
        }
      }
    } catch (error) {
      (document.querySelector("#pay_btn") as HTMLButtonElement).disabled = false;
      alert.error((error as CustomError).response.data.message);
      // console.log({error});
    }
  };

  return (
    <React.Fragment>
      <MetaData title={"Payment"} />

      <CheckoutSteps shipping={true} confirmOrder={true} payment={true} />

      <div
        style={{backgroundColor: "lightyellow", textAlign: "center", width: "34%", marginLeft: "33%", marginRight: "33%"}}
      >
        <h5>Type to Test:</h5>
        <p style={{marginBottom: "6px"}}>Card Number: 4242424242424242</p>
        <p style={{marginBottom: "6px"}}>CVC: Any 3 digits</p>
        <p style={{marginBottom: "6px"}}>Date: Any future date</p>
        <p style={{marginBottom: "6px"}}>
          Link:{" "}
          <a href="https://stripe.com/docs/testing?numbers-or-method-or-token=card-numbers" target="_blank" rel="noreferrer">
            Stripe Docs
          </a>
        </p>
      </div>

      <div className="row wrapper" style={{marginTop: "40px"}}>
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={submitHandler}>
            <h1 className="mb-4">Card Info</h1>
            <div className="form-group">
              <label htmlFor="card_num_field">Card Number</label>
              <CardNumberElement id="card_num_field" className="form-control" options={options} />
            </div>

            <div className="form-group">
              <label htmlFor="card_exp_field">Card Expiry</label>
              <CardExpiryElement id="card_exp_field" className="form-control" options={options} />
            </div>

            <div className="form-group">
              <label htmlFor="card_cvc_field">Card CVC</label>
              <CardCvcElement id="card_cvc_field" className="form-control" options={options} />
            </div>

            <button id="pay_btn" type="submit" className="btn btn-block py-3">
              Pay {` - $ ${orderInfo && orderInfo.totalPrice}`}
            </button>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Payment;
