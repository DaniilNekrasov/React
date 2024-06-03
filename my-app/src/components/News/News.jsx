import React, { useEffect } from "react";
import Post from "../Profile/Posts/Post";
import { Input, Select } from "antd";

const News = (props) => {
  // let combinedElements = [
  //   ...props.posts.map((info) => ({
  //     ...info,
  //     isPost: true,
  //     createdAt: info.date,
  //   })),
  //   ...props.events.map((event) => ({
  //     ...event,
  //     isPost: false,
  //     createdAt: event.createdAt,
  //   })),
  // ];
  // combinedElements.sort(
  //   (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  // );
  // let postElements = combinedElements.map((item) =>
  //   item.isPost ? (
  //     <Post
  //       newsFlag={true}
  //       isPost={true}
  //       files={item.file}
  //       profile={props.profile}
  //       getPosts={props.getPosts}
  //       deletePost={props.deletePost}
  //       key={item.id}
  //       id={item.id}
  //       photo={props.photo}
  //       owner={props.owner}
  //       author={props.author}
  //       message={item.content}
  //       date={item.date}
  //       title={item.title}
  //     />
  //   ) : (
  //     item.public && (
  //       <Post
  //         newsFlag={true}
  //         profile={props.profile}
  //         getPosts={props.getPosts}
  //         isPost={false}
  //         key={item.id}
  //         id={item.id}
  //         photo={props.photo}
  //         owner={props.owner}
  //         author={props.author}
  //         start={item.startTime}
  //         end={item.finishTime}
  //         message={item.description}
  //         date={item.createdAt}
  //         title={item.title}
  //         isPublic={item.public}
  //       />
  //     )
  //   )
  // );
  let postElements = props.posts.map((info) => (
    <Post
      isPost={true}
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

  let options = {
    title: "Title",
    content: "Content",
  };
  return (
    <div className="bg-gray-800 text-white p-4">
      <h1 className="text-3xl font-bold mb-4">News</h1>
      <Input placeholder="Search" className=" w-96 m-3" />
      <Select
        aria-label="Search creteria"
        className="w-96 m-3"
        options={{ options }}
        placeholder={"Search criteria"}
      ></Select>
      <div className="space-y-4">{postElements}</div>
    </div>
  );
};

export default News;
