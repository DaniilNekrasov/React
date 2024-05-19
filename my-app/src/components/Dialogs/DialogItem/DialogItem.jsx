import { NavLink } from "react-router-dom";
import s from "./../Dialogs.module.css";
import userPhoto from "../../../assets/images/user.jpg";
import { Image } from "antd";

const DialogItem = (props) => {
  return (
    <NavLink
      className={(navData) => (navData.isActive ? s.active : s.dialog)}
      to={`/dialogs?chatId=${props.dialog.id}`}
    >
      <div className="bg-slate-400 p-2 border-y-2 border-black w-48">
        <Image
          src={`http://localhost:3001/user/avatar/${
            props.dialog.user[0].avatarURL?.split("\\")[2]
          }`}
          fallback={userPhoto}
          className="rounded-full"
          width={50}
          height={50}
        />
        <p>{props.dialog.user[0].login}</p>
        <p className="text-sm text-zinc-800 truncate ...">
          {props.dialog.message[0].text}
        </p>
      </div>
    </NavLink>
  );
};

export default DialogItem;
