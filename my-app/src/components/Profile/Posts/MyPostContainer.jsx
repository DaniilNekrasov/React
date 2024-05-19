import { connect } from "react-redux";
import {
  addPost,
  deletePost,
  getUserPosts,
} from "../../../Redux/profileReducer";
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
  }

  componentDidUpdate(prevProps, prevProfile, snapshot) {
    if (this.props.router.params.userId !== prevProps.router.params.userId) {
      let userId = this.props.router.params.userId;
      if (!userId) {
        userId = this.props.author;
      }
      this.props.getUserPosts(userId);
    }
  }

  render() {
    return (
      <MyPosts
        profile={this.props.profile}
        getPosts={this.props.getUserPosts}
        newPostText={this.props.newPostText}
        addPost={this.props.addPost}
        deletePost={this.props.deletePost}
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
  };
};

let MyPostContainer = connect(mapStateToProps, {
  addPost,
  getUserPosts,
  deletePost,
});

export default compose(MyPostContainer, withRouter)(UserPosts);
