import { legacy_createStore as createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk"; // Create this file later
import rootReducer from "../reducers";

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
