import React from "react";
import { NavLink } from "react-router-dom";
import userPhoto from "./../../assets/images/user.jpg";
import styles from "./User.module.css";
import { Button, Image } from "antd";

let User = ({ user, unfollow, follow, following, subId }) => {
  return (
    <div className={styles.container}>
      <span>
        <div>
          <NavLink to={"/profile/" + user.id}>
            <Image
              src={`http://localhost:3001/user/avatar/${
                user.avatarURL?.split("\\")[2]
              }`}
              fallback={userPhoto}
              width={200}
              height={200}
              className="rounded-lg"
            />
          </NavLink>
        </div>
        <span className=" space-y-3">
          <div className=" text-2xl">{user.login}</div>
          <div className=" text-xl">{user.email}</div>
          <div className=" text-lg">{user.status}</div>
        </span>
      </span>
      <span>
        <div>
          {user.followed ? (
            <Button
              className=" bg-red-400 m-3"
              disabled={following.some((id) => id === user.id)}
              onClick={() => {
                unfollow(user.id, subId);
              }}
            >
              Unfollow
            </Button>
          ) : (
            <Button
              className=" bg-green-400 m-3"
              disabled={following.some((id) => id === user.id)}
              onClick={() => {
                follow(user.id, subId);
              }}
            >
              Follow
            </Button>
          )}
        </div>
        <span>
          {/* <div>{"user.location.country"}</div> */}
          {/* <div>{"user.location.city"}</div> */}
        </span>
      </span>
    </div>
  );
};

export default User;
