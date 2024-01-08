import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from "../constants/constant";
import axios from "axios";

// Action creators
export const loginSuccess = (userData) => ({
  type: LOGIN_SUCCESS,
  payload: userData,
});

export const loginFailure = (error) => ({
  type: LOGIN_FAIL,
  payload: error,
});

export const logout = () => ({
  type: LOGOUT,
});

export const loginUser =
  (credentials, navigate, location) => async (dispatch) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API}/api/auth/login`,
        credentials
      );
      // console.log("API Response:", response.data.user.name);

      if (response.data.success) {
        // Save user data to local storage
        localStorage.setItem("user", JSON.stringify(response.data.user));

        // Dispatch the login success action
        dispatch(loginSuccess(response.data.user));
        // Redirect to the home route
        alert("Login Success");
        navigate(location.state || "/");
      } else {
        // Dispatch the login failure action
        dispatch(loginFailure(response.data.message));
      }
    } catch (error) {
      // Dispatch the login failure action with error message
      dispatch(loginFailure("Invalid Email or Password"));
    }
  };
