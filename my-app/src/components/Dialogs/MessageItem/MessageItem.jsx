const MessageItem = (props) => {
  debugger;
  return (
    <div
      className={
        props.sender
          ? "bg-indigo-950 p-2 rounded-lg space-y-2 max-w-72 break-words"
          : "bg-purple-600 p-2 rounded-lg space-y-2 max-w-72 break-words"
      }
    >
      <span>{props.message}</span>
      <div className=" text-xs text-gray-400">{props.date?.slice(0, -8)}</div>
    </div>
  );
};

export default MessageItem;
