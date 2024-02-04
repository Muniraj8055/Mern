import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  DECREMENT_ITEM,
} from "../constants/constant";

export const addToCart = (item) => {
  return {
    type: ADD_TO_CART,
    payload: item,
  };
};

export const removeFromCart = (id) => {
  return {
    type: REMOVE_FROM_CART,
    payload: id,
  };
};

export const decrementItem = (item) => {
  return {
    type: DECREMENT_ITEM,
    payload: item,
  };
};
