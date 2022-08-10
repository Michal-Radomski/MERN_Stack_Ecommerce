import {createStore, combineReducers, applyMiddleware} from "redux";
import reduxThunk from "redux-thunk";
import {composeWithDevTools} from "@redux-devtools/extension";

import {productDetailsReducer, productsReducer} from "./reducers/productReducer";

let initialState = {};

const reducer = combineReducers({
  products: productsReducer,
  productDetails: productDetailsReducer,
});

const middleware = [reduxThunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
