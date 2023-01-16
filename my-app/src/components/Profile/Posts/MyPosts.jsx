import React from 'react';
import { addPostActionCreator, updateNewPostTextActionCreator } from '../../../Redux/profileReducer';
import s from './MyPosts.module.css'
import Post from './Post';

const MyPosts = (props) => {
    
    let postElements =
        props.posts.map((info) => <Post message={info.message} key = {info.id} likesCount={info.likesCount} />);

    let addPost = () => {
        props.addPost();
    }
    let newPostElement = React.createRef();
    
    let onPostChange = () => {
        let text = newPostElement.current.value;
        props.updateNewPostText(text);
    }

    return (
        <div className={s.MyPosts}>
            My posts
            <div >
                <div><textarea onChange = {onPostChange} ref = {newPostElement} value = {props.newPostText}/></div>
                <div><button>Remove</button></div>

                <button onClick={addPost}>Add post</button>
            </div >
            <div className={s.posts}>
                {postElements}
            </div>
        </div>
    )
}

export default MyPosts; 