import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import DialogItem from "./DialogItem/DialogItem";
import s from "./Dialogs.module.css";
import MessageItem from "./MessageItem/MessageItem";
import DialogsList from "./DialogsList";
import Chat from "./Chat";

const Dialogs = (props) => {
  const navigate = useNavigate();
  let [param] = useSearchParams();
  let chatId = param.get("chatId");
  let state = props.messagesPage;
  let dialogsElements = state.dialogs.map((dialog) => (
    <DialogItem login={dialog.login} key={dialog.id} id={dialog.id} /> // give there dialogid not userid
  ));
  let messageElements = state.messages.map((message) => (
    <MessageItem
      sender={message.senderId}
      message={message.text}
      key={message.id}
      id={message.id}
    />
  ));

  useEffect(() => {
    try {
      props.getDialogs(props.userId);
      props.getMessages(chatId || 1);
    } catch (e) {
      navigate("/login");
    }
  }, [chatId]);

  return (
    <nav className={s.dialogs}>
      <DialogsList items={dialogsElements} />
      <Chat
        addNewMessage={props.sendMessage}
        messageElements={messageElements}
        chatId={chatId || 1}
        userId={props.userId}
      />
    </nav>
  );
};

export default Dialogs;
