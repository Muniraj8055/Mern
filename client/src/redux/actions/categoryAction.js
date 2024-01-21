import {
  FETCH_CATEGORIES_FAILURE,
  FETCH_CATEGORIES_SUCCESS,
} from "../constants/constant";
import axios from "axios";

//get all categories
export const fetchCategoriesSuccess = (categories) => ({
  type: FETCH_CATEGORIES_SUCCESS,
  payload: categories,
});

export const fetchCategoriesFailure = (error) => ({
  type: FETCH_CATEGORIES_FAILURE,
  payload: error,
});

export const fetchCategories = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/api/category/categories`
      );
      // console.log(response);
      const data = await response.data.category;
      console.log(data);
      dispatch(fetchCategoriesSuccess(data));
    } catch (error) {
      dispatch(fetchCategoriesFailure(error.message));
    }
  };
};
