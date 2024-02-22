import React from "react"
import {createField, Input} from "../../common/FormsControls"
import { reduxForm } from "redux-form"
import s from './ProfileInfo.module.css'

const ProfileDataForm = ({ props, handleSubmit, error }) => {
    return <form onSubmit={handleSubmit}>
        {props.isOwner && <button onClick={() => {}}>save</button>}
        <div>
            <b>FullName </b>: {createField("Full name", "fullName", [], Input)}
            <b>Looking for a job </b>: {createField("", "lookingForAJob", [], Input, {type: "checkbox"})}
        </div>
        <div>
            <b>Contacts: </b> {Object.keys(props.profile.contacts).map(key => {
                return <div key= {key} className={s.contact}>
                    <b>{key}: {createField("", "contacts." + key, [], Input)}</b>
                </div>
            })}
        </div>
    </form>
}

const ProfileDataReduxForm = reduxForm({form: "edit-profile"})(ProfileDataForm) 

export default ProfileDataReduxForm;