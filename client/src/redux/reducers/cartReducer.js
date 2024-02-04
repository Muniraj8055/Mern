import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  DECREMENT_ITEM,
} from "../constants/constant";

const initialState = {
  carts: JSON.parse(localStorage.getItem("carts")) || [],
};

const saveToLocalStorage = (carts) => {
  localStorage.setItem("carts", JSON.stringify(carts));
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const existingItemIndex = state.carts.findIndex(
        (item) => item._id === action.payload._id
      );

      if (existingItemIndex !== -1) {
        // If item already exists, increment quantity
        const updatedCarts = state.carts.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );

        saveToLocalStorage(updatedCarts);

        return {
          ...state,
          carts: updatedCarts,
        };
      } else {
        // If item is not in the cart, add it with quantity 1
        const newCarts = [...state.carts, { ...action.payload, quantity: 1 }];

        saveToLocalStorage(newCarts);

        return {
          ...state,
          carts: newCarts,
        };
      }

    case REMOVE_FROM_CART:
      console.log("Removing item with id:", action.payload);
      const updatedCarts = state.carts.filter(
        (item) => item._id !== action.payload
      );

      saveToLocalStorage(updatedCarts);

      return {
        ...state,
        carts: updatedCarts,
      };

    case DECREMENT_ITEM:
      const decrementItemIndex = state.carts.findIndex(
        (item) => item._id === action.payload._id
      );

      if (state.carts[decrementItemIndex].quantity > 1) {
        // If quantity is greater than 1, decrement the quantity
        const updatedCarts = state.carts.map((item, index) =>
          index === decrementItemIndex
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );

        saveToLocalStorage(updatedCarts);

        return {
          ...state,
          carts: updatedCarts,
        };
      } else {
        // If quantity is 1, remove the item from the cart
        const updatedCarts = state.carts.filter(
          (item) => item._id !== action.payload._id
        );

        saveToLocalStorage(updatedCarts);

        return {
          ...state,
          carts: updatedCarts,
        };
      }

    default:
      return state;
  }
};

export default cartReducer;
