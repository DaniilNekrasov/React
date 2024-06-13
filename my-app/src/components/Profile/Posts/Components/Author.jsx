import { NavLink } from "react-router-dom";
import { Image } from "antd";
import userPhoto from "./../../../../assets/images/user.jpg";

const BASE_URL = "http://localhost:3001";

const Author = ({ author, width = 100, height = 100 }) => (
  <div className="flex flex-col items-center m-1">
    <NavLink to={`/profile/${author.id}`} className="font-bold">
      {author.login}
    </NavLink>
    <Image
      src={
        author.avatarURL
          ? `${BASE_URL}/user/avatar/${author.avatarURL?.split("\\")[2]}`
          : userPhoto
      }
      fallback={userPhoto}
      className="rounded-lg"
      width={width}
      height={height}
    />
  </div>
);
export default Author;
