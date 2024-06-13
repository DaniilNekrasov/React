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
  updateInfo,
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
  }

  componentDidUpdate(prevProps, prevProfile, snapshot) {
    if (this.props.router.params.userId !== prevProps.router.params.userId) {
      let userId = this.props.router.params.userId;
      if (!userId) {
        userId = this.props.authorisedUserId;
      }
      this.props.getUserProfile(userId);
      this.props.getStatus(userId);
    }
  }

  render() {
    return (
      <div className={s.content}>
        <Profile
          {...this.props}
          myId={this.props.myId}
          profile={this.props.profile}
          isOwner={this.props.myId === this.props.profile?.id}
          status={this.props.status}
          updateStatus={this.props.updateStatus}
          updateInfo={this.props.updateInfo}
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
    myId: state.auth.userId,
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
    updateInfo,
  }),
  withRouter,
  withAuthRedirect
)(ProfileContainer);
