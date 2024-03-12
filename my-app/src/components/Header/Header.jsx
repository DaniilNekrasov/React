import { NavLink } from "react-router-dom";
import s from "./Header.module.css";
import logo from "../../assets/images/logo.png";

const Header = (props) => {
  return (
    <header className={s.header}>
      <img src={logo}></img>
      <div className={s.loginBlock}>
        {props.isAuth ? (
          <div>
            {props.login} <button onClick={props.logout}>Log out</button>
          </div>
        ) : (
          <NavLink to={"/login"}>Login</NavLink>
        )}
      </div>
    </header>
  );
};

export default Header;
