const MessageItem = (props) => {
  return (
    <div className={!props.sender && "text-end"}>
      {/* <span>{props.sender}</span> */}
      <span
        className={
          props.sender
            ? "bg-purple-300 p-2 rounded-lg"
            : "bg-purple-600 p-2 rounded-lg"
        }
      >
        {props.message}
      </span>
    </div>
  );
};

export default MessageItem;
