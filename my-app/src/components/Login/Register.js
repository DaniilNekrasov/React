import React from "react";
import { connect } from "react-redux";
import { register } from "../../Redux/authReducer";
import { Navigate, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { Button, Input, Form } from "antd";

const Register = (props) => {
  let navigate = useNavigate();
  if (props.isAuth) {
    return <Navigate to={"/profile"} />;
  }
  const redirect = () => {
    navigate("/login");
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validate={(values) => {
        const errors = {};
        if (!values.login) {
          errors.login = "Login required";
        }
        if (!values.email) {
          errors.email = "Email required";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
        ) {
          errors.email = "Invalid email address";
        }
        if (!values.password) {
          errors.password = "Password required";
        }
        return errors;
      }}
      onSubmit={(values) => {
        props.register(values.login, values.password, values.email);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <Form onSubmit={handleSubmit} className="px-4 py-6 ">
          <div>
            <Input
              className="w-60 m-3 p-2 border-2 border-black"
              type="email"
              name="email"
              placeholder="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
          </div>
          {errors.email && touched.email && (
            <div className="text-red-500 mx-3">{errors.email}</div>
          )}
          <div>
            <Input
              className="w-60 m-3 p-2 border-2 border-black"
              type="login"
              name="login"
              placeholder="login"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.login}
            />
          </div>
          {errors.login && touched.login && (
            <div className="text-red-500 mx-3">{errors.login}</div>
          )}
          <div>
            <Input
              className="w-60 m-3 p-2 border-2 border-black"
              type="password"
              name="password"
              placeholder="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
          </div>
          {errors.password && touched.password && (
            <div className="text-red-500 mx-3">{errors.password}</div>
          )}
          <Button
            className="bg-black text-white m-3"
            type="submit"
            // disabled={isSubmitting}
            onClick={handleSubmit}
          >
            Create profile
          </Button>
          <Button
            className="bg-black text-white m-3"
            type="redirect"
            onClick={redirect}
          >
            Back to login
          </Button>
        </Form>
      )}
    </Formik>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, { register })(Register);
