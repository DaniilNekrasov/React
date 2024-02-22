import React from "react";
import Paginator from "../common/Paginator";
import User from "./User";
import s from "./Users.module.css";


let Users = ({ currentPage, onPageChanged, totalUsersCount, pageSize, ...props }) => {
    return <div >
        <div className={s.paginator}><Paginator currentPage={currentPage} onPageChanged={onPageChanged}
            totalUsersCount={totalUsersCount} pageSize={pageSize}/>
        </div>
        <br />
        {
            props.users.map(u => <User user={u} following={props.following}
                unfollow={props.unfollow} key={u.id} follow={props.follow} 
                subId={props.subId}/>)
        }
    </div>
}

export default Users;