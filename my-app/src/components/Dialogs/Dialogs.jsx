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
    <DialogItem dialog={dialog} key={dialog.id} />
  ));
  let messageElements = state.messages.map((message) => (
    <MessageItem
      sender={message.senderId === props.userId}
      message={message.text}
      date={message.date}
      key={message.id}
      id={message.id}
    />
  ));

  useEffect(() => {
    try {
      props.getDialogs(props.userId);
      chatId && props.getMessages(chatId);
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
        chatId={chatId}
        userId={props.userId}
      />
    </nav>
  );
};

export default Dialogs;
