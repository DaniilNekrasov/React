import React from 'react';
import { Navigate } from 'react-router-dom';
import DialogItem from './DialogItem/DialogItem';
import s from './Dialogs.module.css'
import MessageItem from './MessageItem/MessageItem';
import { reduxForm, Field } from "redux-form";
import { Textarea } from '../common/FormsControls';
import { maxLengthCreator, required } from '../Login/Validators';

const Dialogs = (props) => {
    let state = props.messagesPage;
    let dialogsElements =
        state.dialogs.map((dialog) => <DialogItem name={dialog.name} key={dialog.id} id={dialog.id} />);
    let messageElements =
        state.messages.map((message) => <MessageItem message={message.message} key={message.id} id={message.id} />);

    let addNewMessage = (values) => {
        props.sendMessage(values.newMessageBody)
    }

    if (!props.isAuth)
        return <Navigate to="/login" />;


    return (
        <nav className={s.dialogs}>
            <div className={s.dialognames}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div>{messageElements}</div>
                <AddMessageFormRedux onSubmit={addNewMessage} />
            </div>
        </nav>
    )
}

let maxLength100 = maxLengthCreator(100); 

const addMessageForm = (props) => {
    return ( 
        <form onSubmit={props.handleSubmit}>
                    <div>
                        <Field component = {Textarea} name = 'newMessageBody' 
                        placeholder = 'Message' validate={[required, maxLength100]} ></Field>
                    </div>
                    <div>
                        <button>Send message</button>
                    </div>
                </form>
    )
}

const AddMessageFormRedux = reduxForm ({form: "dialogAddMessageForm"})(addMessageForm)

export default Dialogs; 