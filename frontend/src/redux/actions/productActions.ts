import axios from "axios";

import {
  ALL_PRODUCTS_REQUEST,
  ALL_PRODUCTS_SUCCESS,
  ALL_PRODUCTS_FAIL,
  CLEAR_ERRORS,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
} from "../constants/productConstants";

// Get Products
export const getProducts =
  (currentPage = 1 as number) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch({type: ALL_PRODUCTS_REQUEST});

      const {data} = await axios.get(`/api/v1/products?page=${currentPage}`);

      dispatch({
        type: ALL_PRODUCTS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_PRODUCTS_FAIL,
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

// Product Details
export const getProductDetails = (id: string) => async (dispatch: Dispatch) => {
  try {
    dispatch({type: PRODUCT_DETAILS_REQUEST});

    const {data} = await axios.get(`/api/v1/product/${id}`);

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: (error as CustomError).response.data.message,
    });
  }
};
