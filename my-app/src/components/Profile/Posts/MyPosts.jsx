import React, { useState } from 'react';
import s from './MyPosts.module.css'
import Post from './Post';
import { reduxForm, Field, reset } from "redux-form";
import { maxLengthCreator, required } from '../../Login/Validators';
import { Textarea } from '../../common/FormsControls';
import { useEffect } from 'react';


const MyPosts = (props) => {
    const [value, setValue] = useState('')

    let postElements =
        props.posts.map((info) => <Post getPosts={props.getPosts}
            message={info.content} deletePost={props.deletePost}
            key={info.id} id={info.post_id} photo={props.photo}
            owner={props.owner} author={props.author}
            date = {info.date} />);

    let onAddPost = (values) => {
        props.addPost(props.author, value)
        props.getPosts(props.author)
        setValue("")
    }
    // useEffect(() => {
    //     if (props.owner == props.author) {
    //         props.getPosts(props.author)
    //     }
    // }, [])

    return (
        <div >
            <div className={s.MyPosts}>
                {props.owner == props.author && <textarea placeholder= "New post text"
                onChange={e => setValue(e.target.value)} type="text" value={value} />}
                {props.owner == props.author && <button onClick={onAddPost}>Post</button>}
            </div>
            {/* <AddPostFormRedux onSubmit={onAddPost} />} */}
            <br></br>
            <h3>My posts</h3>
            <div className={s.posts}>
                {postElements}
            </div>
        </div>
    )
}

const maxLength10 = maxLengthCreator(100);

const AddPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea} name='newPostText'
                    validate={[required, maxLength10]}
                    className={s.input} placeholder='New post'
                ></Field>
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form >
    )
}

const AddPostFormRedux = reduxForm({ form: "AddPostForm" })(AddPostForm)

export default MyPosts; 
