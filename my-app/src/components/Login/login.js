import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Input } from "../common/FormsControls";
import { required } from '../Login/Validators';
import { login } from "../../Redux/authReducer";
import style from "../common/FormControls.module.css"

const LoginForm = ({handleSubmit, error}) => {
    return <form onSubmit={handleSubmit}>
        <div>
            <Field placeholder="email" name = {"email"} component={Input}
            validate = {required}/>
        </div>
        <div>
            <Field placeholder="Password" name = {"password"} component={Input}
            type = {'password'} validate = {required}/>
        </div>
        <div>
            <Field component={'input'} name = {"rememberMe"} type={"checkbox"}/>remember me
        </div>
        {error && <div className={style.formSummaryError}>{error}</div>}
        <div>
            <button>Login</button>
        </div>
    </form>
}

const LoginReduxForm = reduxForm ({form: 'login'})(LoginForm)

const Login = (props) => {
    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe)
    }

    if(props.isAuth) {
        return <redirect to = {"/profile"}/> 
    }

    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit}/>
    </div>
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})

export default connect (mapStateToProps, {login})(Login);