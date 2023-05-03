import React from "react";
import Paginator from "../common/Paginator";
import User from "./User";


let Users = ({currentPage, onPageChanged, totalUsersCount, pageSize, ...props}) => {
    return <div>
        <Paginator currentPage={currentPage} onPageChanged = {onPageChanged}
        totalUsersCount= {totalUsersCount} pageSize = {pageSize} />
        {
            props.users.map(u => <User user = {u} following = {props.following}
            unfollow = {props.unfollow} key={u.id} follow = {props.follow}/>)
        }
    </div>
}

export default Users;