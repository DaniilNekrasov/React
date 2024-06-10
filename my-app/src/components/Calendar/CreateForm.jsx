import React from "react";
import { Formik, Form, Field } from "formik";
import { Button, Checkbox, DatePicker } from "antd";
import { getEvents } from "../../Redux/eventReducer";
import { useDispatch } from "react-redux";
import { eventAPI } from "../../API/API";

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
      onSubmit={(values, { setSubmitting, resetForm, setFieldValue }) => {
        setSubmitting(true);
        resetForm();
        eventAPI.createEvent(props.user.userId, values);
        setSubmitting(false);
        dispatch(getEvents(props.user.userId));
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
              name="range"
              placeholder={["Start date", "Finish date"]}
              format="YYYY-MM-DD HH:mm"
              // value={[values.start, values.end]}
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
              debugger;
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
