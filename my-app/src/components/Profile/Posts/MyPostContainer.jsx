import { connect } from "react-redux";
import {
  addPost,
  deletePost,
  getUserPosts,
} from "../../../Redux/profileReducer";
import { deleteEvent, getEvents } from "../../../Redux/eventReducer";
import MyPosts from "./MyPosts";
import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { compose } from "redux";

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  }

  return ComponentWithRouterProp;
}
class UserPosts extends React.Component {
  componentDidMount() {
    let userId = this.props.router.params.userId;
    if (!userId) {
      userId = this.props.author;
    }
    this.props.getUserPosts(userId);
    this.props.getEvents(userId);
  }

  componentDidUpdate(prevProps, prevProfile, snapshot) {
    if (this.props.router.params.userId !== prevProps.router.params.userId) {
      let userId = this.props.router.params.userId;
      if (!userId) {
        userId = this.props.author;
      }
      this.props.getUserPosts(userId);
      this.props.getEvents(userId);
    }
  }

  render() {
    return (
      <MyPosts
        profile={this.props.profile}
        getPosts={this.props.getUserPosts}
        getEvents={this.props.getEvents}
        events={this.props.events}
        newPostText={this.props.newPostText}
        addPost={this.props.addPost}
        deletePost={this.props.deletePost}
        deleteEvent={this.props.deleteEvent}
        photo={this.props.photo}
        owner={this.props.owner}
        author={this.props.author}
      />
    );
  }
}

let mapStateToProps = (state) => {
  return {
    newPostText: state.profilePage.newPostText,
    author: state.auth.userId,
    owner: state.profilePage.curId,
    profile: state.profilePage,
    events: state.events.events,
  };
};

let MyPostContainer = connect(mapStateToProps, {
  addPost,
  getEvents,
  getUserPosts,
  deletePost,
  deleteEvent,
});

export default compose(MyPostContainer, withRouter)(UserPosts);
