import React from "react";
import { connect } from "react-redux";
import {
  toggleFollowing,
  follow,
  unfollow,
  setCurrentPage,
  getUsers,
} from "../../Redux/usersReducer";
import Users from "./Users";
import Preloader from "../common/Preloader";
import { withAuthRedirect } from "../HOC/WithAuthRedirect";
import { compose } from "redux";
import {
  getCurrentPage,
  getFollowing,
  getIsFetchint,
  getPageSize,
  getTotalUsersCount,
  getAllUsers,
} from "../../Redux/usersSelectors";

class UsersAPIComponent extends React.Component {
  componentDidMount() {
    this.props.getUsers(
      this.props.currentPage,
      this.props.pageSize,
      this.props.author
    );
    this.props.setCurrentPage(1);
  }

  onPageChanged = (p) => {
    this.props.getUsers(p, this.props.pageSize, this.props.author);
    this.props.setCurrentPage(p);
  };
  render() {
    return (
      <>
        {this.props.isFetching ? <Preloader /> : null}
        <Users
          totalUsersCount={this.props.totalUsersCount}
          pageSize={this.props.pageSize}
          currentPage={this.props.currentPage}
          onPageChanged={this.onPageChanged}
          users={this.props.users}
          follow={this.props.follow}
          unfollow={this.props.unfollow}
          following={this.props.following}
          subId={this.props.author}
        />
      </>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    users: getAllUsers(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetchint(state),
    following: getFollowing(state),
    author: state.auth.userId,
  };
};

export default compose(
  withAuthRedirect,
  connect(mapStateToProps, {
    follow,
    unfollow,
    setCurrentPage,
    toggleFollowing,
    getUsers,
  })
)(UsersAPIComponent);
