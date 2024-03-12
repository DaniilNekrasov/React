import React from "react";
import styles from "./FormControls.module.css";
import { Field } from "redux-form";
import TextArea from "antd/es/input/TextArea";

export const FormControl = ({ input, meta, child, element, ...props }) => {
  const hasError = meta.touched && meta.error;

  return (
    <div className={styles.formControl + " " + (hasError && styles.error)}>
      {props.children}
      {hasError && <span>{meta.error}</span>}
    </div>
  );
};

export const Textarea = (props) => {
  const { input, meta, child, ...restProps } = props;
  return (
    <FormControl {...props}>
      <TextArea {...props.input} {...restProps} />
    </FormControl>
  );
};
export const Input = (props) => {
  const { input, meta, child, ...restProps } = props;
  return (
    <FormControl {...props}>
      <input {...input} {...restProps} />
    </FormControl>
  );
};

export const createField = (
  placeholder,
  name,
  validators,
  component,
  props = {},
  text = ""
) => (
  <div>
    <Field
      placeholder={placeholder}
      name={name}
      component={component}
      validate={validators}
      {...props}
    />{" "}
    {text}
  </div>
);
