import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Input } from "../common/FormsControls";
import { required } from '../Login/Validators';
import { login, register } from "../../Redux/authReducer";
import style from "../common/FormControls.module.css"
import { Navigate, redirect } from "react-router-dom";

const LoginForm = ({handleSubmit, error}) => {
    return <form onSubmit={handleSubmit}>
        <div>
            <Field placeholder="login" name = {"login"} component={Input}
            validate = {required}/>
        </div>
        <br></br>
        <div>
            <Field placeholder="Password" name = {"password"} component={Input}
            type = {'password'} validate = {required}/>
        </div>
        <br></br>
        {error && <div className={style.formSummaryError}>{error}</div>}
        <div>
            <button>Go</button>
        </div>
    </form>
}

const RegisterForm = ({handleSubmit, error}) => {
    return LoginForm({handleSubmit, error})
}

const LoginReduxForm = reduxForm ({form: 'login'})(LoginForm)
const RegisterReduxForm = reduxForm ({form: 'register'})(RegisterForm)

const Login = (props) => {
    const onSubmit = (formData) => {
        props.login(formData.login, formData.password, formData.rememberMe)
    }
    const register = (formData) => {
        props.register(formData.login, formData.password, formData.rememberMe)
    }

    if(props.isAuth) {
        return <Navigate to = {"/settings"}/> 
    }

    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit}/>
        <h1>Register</h1>
        <RegisterReduxForm onSubmit = {register}/>
    </div>
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})

export default connect (mapStateToProps, {login, register} )(Login);