import { NavLink } from "react-router-dom";
import s from "./Navigation.module.css";
import {
  LucideNewspaper,
  MessageCircle,
  MessageSquare,
  UserCircle2,
  UsersRound,
} from "lucide-react";

const Navigation = () => {
  return (
    <nav className={s.nav}>
      <NavLink
        to="profile"
        className={(navData) => (navData.isActive ? s.active : s.item)}
      >
        <div className={s.page}>
          <UserCircle2></UserCircle2>
          Profile
        </div>
      </NavLink>
      <div className={s.page}>
        <NavLink
          to="dialogs"
          className={(navData) => (navData.isActive ? s.active : s.item)}
        >
          <div className={s.page}>
            <MessageCircle></MessageCircle>
            Dialogs
          </div>
        </NavLink>
      </div>
      <NavLink
        to="news"
        className={(navData) => (navData.isActive ? s.active : s.item)}
      >
        <div className={s.page}>
          <LucideNewspaper></LucideNewspaper>
          News
        </div>
      </NavLink>
      <NavLink
        to="settings"
        className={(navData) => (navData.isActive ? s.active : s.item)}
      >
        <div className={s.page}>
          <MessageSquare></MessageSquare>
          Global chat
        </div>
      </NavLink>
      <NavLink
        to="users"
        className={(navData) => (navData.isActive ? s.active : s.item)}
      >
        <div className={s.page}>
          <UsersRound></UsersRound>
          Users
        </div>
      </NavLink>
    </nav>
  );
};
export default Navigation;
