import React from 'react';
import s from './MyPosts.module.css'
import Post from './Post';
import { reduxForm, Field } from "redux-form";
import { maxLengthCreator, required } from '../../Login/Validators';
import { Textarea } from '../../common/FormsControls';

const MyPosts = (props) => {

    let postElements =
        props.posts.map((info) => <Post message={info.message} key={info.id} likesCount={info.likesCount} />);

    let onAddPost = (values) => {
        props.addPost(values.newPostText)
    }

    return (
        <div className={s.MyPosts}>
            My posts
            <AddPostFormRedux onSubmit={onAddPost}/>
            <div className={s.posts}>
                {postElements}
            </div>
        </div>
    )
}

const maxLength10 = maxLengthCreator(10);

const addPostForm = (props) => {
    return (
    <form onSubmit={props.handleSubmit}>
        <div>
            <Field component = {Textarea} name = 'newPostText'
            validate = {[required, maxLength10]} placeholder = 'New post'></Field>
        </div>
        <div>
            <button>Add post</button>
        </div>
    </form >
)}

 const AddPostFormRedux = reduxForm({form: "addPostForm"})(addPostForm)

export default MyPosts; 