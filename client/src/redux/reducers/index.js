import { combineReducers } from "redux";
import authReducer from "./authReducers";
import categoryReducer from "./categoryReducer";
import cartReducer from "./cartReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  category: categoryReducer,
  cart: cartReducer,
  // Add other reducers here if needed
});

export default rootReducer;
