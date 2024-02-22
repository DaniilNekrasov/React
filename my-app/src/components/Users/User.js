import React from "react";
import { NavLink } from "react-router-dom";
import userPhoto from './../../assets/images/user.jpg';
import styles from './User.module.css';


let User = ({user, unfollow, follow, following, subId}) => {
    return (
        <div className={styles.container}>
            <span>
                <div>
                    <NavLink to={'/profile/' + user.id}>
                        <img src={user.photo ? user.photo : userPhoto}
                        className={styles.userPhoto} />
                    </NavLink>
                </div>
                <span>
                    <h2>{user.login}</h2>
                    <h4>{user.status}</h4>
                </span>
            </span>
            <span>
                <div>
                    {user.followed
                        ? <button disabled={following.some(id => id === user.id)}
                            onClick={() => {unfollow(user.id, subId) }}
                            className={styles.but}>
                            Unfollow</button>
                        : <button disabled={following.some(id => id === user.id)}
                            onClick={() => {follow(user.id, subId) }}
                            className={styles.but}>
                            Follow</button>}
                </div>
                <span>
                    {/* <div>{"user.location.country"}</div> */}
                    {/* <div>{"user.location.city"}</div> */}
                </span>
            </span>
        </div>)
}

export default User;