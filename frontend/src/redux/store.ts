import {createStore, combineReducers, applyMiddleware} from "redux";
import reduxThunk from "redux-thunk";
import {composeWithDevTools} from "@redux-devtools/extension";

let initialState = {};

const reducer = combineReducers({});

const middleware = [reduxThunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
