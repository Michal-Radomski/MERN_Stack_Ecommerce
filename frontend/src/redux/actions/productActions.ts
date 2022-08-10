import axios from "axios";

import {ALL_PRODUCTS_REQUEST, ALL_PRODUCTS_SUCCESS, ALL_PRODUCTS_FAIL, CLEAR_ERRORS} from "../constants/productConstants";

// Get Products
export const getProducts = () => async (dispatch: Dispatch) => {
  try {
    dispatch({type: ALL_PRODUCTS_REQUEST});

    const {data} = await axios.get("/api/v1/products");

    dispatch({
      type: ALL_PRODUCTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_PRODUCTS_FAIL,
      payload: (error as any).response.data.message,
    });
  }
};

// Clear Errors
export const clearErrors = () => async (dispatch: Dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
