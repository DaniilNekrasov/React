import React from 'react';
import s from './MyPosts.module.css'
import Post from './Post';

const MyPosts = (props) => {
    
    let postElements =
        props.Data.posts.map((info) => <Post message={info.message} likesCount={info.likesCount} />);

    let addPoster = () => {
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

                <button onClick={addPoster}>Add post</button>
            </div >
            <div className={s.posts}>
                {postElements}
            </div>
        </div>
    )
}

export default MyPosts; 