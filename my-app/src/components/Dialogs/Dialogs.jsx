import React from 'react';
import DialogItem from './DialogItem/DialogItem';
import s from './Dialogs.module.css'
import MessageItem from './MessageItem/MessageItem';

const Dialogs = (props) => {
    let textRef = React.createRef();
    let sendMes = () =>{
        let text = textRef.current.value;
        alert(text); 
    }

    let dialogsElements = 
        props.Data.dialogs.map((dialog) => <DialogItem name={dialog.name} id={dialog.id} />);
    let messageElements =
        props.Data.messages.map((message) => <MessageItem message={message.message} id={message.id} />);

    return (
        <nav className={s.dialogs}>
            <div className={s.dialognames}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messageElements}
                <div>
                    <textarea ref = {textRef}className={s.text}></textarea>
                </div>
                <div>
                    <button onClick = {sendMes} className={s.send}>Send message</button>
                </div>
            </div>
        </nav>
    )
}

export default Dialogs; 