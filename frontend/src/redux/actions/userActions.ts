import axios from "axios";

import {CLEAR_ERRORS, LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS} from "../constants/userConstants";

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
