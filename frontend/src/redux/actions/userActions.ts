import axios from "axios";

import {
  CLEAR_ERRORS,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
} from "../constants/userConstants";

// Login
export const login = (email: string, password: string) => async (dispatch: Dispatch) => {
  try {
    dispatch({type: LOGIN_REQUEST});

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const {data} = await axios.post("/api/v1/login", {email, password}, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
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

// Register user
export const register = (userData: Object) => async (dispatch: Dispatch) => {
  try {
    dispatch({type: REGISTER_USER_REQUEST});

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const {data} = await axios.post("/api/v1/register", userData, config);

    dispatch({
      type: REGISTER_USER_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: (error as CustomError).response.data.message,
    });
  }
};

// Load user
export const loadUser = () => async (dispatch: Dispatch) => {
  try {
    dispatch({type: LOAD_USER_REQUEST});

    const {data} = await axios.get("/api/v1/me");

    dispatch({
      type: LOAD_USER_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: LOAD_USER_FAIL,
      payload: (error as CustomError).response.data.message,
    });
  }
};

// Logout user
export const logout = () => async (dispatch: Dispatch) => {
  try {
    await axios.get("/api/v1/logout");

    dispatch({
      type: LOGOUT_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: LOGOUT_FAIL,
      payload: (error as CustomError).response.data.message,
    });
  }
};
