import { stopSubmit } from "redux-form";
import { authAPI, regAPI } from "../API/API";

const SET_USER_DATA = "SET_USER_DATA";

let initialState = {
  userId: null,
  avatarURL: "",
  email: "",
  login: "",
  isAuth: false,
  isFetching: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        ...action.data,
      };
    default:
      return state;
  }
};

export const setAuthUserData = (userId, email, login, isAuth) => ({
  type: SET_USER_DATA,
  data: { userId, email, login, isAuth },
});

export const getAuthUserData = () => async (dispatch) => {
  let response = await authAPI.me();
  if (response.data.resultCode === 0) {
    let { id, email, login } = response.data.data;
  }
};

export const login = (username, password, rememberMe) => async (dispatch) => {
  let response = await regAPI.login(username, password, rememberMe);
  if (!response.data.message) {
    dispatch(
      setAuthUserData(
        response.data.user.id,
        null,
        response.data.user.login,
        true
      )
    );
  } else {
    let message =
      response.data.message.length > 0 ? response.data.message : "Some error";
    dispatch(stopSubmit("login", { _error: message }));
  }
};

export const register = (login, password, rememberMe) => async (dispatch) => {
  let response = await regAPI.registration(login, password, rememberMe);
  if (!response.data.message) {
    dispatch(
      setAuthUserData(
        response.data.user.id,
        null,
        response.data.user.login,
        true
      )
    );
  } else {
    let message =
      response.data.message.length > 0 ? response.data.message : "Some error";
    dispatch(stopSubmit("register", { _error: message }));
  }
};

export const logout = () => async (dispatch) => {
  let response = await authAPI.logout();
  if (response.data.resultCode === 0) {
    dispatch(setAuthUserData(null, null, null, false));
  }
};

export default authReducer;
