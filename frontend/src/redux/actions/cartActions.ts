import axios from "axios";
import {ADD_TO_CART, REMOVE_ITEM_CART, SAVE_SHIPPING_INFO} from "../constants/cartConstants";

export const addItemToCart = (id: string, quantity: number) => async (dispatch: Dispatch, getState: State) => {
  const {data} = await axios.get(`/api/v1/product/${id}`);

  dispatch({
    type: ADD_TO_CART,
    payload: {
      product: data.product._id,
      name: data.product.name,
      price: data.product.price,
      image: data.product.images[0].url,
      stock: data.product.stock,
      quantity: quantity,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeItemFromCart = (id: string) => async (dispatch: Dispatch, getState: State) => {
  dispatch({
    type: REMOVE_ITEM_CART,
    payload: id,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const saveShippingInfo = (data: Object) => async (dispatch: Dispatch) => {
  dispatch({
    type: SAVE_SHIPPING_INFO,
    payload: data,
  });

  localStorage.setItem("shippingInfo", JSON.stringify(data));
};
