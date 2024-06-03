import TextArea from "antd/es/input/TextArea";
import React, { useState } from "react";

const MessageInput = ({ onSendMessage }) => {
  const [value, setValue] = useState("");

  const sendMessage = () => {
    if (value.trim()) {
      onSendMessage(value);
      setValue("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="relative w-full">
      <TextArea
        className="w-full p-3 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={(e) => setValue(e.target.value)}
        value={value}
        onKeyDown={handleKeyDown}
      />
      <button
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500"
        onClick={sendMessage}
      ></button>
    </div>
  );
};

export default MessageInput;
