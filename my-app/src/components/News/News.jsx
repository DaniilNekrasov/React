import React from 'react';
import s from './News.module.css'
import Post from '../Profile/Posts/Post'
import { useEffect } from 'react';

const News = (props) => {
    debugger
        let postElements = 
            props.posts.map((info) => <Post getPosts = {props.getPosts}
            message={info.post.content} newsFlag={true} author={info.author}
            key={info.post.post_id} id={info.post.post_id}
            date={info.post.date}/>);

        // useEffect(() => {
        //     props.getPosts(props.author)
        // }, [])

        return (
            <div className={s.MyPosts}>
                <h1 className={s.header}>   News</h1>
                <div className={s.posts}>
                    {postElements}
                </div>
            </div>
        )
    }

export default News; 
