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
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  NEW_PASSWORD_REQUEST,
  NEW_PASSWORD_SUCCESS,
  NEW_PASSWORD_FAIL,
  ALL_USERS_REQUEST,
  ALL_USERS_SUCCESS,
  ALL_USERS_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
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

// Update profile
export const updateProfile = (userData: Object) => async (dispatch: Dispatch) => {
  try {
    dispatch({type: UPDATE_PROFILE_REQUEST});

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const {data} = await axios.put("/api/v1/me/update", userData, config);

    dispatch({
      type: UPDATE_PROFILE_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_FAIL,
      payload: (error as CustomError).response.data.message,
    });
  }
};

// Update password
export const updatePassword = (passwords: FormData) => async (dispatch: Dispatch) => {
  try {
    dispatch({type: UPDATE_PASSWORD_REQUEST});

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const {data} = await axios.put("/api/v1/password/update", passwords, config);

    dispatch({
      type: UPDATE_PASSWORD_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PASSWORD_FAIL,
      payload: (error as CustomError).response.data.message,
    });
  }
};

// Forgot password
export const forgotPassword = (email: FormData) => async (dispatch: Dispatch) => {
  try {
    dispatch({type: FORGOT_PASSWORD_REQUEST});

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const {data} = await axios.post("/api/v1/password/forgot", email, config);

    dispatch({
      type: FORGOT_PASSWORD_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: FORGOT_PASSWORD_FAIL,
      payload: (error as CustomError).response.data.message,
    });
  }
};

// Reset password
export const resetPassword = (token: string, passwords: FormData) => async (dispatch: Dispatch) => {
  try {
    dispatch({type: NEW_PASSWORD_REQUEST});

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const {data} = await axios.put(`/api/v1/password/reset/${token}`, passwords, config);

    dispatch({
      type: NEW_PASSWORD_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: NEW_PASSWORD_FAIL,
      payload: (error as CustomError).response.data.message,
    });
  }
};

// Get all users - Admin
export const allUsers = () => async (dispatch: Dispatch) => {
  try {
    dispatch({type: ALL_USERS_REQUEST});

    const {data} = await axios.get("/api/v1/admin/users");

    dispatch({
      type: ALL_USERS_SUCCESS,
      payload: data.users,
    });
  } catch (error) {
    dispatch({
      type: ALL_USERS_FAIL,
      payload: (error as CustomError).response.data.message,
    });
  }
};

// Delete user - ADMIN
export const deleteUser = (id: string) => async (dispatch: Dispatch) => {
  try {
    dispatch({type: DELETE_USER_REQUEST});

    const {data} = await axios.delete(`/api/v1/admin/user/${id}`);

    dispatch({
      type: DELETE_USER_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_USER_FAIL,
      payload: (error as CustomError).response.data.message,
    });
  }
};

// Update user - ADMIN
export const updateUser = (id: string, userData: FormData) => async (dispatch: Dispatch) => {
  try {
    dispatch({type: UPDATE_USER_REQUEST});

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const {data} = await axios.put(`/api/v1/admin/user/${id}`, userData, config);

    dispatch({
      type: UPDATE_USER_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_USER_FAIL,
      payload: (error as CustomError).response.data.message,
    });
  }
};

// Get user details - ADMIN
export const getUserDetails = (id: string) => async (dispatch: Dispatch) => {
  try {
    dispatch({type: USER_DETAILS_REQUEST});

    const {data} = await axios.get(`/api/v1/admin/user/${id}`);

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload: (error as CustomError).response.data.message,
    });
  }
};
