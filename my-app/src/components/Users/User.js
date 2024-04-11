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
                user.avatarURL?.split("\\")[1]
              }`}
              fallback={userPhoto}
              width={200}
              height={200}
              className="rounded-lg"
            />
          </NavLink>
        </div>
        <span>
          <h2>{user.login}</h2>
          <h3>{user.email}</h3>
          <h4>{user.status}</h4>
        </span>
      </span>
      <span>
        <div>
          {user.followed ? (
            <Button
              disabled={following.some((id) => id === user.id)}
              onClick={() => {
                unfollow(user.id, subId);
              }}
            >
              Unfollow
            </Button>
          ) : (
            <Button
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
