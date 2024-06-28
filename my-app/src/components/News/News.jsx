import React, { useState } from "react";
import Post from "../Profile/Posts/Post";
import { Input, Select } from "antd";

const News = (props) => {
  const [search, setSearch] = useState("");
  const [searchCriteria, setSearchCriteria] = useState(1);

  const searching = (e) => {
    setSearch(e.target.value);
  };

  const handleCriteriaChange = (value) => {
    setSearchCriteria(value);
  };

  const filterNews = (item) => {
    const lowercasedSearch = search.toLowerCase();
    switch (searchCriteria) {
      case 1:
        return item.post
          ? item.post.author.some((author) =>
              author.login.toLowerCase().includes(lowercasedSearch)
            )
          : item.event.public &&
              item.profile.profile.login
                .toLowerCase()
                .includes(lowercasedSearch);
      case 2:
        return item.post
          ? item.post.title.toLowerCase().includes(lowercasedSearch)
          : item.event.public &&
              item.event.title.toLowerCase().includes(lowercasedSearch);
      case 3:
        return item.post
          ? item.post.content.toLowerCase().includes(lowercasedSearch)
          : item.event.public &&
              item.event.description.toLowerCase().includes(lowercasedSearch);
      case 4:
        return item.post
          ? item.post.keyword.some((keyword) =>
              keyword.title.toLowerCase().includes(lowercasedSearch)
            )
          : false;
      default:
        return true;
    }
  };

  const newsElements = props.news
    .filter(filterNews)
    .map((item, key) =>
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

  const options = [
    { value: 1, label: "Author" },
    { value: 2, label: "Title" },
    { value: 3, label: "Content" },
    { value: 4, label: "Keyword" },
  ];

  return (
    <div className="bg-gray-800 text-white p-4">
      <h1 className="text-3xl font-bold mb-4">News</h1>
      <Input
        placeholder="Search"
        className=" w-96 m-3"
        onChange={searching}
        value={search}
      />
      <Select
        aria-label="Search criteria"
        className="w-96 m-3"
        options={options}
        placeholder={"Search criteria"}
        onChange={handleCriteriaChange}
        value={searchCriteria}
      />
      <div className="space-y-4">{newsElements}</div>
    </div>
  );
};

export default News;
