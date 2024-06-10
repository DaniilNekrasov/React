import React, { useEffect, useState } from "react";
import Post from "./Post";
import { Form, Formik } from "formik";
import { Button, Input, Select, Image, Tag } from "antd";
import { postsAPI } from "../../../API/API";

const MyPosts = (props) => {
  const [items, setItems] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [keywordInput, setKeywordInput] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);

  const addKeyword = () => {
    if (keywordInput.trim() && !keywords.includes(keywordInput.trim())) {
      setKeywords([...keywords, keywordInput.trim()]);
      setKeywordInput("");
    }
  };

  const removeKeyword = (removedKeyword) => {
    setKeywords(keywords.filter((keyword) => keyword !== removedKeyword));
  };

  let combinedElements = [
    ...props.profile.posts.map((info) => ({
      ...info,
      isPost: true,
      createdAt: info.date,
    })),
    ...props.events.map((event) => ({
      ...event,
      isPost: false,
      createdAt: event.createdAt,
    })),
  ];
  combinedElements.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  let postElements = combinedElements.map((item, num) =>
    item.isPost ? (
      <Post
        isPost={true}
        files={item.file}
        profile={props.profile}
        getPosts={props.getPosts}
        deletePost={props.deletePost}
        key={num}
        id={item.id}
        owner={props.owner}
        author={props.author}
        message={item.content}
        date={item.date}
        title={item.title}
        keywords={item.keyword}
        authors={item.author}
      />
    ) : (
      (props.owner === props.author || item.public) && (
        <Post
          profile={props.profile}
          getEvents={props.getEvents}
          isPost={false}
          key={num}
          id={item.id}
          deleteEvent={props.deleteEvent}
          owner={props.owner}
          author={props.author}
          start={item.startTime}
          end={item.finishTime}
          message={item.description}
          date={item.createdAt}
          title={item.title}
          isPublic={item.public}
        />
      )
    )
  );

  useEffect(
    () => async () => {
      let subs = (await postsAPI.getSubscribes(3)).data;
      let subers = (await postsAPI.getSubscribers(3)).data;
      let result = [];
      for (let i = 0; i < subers.length; i++) {
        for (let j = 0; j < subs.length; j++) {
          subers[i].subscriberId === subs[j].subscribedToId &&
            subers[i].subscriberId !== subers[i].subscribedToId &&
            result.push(subers[i].subscriberId);
        }
      }
      setItems(result);
    },
    []
  );

  return (
    <div className="p-5 max-w-screen-lg mx-auto rounded-lg">
      <Formik
        initialValues={{ content: "", title: "", files: null, keywords: [] }}
        onSubmit={(values, { resetForm }) => {
          setSelectedItems(selectedItems.unshift(props.author));
          props.addPost(
            selectedItems,
            values.content,
            values.title,
            values.files,
            keywords
          );
          resetForm();
          setKeywords([]);
          setSelectedItems([]);
        }}
        validate={(values) => {
          const errors = {};
          if (!values.title) {
            errors.title = "Title required";
          }
          if (!values.content) {
            errors.content = "Content required";
          }
          return errors;
        }}
      >
        {({
          values,
          handleChange,
          handleSubmit,
          setFieldValue,
          errors,
          touched,
        }) =>
          props.author === props.owner && (
            <Form onSubmit={handleSubmit} className="m-5 space-y-3">
              <label className="text-lg">New post</label>
              <Input
                placeholder="New post title"
                onChange={handleChange}
                name="title"
                type="text"
                value={values.title}
              />
              {errors.title && touched.title && (
                <div className="text-red-500 mx-3">{errors.title}</div>
              )}
              <Input.TextArea
                name="content"
                placeholder="New post text"
                onChange={handleChange}
                value={values.content}
              />
              {errors.content && touched.content && (
                <div className="text-red-500 mx-3">{errors.content}</div>
              )}
              <Input
                type="file"
                name="files"
                multiple
                accept=".pdf,.txt,.doc,.svg,.jpg,.png"
                onChange={(event) => {
                  setFieldValue("files", event.currentTarget.files);
                }}
              />
              <div className="space-x-3">
                {keywords.map((keyword) => (
                  <Tag
                    key={keyword}
                    closable
                    onClose={() => removeKeyword(keyword)}
                  >
                    {keyword}
                  </Tag>
                ))}
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  maxLength={50}
                  value={keywordInput}
                  onChange={(e) => setKeywordInput(e.target.value)}
                  placeholder="Enter keyword"
                  onPressEnter={addKeyword}
                />
                <Button onClick={addKeyword} className="bg-blue-300 text-black">
                  Add Keyword
                </Button>
              </div>
              <Select
                name="author"
                mode="multiple"
                options={items.map((item) => ({
                  value: item,
                  label: item,
                }))}
                onChange={setSelectedItems}
                value={selectedItems}
                maxCount={3}
                className="w-52"
                placeholder="Coauthors"
              />
              <Button
                className="bg-blue-300 ml-5"
                type="submit"
                onClick={handleSubmit}
              >
                Post
              </Button>
            </Form>
          )
        }
      </Formik>
      <div className="m-2 font-bold">My posts and events</div>
      <div className="space-y-4 m-4">{postElements}</div>
    </div>
  );
};

export default MyPosts;
