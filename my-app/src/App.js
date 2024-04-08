import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import { Route, Routes } from "react-router-dom";
import ChatsPage from "./components/Chat/ChatsPage";
import Music from "./components/Music/Music";
import UsersContainer from "./components/Users/UsersContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/login";
import React, { Component } from "react";
import { initializeApp } from "./Redux/appReducer";
import { connect } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { compose } from "redux";
import Preloader from "./components/common/Preloader";
import { Provider } from "react-redux";
import store from "./Redux/reduxStore";
import { BrowserRouter } from "react-router-dom";
import Register from "./components/Login/Register";

const NewsContainer = React.lazy(() =>
  import("./components/News/NewsContainer")
);
const ProfileContainer = React.lazy(() =>
  import("./components/Profile/ProfileContainer")
);
const DialogContainer = React.lazy(() =>
  import("./components/Dialogs/DialogContainer")
);

const status = document.getElementById("status");
const messages = document.getElementById("messages");

const ws = new WebSocket("ws://localhost:3002");

function WithRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  }

  return ComponentWithRouterProp;
}

function setStatus(value) {
  status.innerHTML = value;
}

function printMessage(value) {
  const li = document.createElement("li");

  li.innerHTML = value;
  messages.appendChild(li);
}

ws.onopen = () => setStatus("ONLINE");

ws.onclose = () => setStatus("DISCONNECTED");

ws.onmessage = (response) => printMessage(response.data);

class App extends Component {
  componentDidMount() {
    this.props.initializeApp();
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader />;
    } else
      return (
        <div className="app-wrapper">
          <HeaderContainer />
          <Navigation />
          <div className="bg-gray-600 text-white">
            <React.Suspense
              fallback={
                <div>
                  <Preloader />
                </div>
              }
            >
              <Routes>
                <Route path="/dialogs*" element={<DialogContainer />} />
                <Route path="/profile/:userId" element={<ProfileContainer />} />
                <Route path="/profile" element={<ProfileContainer />} />
                <Route path="/news" element={<NewsContainer />} />
                <Route path="/music" element={<Music />} />
                <Route path="/chat" element={<ChatsPage />} />
                <Route path="/users" element={<UsersContainer />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Routes>
            </React.Suspense>
          </div>
        </div>
      );
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized,
});

let AppContainer = compose(
  WithRouter,
  connect(mapStateToProps, { initializeApp })
)(App);

let MainApp = (props) => {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <AppContainer className={"bg-gray-900"} />
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  );
};

export default MainApp;
