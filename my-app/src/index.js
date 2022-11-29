import reportWebVitals from './reportWebVitals';
import State, { subcsribe } from './Redux/State';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { addPost, updateNewPostText } from './Redux/State';

const root = ReactDOM.createRoot(document.getElementById('root'));
let rerenderEntireTree = () => {
  root.render(
    <React.StrictMode>
      <App appState={State} addPost={addPost} updateNewPostText = {updateNewPostText} />
    </React.StrictMode>
  );
}
rerenderEntireTree();

subcsribe(rerenderEntireTree);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
