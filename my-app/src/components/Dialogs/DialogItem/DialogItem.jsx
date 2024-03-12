import { NavLink } from "react-router-dom";
import s from "./../Dialogs.module.css";
import image from "../../../assets/images/user.jpg";
import { Image } from "antd";

const DialogItem = (Props) => {
  return (
    <NavLink
      to={"/dialogs/" + Props.id}
      className={(navData) => (navData.isActive ? s.active : s.dialog)}
    >
      <div className="bg-slate-400 p-2 border-y-2 border-black">
        <Image src={image} alt={image} className="rounded-full" width={50} />
        {
          //last message
          Props.name
        }
      </div>
    </NavLink>
  );
};

export default DialogItem;
