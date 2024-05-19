import React from "react";
import { Formik, Form, Field } from "formik";
import { Button, Checkbox, TimePicker, DatePicker } from "antd";
import { getEvents } from "../../Redux/eventReducer";
import { useDispatch } from "react-redux";
import { eventAPI } from "../../API/API";

const CreateForm = (props) => {
  const dispatch = useDispatch();

  const handleSubmit = (values, { setSubmitting }) => {
    setSubmitting(true);
    eventAPI.createEvent(props.user.userId, values);
    setSubmitting(false);
    dispatch(getEvents(props.user.userId));
  };

  return (
    <Formik
      initialValues={{
        start: new Date(),
        end: new Date(),
        title: "",
        description: "",
        isPublic: false,
      }}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, setFieldValue, values }) => (
        <Form className="space-y-3">
          <Field name="title" placeholder="Title" className="w-full" />
          <Field
            name="description"
            placeholder="description"
            multiline
            className="w-full"
            rows={4}
          />
          <div className="flex space-x-4">
            <DatePicker
              name="startDate"
              placeholder="Start date"
              format="YYYY-MM-DD HH:mm"
              onChange={(date) => {
                setFieldValue("start", date);
              }}
            />
            {/* <TimePicker
              name="startTime"
              placeholder="Start time"
              format="HH:mm"
              onChange={(time, timeString) => {
                values.start.setHours(timeString);
              }}
            /> */}
          </div>
          <div className="flex space-x-4">
            <DatePicker
              name="endDate"
              placeholder="Finish date"
              format="YYYY-MM-DD HH:mm"
              onChange={(date) => {
                setFieldValue("end", date);
              }}
            />
            {/* <TimePicker
              name="endTime"
              placeholder="Finish time"
              format="HH:mm"
              onChange={(time) => {
                debugger;
                values.end.setHours(time.hour, time.minute);
              }}
            /> */}
          </div>
          <Checkbox name="isPublic">Is public</Checkbox>
          <Button htmlType="submit" disabled={isSubmitting} variant="contained">
            Create
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default CreateForm;
