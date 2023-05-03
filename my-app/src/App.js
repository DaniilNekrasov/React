import './App.css';
import Navigation from './components/Navigation/Navigation';
import { Route, Routes } from 'react-router-dom';
import News from './components/News/News';
import Settings from './components/Settings/Settings';
import Music from './components/Music/Music';
import DialogContainer from './components/Dialogs/DialogContainer';
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/login';
import React, { Component } from 'react';
import { initializeApp } from './Redux/appReducer';
import { connect } from 'react-redux';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { compose } from 'redux';
import Preloader from './components/common/Preloader';
import { Provider } from 'react-redux';
import store from './Redux/reduxStore';
import { BrowserRouter } from 'react-router-dom';

const status = document.getElementById("status")
const messages = document.getElementById("messages")

const ws = new WebSocket("ws://localhost:3002")

function WithRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return (
      <Component
        {...props}
        router={{ location, navigate, params }}
      />
    );
  }

  return ComponentWithRouterProp;
}

function setStatus(value) {
  status.innerHTML = value
}

function printMessage(value) {
  const li = document.createElement("li")

  li.innerHTML = value
  messages.appendChild(li)
}

ws.onopen = () => setStatus("ONLINE")

ws.onclose = () => setStatus("DISCONNECTED")

ws.onmessage = response => printMessage(response.data)

class App extends Component {
  componentDidMount() {
    this.props.initializeApp();
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader />
    }
    else
      return (
        <div className='app-wrapper'>
          <HeaderContainer />
          <Navigation />
          <div className='app-wrapper-content'>
            <Routes>
              <Route path='/dialogs*' element={<DialogContainer />} />
              <Route path='/profile/:userId' element={<ProfileContainer />} />
              <Route path='/profile' element={<ProfileContainer />} />
              <Route path='/news' element={<News />} />
              <Route path='/music' element={<Music />} />
              <Route path='/settings' element={<Settings />} />
              <Route path='/users' element={<UsersContainer />} />
              <Route path='/login' element={<Login />} />
            </Routes>
          </div>
        </div>
      );
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized
})

let AppContainer = compose(
  WithRouter,
  connect(mapStateToProps, { initializeApp }))(App);

let MainApp = (props) => {
  return <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter> 
        <AppContainer />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
}

export default MainApp