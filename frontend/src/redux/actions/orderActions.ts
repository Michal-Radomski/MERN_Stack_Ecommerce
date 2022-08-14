import axios from "axios";

import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  CLEAR_ERRORS,
  MY_ORDERS_REQUEST,
  MY_ORDERS_SUCCESS,
  MY_ORDERS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ALL_ORDERS_REQUEST,
  ALL_ORDERS_SUCCESS,
  ALL_ORDERS_FAIL,
} from "../constants/orderConstants";

export const createOrder = (order: Object) => async (dispatch: Dispatch, getState: State) => {
  try {
    dispatch({type: CREATE_ORDER_REQUEST});

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const {data} = await axios.post("/api/v1/order/new", order, config);

    dispatch({
      type: CREATE_ORDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_ORDER_FAIL,
      payload: (error as CustomError).response.data.message,
    });
  }
};

// Clear Errors
export const clearErrors = () => async (dispatch: Dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};

// Get orders of currently logged in user
export const myOrders = () => async (dispatch: Dispatch) => {
  try {
    dispatch({type: MY_ORDERS_REQUEST});

    const {data} = await axios.get("/api/v1/orders/me");

    dispatch({
      type: MY_ORDERS_SUCCESS,
      payload: data.orders,
    });
  } catch (error) {
    dispatch({
      type: MY_ORDERS_FAIL,
      payload: (error as CustomError).response.data.message,
    });
  }
};

// Get order details
export const getOrderDetails = (id: string) => async (dispatch: Dispatch) => {
  try {
    dispatch({type: ORDER_DETAILS_REQUEST});

    const {data} = await axios.get(`/api/v1/order/${id}`);

    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data.order,
    });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: (error as CustomError).response.data.message,
    });
  }
};

// Get all orders - ADMIN
export const allOrders = () => async (dispatch: Dispatch) => {
  try {
    dispatch({type: ALL_ORDERS_REQUEST});

    const {data} = await axios.get(`/api/v1/admin/orders`);

    dispatch({
      type: ALL_ORDERS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_ORDERS_FAIL,
      payload: (error as CustomError).response.data.message,
    });
  }
};
