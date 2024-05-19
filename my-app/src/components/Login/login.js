import React from "react";
import { connect } from "react-redux";
import { login } from "../../Redux/authReducer";
import { Navigate, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { Button, Form, Input } from "antd";

const Login = (props) => {
  let navigate = useNavigate();
  if (props.isAuth) {
    return <Navigate to={"/profile"} />;
  }
  const redirect = () => {
    navigate("/register");
  };
  return (
    <Formik
      initialValues={{ login: "", password: "" }}
      validate={(values) => {
        const errors = {};
        if (!values.login) {
          errors.login = "Login required";
        }
        if (!values.password) {
          errors.password = "Password required";
        }
        return errors;
      }}
      onSubmit={(values) => {
        props.login(values.login, values.password, values.rememberMe);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
      }) => (
        <Form onSubmit={handleSubmit} className="px-4 py-6">
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
            htmlType="submit"
            //disabled={isSubmitting}
            onClick={handleSubmit}
          >
            Login
          </Button>
          <div className="m-3">Have no account yet?</div>
          <Button
            className="bg-black text-white m-3"
            type="redirect"
            onClick={redirect}
          >
            Register
          </Button>
        </Form>
      )}
    </Formik>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, { login })(Login);
