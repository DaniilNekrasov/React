import { NavLink } from "react-router-dom";
import s from "./Header.module.css";
import logo from "../../assets/images/logo.png";
import { Button, Image } from "antd";

const Header = (props) => {
  return (
    <header className={s.header}>
      <Image src={logo} width={100} height={100} preview={false}></Image>
      <div className={s.loginBlock}>
        {props.isAuth ? (
          <div>
            {props.login} <Button onClick={props.logout}>Log out</Button>
          </div>
        ) : (
          <NavLink to={"/login"}>Login</NavLink>
        )}
      </div>
    </header>
  );
};

export default Header;
