import { useEffect, useState } from "react";
import { withAuthRedirect } from "../HOC/WithAuthRedirect";
import { compose } from "redux";
import { connect } from "react-redux";
import { Button } from "antd";
import TextArea from "antd/es/input/TextArea";
import MessageItem from "./MessageItem/MessageItem";
import { io } from "socket.io-client";

const Chat = (props) => {
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState("");
  let socket;
  const [connected, setConnected] = useState(false);
  const userId = props.userId;
  const chatId = props.chatId;

  function connect() {
    socket = io.connect("http://localhost:3002", {
      withCredentials: true,
    });
    socket.onopen = () => {
      setConnected(true);
      const message = {
        event: "connection",
        chatId: chatId,
        userId: userId,
        id: Date.now(),
      };
      socket.send(JSON.stringify(message));
      console.log("Connected");
    };
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      const messageElement = (
        <MessageItem
          sender={message.senderId}
          message={message.text}
          date={message.date}
          id={message.id}
        ></MessageItem>
      );
      setMessages((prev) => [...prev, messageElement]);
      const container = document.getElementById("scroll");
      container.scrollTop = container.scrollHeight;
    };
    socket.onclose = () => {
      console.log("Socket was closed");
    };
    socket.onerror = () => {
      console.log("Socket error");
    };
  }

  useEffect(() => {
    socket?.close(1000, "соединение с чатом " + chatId + " закрыто!");
    if (chatId) {
      const container = document.getElementById("scroll");
      container.scrollTop = container.scrollHeight;
      connect();
    }
  }, [chatId]);

  const sendMessage = async () => {
    const message = {
      date: new Date(Date.now()).toISOString(),
      senderId: userId,
      chatId: chatId * 1,
      text: value,
      event: "message",
    };
    props.addNewMessage(message);
    socket.send(JSON.stringify(message));
    setValue("");
  };

  return (
    <div>
      <div
        id="scroll"
        className="bg-gray-500 overflow-y-auto space-y-4 max-h-96 p-2 m-3 relative "
      >
        {chatId ? props.messageElements : "Select a dialog"}
        {chatId && messages}
      </div>
      {chatId && (
        <div className="p-1 m-2">
          <TextArea
            className=""
            onChange={(e) => setValue(e.target.value)}
            type="text"
            value={value}
          />
          <Button className="bg-black text-white" onClick={sendMessage}>
            Send
          </Button>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  login: state.auth.login,
});

export default compose(connect(mapStateToProps), withAuthRedirect)(Chat);
