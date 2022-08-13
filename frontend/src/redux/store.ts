import {createStore, combineReducers, applyMiddleware} from "redux";
import reduxThunk from "redux-thunk";
import {composeWithDevTools} from "@redux-devtools/extension";

import {productDetailsReducer, productsReducer} from "./reducers/productReducer";
import {authReducer, forgotPasswordReducer, userReducer} from "./reducers/userReducers";
import {cartReducer} from "./reducers/cartReducers";
import {newOrderReducer, myOrdersReducer, orderDetailsReducer} from "./reducers/orderReducers";

const initialState: State = {
  cart: {
    cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems") as string) : [],
    shippingInfo: localStorage.getItem("shippingInfo") ? JSON.parse(localStorage.getItem("shippingInfo") as string) : {},
  },
};

const reducer = combineReducers({
  products: productsReducer,
  productDetails: productDetailsReducer,
  auth: authReducer,
  user: userReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
  myOrders: myOrdersReducer,
  orderDetails: orderDetailsReducer,
});

const middleware = [reduxThunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
