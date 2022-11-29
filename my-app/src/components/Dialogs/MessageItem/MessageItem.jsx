import s from './../Dialogs.module.css'


const MessageItem = (Props) => {
    return (
        <div className={s.message}>
            {Props.message}
        </div>
    )
}

export default MessageItem; 