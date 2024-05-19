import React from "react";
import Post from "./Post";
import { Form, Formik } from "formik";
import { Button, Input } from "antd";
import TextArea from "antd/es/input/TextArea";

const MyPosts = (props) => {
  let postElements = props.profile.posts.map((info) => (
    <Post
      files={info.file}
      profile={props.profile}
      getPosts={props.getPosts}
      deletePost={props.deletePost}
      key={info.id}
      id={info.id}
      photo={props.photo}
      owner={props.owner}
      author={props.author}
      message={info.content}
      date={info.date}
      title={info.title}
    />
  ));

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
      <h3>My posts</h3>
      <div className="space-y-4 m-4">{postElements}</div>
    </div>
  );
};

export default MyPosts;
