import {
  LOADING_USER,
  SET_USER,
  CLEAR_USER,
  GET_USERS,
  GET_USER,
  LOGOUT_USER,
  LOGIN_USER,
} from "../types";

const initialState = {
  single: {},
  users: [],
  loading: false,
  isAuth: null,
  current: {},
};

const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_USER:
      return {
        ...state,
        current: payload,
        loading: false,
      };
    case GET_USERS:
      return {
        ...state,
        users: payload,
        loading: false,
      };
    case SET_USER:
      LOGIN_USER;
      return {
        ...state,
        single: payload,
        loading: false,
        isAuth: true,
      };
    case CLEAR_USER:
      LOGOUT_USER;
      return {
        ...state,
        single: {},
        loading: false,
        isAuth: false,
      };
    case LOADING_USER:
      return {
        ...state,
        loading: payload,
      };
    default:
      return state;
  }
};

export default userReducer;
