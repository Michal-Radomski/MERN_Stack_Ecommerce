import axios from "axios";

import {
  ALL_PRODUCTS_REQUEST,
  ALL_PRODUCTS_SUCCESS,
  ALL_PRODUCTS_FAIL,
  CLEAR_ERRORS,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
} from "../constants/productConstants";

// Get Products
export const getProducts =
  (keyword: string = "", currentPage = 1 as number, price: number[], category: string, rating: number = 0) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch({type: ALL_PRODUCTS_REQUEST});

      let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&ratings[gte]=${rating}`;
      if (category) {
        link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&category=${category}&ratings[gte]=${rating}`;
      }
      // console.log({link});

      const {data} = await axios.get(link);

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

// New Review
export const newReview = (reviewData: Object) => async (dispatch: Dispatch) => {
  try {
    dispatch({type: NEW_REVIEW_REQUEST});

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const {data} = await axios.put(`/api/v1/review`, reviewData, config);

    dispatch({
      type: NEW_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: NEW_REVIEW_FAIL,
      payload: (error as CustomError).response.data.message,
    });
  }
};
