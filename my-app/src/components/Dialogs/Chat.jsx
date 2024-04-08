import { useEffect, useRef, useState } from "react";
import { withAuthRedirect } from "../HOC/WithAuthRedirect";
import { compose } from "redux";
import { connect } from "react-redux";
import { Button } from "antd";
import TextArea from "antd/es/input/TextArea";

const Chat = (props) => {
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState("");
  const socket = useRef;
  const [connected, setConnected] = useState(false);
  const userId = props.userId;
  const chatId = props.chatId;

  // function connect() {
  //   socket.current = new WebSocket("ws://localhost:3002");
  //   socket.current.onopen = () => {
  //     setConnected(true);
  //     const message = {
  //       event: "connection",
  //       userId: userId,
  //       id: Date.now(),
  //     };
  //     socket.current.send(JSON.stringify(message));
  //     console.log("Connected");
  //   };
  //   socket.current.onmessage = (event) => {
  //     const message = JSON.parse(event.data);
  //     setMessages((prev) => [...prev, message]);
  //   };
  //   socket.current.onclose = () => {
  //     console.log("Socket was closed");
  //   };
  //   socket.current.onerror = () => {
  //     console.log("Socket error");
  //   };
  // }
  useEffect(() => {
    const container = document.querySelector(".bg-gray-500");
    container.scrollTop = container.scrollHeight;
  }, []);

  const sendMessage = async () => {
    const message = {
      senderId: userId,
      chatId: chatId * 1,
      text: value,
      // event: "message",
    };
    props.addNewMessage(message); //delete
    // socket.current.send(JSON.stringify(message));
    setValue("");
  };

  return (
    <div>
      <div className="bg-gray-500 overflow-y-auto space-y-4 max-h-96 p-2 m-3 relative">
        {props.messageElements}
      </div>
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
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  login: state.auth.login,
});

export default compose(connect(mapStateToProps), withAuthRedirect)(Chat);
