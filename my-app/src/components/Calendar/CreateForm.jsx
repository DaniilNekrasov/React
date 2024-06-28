import React from "react";
import { Formik, Form, Field } from "formik";
import { Button, Checkbox, DatePicker } from "antd";
import { getEvents } from "../../Redux/eventReducer";
import { useDispatch } from "react-redux";
import { eventAPI } from "../../API/API";
import "./form.module.css";

const { RangePicker } = DatePicker;

const CreateForm = (props) => {
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{
        range: "",
        start: "",
        end: "",
        title: "",
        description: "",
        isPublic: false,
      }}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setSubmitting(true);
        eventAPI
          .createEvent(props.user.userId, values)
          .then(() => {
            resetForm();
            dispatch(getEvents(props.user.userId));
          })
          .finally(() => {
            setSubmitting(false);
          });
      }}
      validate={(values) => {
        const errors = {};
        if (!values.title) {
          errors.title = "Title required";
        }
        if (!values.description) {
          errors.description = "Description required";
        }
        if (!values.end || !values.start) {
          errors.range = "Range required";
        }
        return errors;
      }}
    >
      {({ isSubmitting, setFieldValue, values, errors, touched }) => (
        <Form className="space-y-3">
          <Field
            name="title"
            placeholder="Title"
            className="w-full p-2 rounded-lg"
          />
          {errors.title && touched.title && (
            <div className="text-red-600 mx-1">{errors.title}</div>
          )}
          <Field
            name="description"
            placeholder="Description"
            multiline
            className="w-full p-2 rounded-lg"
            rows={4}
          />
          {errors.description && touched.description && (
            <div className="text-red-600 mx-1">{errors.description}</div>
          )}
          <div className="flex space-x-4">
            <RangePicker
              showTime
              allowClear={true}
              name="range"
              placeholder={["Start date", "Finish date"]}
              format="YYYY-MM-DD HH:mm"
              onChange={(date) => {
                setFieldValue("start", date ? date[0] : "");
                setFieldValue("end", date ? date[1] : "");
              }}
            ></RangePicker>
            {errors.range && touched.range && (
              <div className="text-red-600 mx-1">{errors.range}</div>
            )}
          </div>
          <Checkbox
            name="isPublic"
            checked={values.isPublic}
            onChange={(data) => {
              setFieldValue("isPublic", data.target.checked);
            }}
          >
            Is public
          </Checkbox>
          <Button htmlType="submit" disabled={isSubmitting} variant="contained">
            Create
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default CreateForm;
