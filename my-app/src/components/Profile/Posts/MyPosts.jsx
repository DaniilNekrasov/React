import React from "react";
import Post from "./Post";
import { Form, Formik } from "formik";
import { Button, Input } from "antd";
import TextArea from "antd/es/input/TextArea";

const MyPosts = (props) => {
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

  let postElements = combinedElements.map((item) =>
    item.isPost ? (
      <Post
        isPost={true}
        files={item.file}
        profile={props.profile}
        getPosts={props.getPosts}
        deletePost={props.deletePost}
        key={item.id}
        id={item.id}
        photo={props.photo}
        owner={props.owner}
        author={props.author}
        message={item.content}
        date={item.date}
        title={item.title}
      />
    ) : (
      (props.owner === props.author || item.public) && (
        <Post
          profile={props.profile}
          getPosts={props.getPosts}
          isPost={false}
          key={item.id}
          id={item.id}
          photo={props.photo}
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
  return (
    <div>
      <Formik
        initialValues={{ content: "", title: "" }}
        onSubmit={(values, { resetForm }) => {
          props.addPost(
            props.author,
            values.content,
            values.title,
            values.files
          );
          resetForm();
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
        }) => (
          <Form onSubmit={handleSubmit} className="m-5 space-y-3">
            {props.owner === props.author && (
              <Input
                placeholder="New post title"
                onChange={handleChange}
                name="title"
                type="text"
                value={values.title}
              ></Input>
            )}
            {errors.title && touched.title && (
              <div className="text-red-500 mx-3">{errors.title}</div>
            )}
            {props.owner === props.author && (
              <TextArea
                name="content"
                placeholder="New post text"
                onChange={handleChange}
                type="text"
                value={values.content}
              />
            )}
            {errors.content && touched.content && (
              <div className="text-red-500 mx-3">{errors.content}</div>
            )}
            {props.owner === props.author && (
              <Input
                type="file"
                name="files"
                multiple
                accept=".pdf,.txt,.doc,.svg,.jpg,.png"
                onChange={(event) => {
                  setFieldValue("files", event.currentTarget.files);
                }}
              />
            )}
            {props.owner === props.author && (
              <Button
                className="bg-blue-400"
                type="submit"
                onClick={handleSubmit}
              >
                Post
              </Button>
            )}
          </Form>
        )}
      </Formik>
      <div className="m-2 font-bold">My posts and events</div>
      <div className="space-y-4 m-4">{postElements}</div>
    </div>
  );
};

export default MyPosts;
