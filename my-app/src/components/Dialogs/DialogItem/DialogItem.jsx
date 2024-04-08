import { NavLink } from "react-router-dom";
import s from "./../Dialogs.module.css";
import userPhoto from "../../../assets/images/user.jpg";
import { Image } from "antd";

const DialogItem = (props) => {
  return (
    <NavLink
      to={"/dialogs?chatId=" + props.dialog.id}
      className={(navData) => (navData.isActive ? s.active : s.dialog)}
    >
      <div className="bg-slate-400 p-2 border-y-2 border-black">
        <Image
          src={`http://localhost:3001/user/avatar/${
            props.dialog.user[0].avatarURL?.split("\\")[1]
          }`}
          fallback={userPhoto}
          className="rounded-full"
          width={50}
        />
        {
          //last message
          props.dialog.user[0].login
        }
      </div>
    </NavLink>
  );
};

export default DialogItem;
