import React from 'react';
import DialogItem from './DialogItem/DialogItem';
import s from './Dialogs.module.css'
import MessageItem from './MessageItem/MessageItem';

const Dialogs = (props) => {
    let state = props.messagesPage;
debugger;
    let dialogsElements = 
        state.dialogs.map((dialog) => <DialogItem name={dialog.name} key = {dialog.id} id={dialog.id} />);
    let messageElements =
        state.messages.map((message) => <MessageItem message={message.message} key = {message.id} id={message.id} />);
    let textRef = React.createRef();

    let sendMes = () =>{
        props.sendMessage();       
    }
    let mesTextChange = () => {
        let text = textRef.current.value;
        props.updateNewMessageBody(text);
    }

    return (
        <nav className={s.dialogs}>
            <div className={s.dialognames}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messageElements}
                <div>
                    <textarea value = {state.newMessageText} ref = {textRef} 
                    className={s.text} onChange = {mesTextChange}></textarea>
                </div>
                <div>
                    <button onClick = {sendMes} className={s.send}>Send message</button>
                </div>
            </div>
        </nav>
    )
}

export default Dialogs; 