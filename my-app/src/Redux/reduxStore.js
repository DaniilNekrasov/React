import {
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
} from "redux";
import authReducer from "./authReducer";
import messagesReducer from "./messagesReducer";
import profileReducer from "./profileReducer";
import newsReducer from "./newsReducer";
import usersReducer from "./usersReducer";
import thunkMiddleware from "redux-thunk";
import { reducer as formReducer } from "redux-form";
import appReducer from "./appReducer";
import eventsReducer from "./eventReducer";

let reducers = combineReducers({
  profilePage: profileReducer,
  messagesPage: messagesReducer,
  auth: authReducer,
  usersPage: usersReducer,
  form: formReducer,
  app: appReducer,
  news: newsReducer,
  events: eventsReducer,
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;
