import { combineReducers } from "redux";
import authReducer from "./authReducers";
import categoryReducer from "./categoryReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  category: categoryReducer,
  // Add other reducers here if needed
});

export default rootReducer;
