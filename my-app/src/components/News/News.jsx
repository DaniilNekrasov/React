import React from "react";
import Post from "../Profile/Posts/Post";
import { Input, Select } from "antd";

const News = (props) => {
  let newsElements = props.news.map((item, key) =>
    item.post ? (
      <Post
        newsFlag={true}
        isPost={true}
        files={item.post.file}
        profile={item.profile}
        key={key}
        id={item.post.id}
        owner={item.profile.profile.id}
        author={props.user}
        message={item.post.content}
        date={item.post.date}
        title={item.post.title}
        keywords={item.post.keyword}
        authors={item.post.author}
        postLike={item.post.postLike}
        comments={item.post.Comment}
      />
    ) : (
      item.event.public && (
        <Post
          newsFlag={true}
          profile={item.profile}
          isPost={false}
          key={key}
          id={item.event.id}
          owner={item.profile.profile.id}
          author={props.user}
          start={item.event.startTime}
          end={item.event.finishTime}
          message={item.event.description}
          date={item.event.createdAt}
          title={item.event.title}
          isPublic={item.event.public}
        />
      )
    )
  );

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
      <div className="space-y-4">{newsElements}</div>
    </div>
  );
};

export default News;
