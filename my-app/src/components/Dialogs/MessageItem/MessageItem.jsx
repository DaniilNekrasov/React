import dayjs from "dayjs";

const MessageItem = (props) => {
  return (
    <div
      className={`relative flex items-center ${
        props.sender ? `flex-row-reverse` : ``
      }`}
    >
      <div
        className={`p-3 rounded-2xl text-sm ${
          props.sender
            ? "bg-indigo-950 rounded-tr-none break-words max-w-72 mr-1"
            : "bg-purple-600 rounded-tl-none break-words max-w-72 ml-1"
        }`}
      >
        {props.message}
      </div>
      <div className="text-xs block mt-1 opacity-30">
        {dayjs(props.date).format(`HH:mm`)}
      </div>
    </div>
  );
};

export default MessageItem;
