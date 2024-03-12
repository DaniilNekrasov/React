import s from "./Profile.module.css";
import Profile from "./Profile";
import React from "react";
import {
  getUserProfile,
  getStatus,
  updateStatus,
  savePhoto,
  getUserPosts,
  saveProfile,
} from "../../Redux/profileReducer";
import { connect } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { compose } from "redux";
import { withAuthRedirect } from "../HOC/WithAuthRedirect";

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  }

  return ComponentWithRouterProp;
}

class ProfileContainer extends React.Component {
  componentDidMount() {
    let userId = this.props.router.params.userId;
    if (!userId) {
      userId = this.props.authorisedUserId;
    }
    this.props.getUserProfile(userId);
    this.props.getStatus(userId);
    this.props.getUserPosts(userId);
  }

  componentDidUpdate(prevProps, prevProfile, snapshot) {
    if (this.props.router.params.userId !== prevProps.router.params.userId) {
      let userId = this.props.router.params.userId;
      if (!userId) {
        userId = this.props.authorisedUserId;
      }
      this.props.getUserProfile(userId);
      this.props.getStatus(userId);
      this.props.getUserPosts(userId);
    }
  }

  render() {
    return (
      <div className={s.content}>
        <Profile
          {...this.props}
          profile={this.props.profile}
          isOwner={!this.props.router.params.userId}
          status={this.props.status}
          updateStatus={this.props.updateStatus}
          savePhoto={this.props.savePhoto}
          subscribes={this.props.subscribes}
          subscribers={this.props.subscribers}
          saveProfile={this.props.saveProfile}
        />
      </div>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorisedUserId: state.auth.userId,
    isAuth: state.auth.isAuth,
    subscribes: state.profilePage.subscribes,
    subscribers: state.profilePage.subscribers,
  };
};

export default compose(
  connect(mapStateToProps, {
    getUserProfile,
    getUserPosts,
    updateStatus,
    getStatus,
    savePhoto,
    saveProfile,
  }),
  withRouter,
  withAuthRedirect
)(ProfileContainer);
