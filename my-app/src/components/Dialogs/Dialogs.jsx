import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DialogItem from "./DialogItem/DialogItem";
import s from "./Dialogs.module.css";
import MessageItem from "./MessageItem/MessageItem";
import DialogsList from "./DialogsList";
import Chat from "./Chat";

const Dialogs = (props) => {
  const navigate = useNavigate();

  let state = props.messagesPage;
  let dialogsElements = state.dialogs.map((dialog) => (
    <DialogItem name={dialog.name} key={dialog.id} id={dialog.id} />
  ));
  let messageElements = state.messages.map((message) => (
    <MessageItem
      sender={message.sender}
      message={message.message}
      key={message.id}
      id={message.id}
    />
  ));

  useEffect(() => {
    try {
      props.getDialog();
    } catch (e) {
      navigate("/login");
    }
  }, [state.messages]);

  let addNewMessage = (values) => {
    try {
      props.sendMessage(values.newMessageBody);
    } catch (e) {
      navigate("/login");
    }
  };

  return (
    <nav className={s.dialogs}>
      <DialogsList items={dialogsElements} />
      <Chat addNewMessage={addNewMessage} messageElements={messageElements} />
    </nav>
  );
};

// let maxLength100 = maxLengthCreator(100);

// const addMessageForm = (props) => {
//   return (
//     <form onSubmit={props.handleSubmit}>
//       <div>
//         <Field
//           component={Textarea}
//           name="newMessageBody"
//           placeholder="Message"
//           validate={[maxLength100]}
//         ></Field>
//       </div>
//       <div>
//         <button>Send message</button>
//       </div>
//     </form>
//   );
// };

// const AddMessageFormRedux = reduxForm({ form: "dialogAddMessageForm" })(
//   addMessageForm
// );

export default Dialogs;
