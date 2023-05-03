import { connect } from 'react-redux';
import { addPost, deletePost, getUserPosts} from '../../../Redux/profileReducer';
import MyPosts from './MyPosts';
import React from 'react';


class UserPosts extends React.Component {
    componentDidMount() {
        this.props.getUserPosts()
    }
    render() {
        return <MyPosts getPosts = {this.props.getUserPosts}
        posts = {this.props.posts}
        newPostText = {this.props.newPostText}
        addPost = {this.props.addPost} 
        deletePost = {this.props.deletePost}
        photo = {this.props.photo}/>
    }
}

let mapStateToProps = (state) => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText
    }
}

// let mapDispatchToProps = (dispatch) => {
//     return {
//         addPost: (newPostText) => {
//             dispatch(addPostAC(newPostText));
//         },
//     }
// }

let MyPostContainer = connect(mapStateToProps, {addPost, getUserPosts, deletePost})(UserPosts);

export default MyPostContainer; 