import {ADD_TO_CART, REMOVE_ITEM_CART} from "../constants/cartConstants";

export const cartReducer = (state = {cartItems: []} as State, action: Dispatch) => {
  switch (action.type) {
    case ADD_TO_CART:
      const item = action.payload;
      // console.log({item});

      const isItemExist = state.cartItems.find((Item: ItemInterface) => Item.product === item.product);
      // console.log({isItemExist});

      if (isItemExist) {
        return {
          ...state,
          cartItems: state.cartItems.map((Item: ItemInterface) => (Item.product === isItemExist.product ? item : Item)),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }

    case REMOVE_ITEM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter((Item: ItemInterface) => Item.product !== action.payload),
      };

    default:
      return state;
  }
};
