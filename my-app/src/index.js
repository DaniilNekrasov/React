import reportWebVitals from "./reportWebVitals";
import store from "./Redux/reduxStore";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import MainApp from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
let rerenderEntireTree = (state) => {
  root.render(<MainApp />);
};
rerenderEntireTree(store.getState());

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
