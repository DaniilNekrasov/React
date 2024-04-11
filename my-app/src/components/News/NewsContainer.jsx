import { connect } from "react-redux";
import News from "./News";
import React from "react";
import { getAllPosts } from "../../Redux/newsReducer";
import { withAuthRedirect } from "../HOC/WithAuthRedirect";
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

class NewsContainer extends React.Component {
  componentDidMount() {
    this.props.getAllPosts(this.props.user);
  }
  render() {
    return (
      <div>
        <News
          {...this.props}
          getPosts={this.props.getAllPosts}
          posts={this.props.posts}
        />
      </div>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    posts: state.news.news,
    user: state.auth.userId,
  };
};

export default compose(
  connect(mapStateToProps, { getAllPosts }),
  withRouter,
  withAuthRedirect
)(NewsContainer);
