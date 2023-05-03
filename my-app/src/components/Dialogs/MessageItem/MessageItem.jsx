import s from './../Dialogs.module.css'


const MessageItem = (props) => {
    return (
        <div className={!props.sender && s.right}>
            <span className={props.sender ? s.lMessage : s.rMessage}>{props.message}</span>
            <br />
        </div>
    )
}

export default MessageItem; 