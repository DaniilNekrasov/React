import { connect } from "react-redux";
import {
  addPost,
  deletePost,
  getUserPosts,
} from "../../../Redux/profileReducer";
import MyPosts from "./MyPosts";
import React from "react";

class UserPosts extends React.Component {
  componentDidMount() {
    if (this.props.router !== undefined) {
      let userId = this.props.router.params.userId;
      this.props.getUserPosts(userId);
    } else {
      let userId = this.props.author;
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
})(UserPosts);

export default MyPostContainer;
