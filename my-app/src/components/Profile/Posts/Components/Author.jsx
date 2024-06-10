import { NavLink } from "react-router-dom";
import { Image } from "antd";
import userPhoto from "./../../../../assets/images/user.jpg";

const BASE_URL = "http://localhost:3001";

const Author = ({ author }) => (
  <div className="flex flex-col items-center m-1">
    <NavLink to={`/profile/${author.id}`} className="font-bold">
      {author.login}
    </NavLink>
    <Image
      src={`${BASE_URL}/user/avatar/${author.avatarURL?.split("\\")[2]}`}
      fallback={userPhoto}
      className="rounded-lg"
      width={100}
      height={100}
    />
  </div>
);
export default Author;
