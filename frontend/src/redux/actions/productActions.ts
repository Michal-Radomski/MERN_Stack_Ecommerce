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
  ADMIN_PRODUCTS_REQUEST,
  ADMIN_PRODUCTS_SUCCESS,
  ADMIN_PRODUCTS_FAIL,
  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_SUCCESS,
  NEW_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  GET_REVIEWS_REQUEST,
  GET_REVIEWS_SUCCESS,
  GET_REVIEWS_FAIL,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAIL,
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

// Get products by Admin
export const getAdminProducts = () => async (dispatch: Dispatch) => {
  try {
    dispatch({type: ADMIN_PRODUCTS_REQUEST});

    const {data} = await axios.get(`/api/v1/admin/products`);

    dispatch({
      type: ADMIN_PRODUCTS_SUCCESS,
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_PRODUCTS_FAIL,
      payload: (error as CustomError).response.data.message,
    });
  }
};

export const newProduct = (productData: FormData) => async (dispatch: Dispatch) => {
  try {
    dispatch({type: NEW_PRODUCT_REQUEST});

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const {data} = await axios.post(`/api/v1/admin/product/new`, productData, config);

    dispatch({
      type: NEW_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_PRODUCT_FAIL,
      payload: (error as CustomError).response.data.message,
    });
  }
};

// Delete product (Admin)
export const deleteProduct = (id: string) => async (dispatch: Dispatch) => {
  try {
    dispatch({type: DELETE_PRODUCT_REQUEST});

    const {data} = await axios.delete(`/api/v1/admin/product/${id}`);

    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_FAIL,
      payload: (error as CustomError).response.data.message,
    });
  }
};

// Update Product (ADMIN)
export const updateProduct = (id: string, productData: FormData) => async (dispatch: Dispatch) => {
  try {
    dispatch({type: UPDATE_PRODUCT_REQUEST});

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const {data} = await axios.put(`/api/v1/admin/product/${id}`, productData, config);

    dispatch({
      type: UPDATE_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PRODUCT_FAIL,
      payload: (error as CustomError).response.data.message,
    });
  }
};

// Get product reviews - Admin
export const getProductReviews = (id: string) => async (dispatch: Dispatch) => {
  try {
    dispatch({type: GET_REVIEWS_REQUEST});

    const {data} = await axios.get(`/api/v1/reviews?id=${id}`);

    dispatch({
      type: GET_REVIEWS_SUCCESS,
      payload: data.reviews,
    });
  } catch (error) {
    dispatch({
      type: GET_REVIEWS_FAIL,
      payload: (error as CustomError).response.data.message,
    });
  }
};

// Delete product review - Admin
export const deleteReview = (id: string, productId: string) => async (dispatch: Dispatch) => {
  try {
    dispatch({type: DELETE_REVIEW_REQUEST});

    const {data} = await axios.delete(`/api/v1/reviews?id=${id}&productId=${productId}`);

    dispatch({
      type: DELETE_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    // console.log((error as CustomError).response);

    dispatch({
      type: DELETE_REVIEW_FAIL,
      payload: (error as CustomError).response.data.message,
    });
  }
};
