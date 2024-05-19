import React, { useEffect } from "react";
import Post from "../Profile/Posts/Post";

const News = (props) => {
  let postElements = props.posts.map((info) => (
    <Post
      getPosts={props.getPosts}
      title={info.post.title}
      files={info.post.file}
      message={info.post.content}
      newsFlag={true}
      profile={info.profile}
      key={info.post.postId}
      id={info.post.postId}
      date={info.post.date}
    />
  ));

  // useEffect(() => {
  //   props.getPosts(props.author);
  // }, []);

  return (
    <div className="bg-gray-800 text-white p-4">
      <h1 className="text-3xl font-bold mb-4">News</h1>
      <div className="space-y-4">{postElements}</div>
    </div>
  );
};

export default News;
