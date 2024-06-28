import React, { useState } from "react";
import Paginator from "../common/Paginator";
import User from "./User";
import s from "./Users.module.css";
import { Input, Select } from "antd";

let Users = ({
  currentPage,
  onPageChanged,
  totalUsersCount,
  pageSize,
  ...props
}) => {
  const [search, setSearch] = useState("");
  const [searchCriteria, setSearchCriteria] = useState(1);
  let options = [
    { value: 1, label: "Login" },
    { value: 2, label: "Email" },
    { value: 3, label: "Following" },
    { value: 4, label: "Not following" },
  ];

  const searching = (e) => {
    setSearch(e.target.value);
  };

  const handleCriteriaChange = (value) => {
    setSearchCriteria(value);
  };

  const filterUsers = (item) => {
    const lowercasedSearch = search.toLowerCase();
    switch (searchCriteria) {
      case 1:
        return item.login.toLowerCase().includes(lowercasedSearch);
      case 2:
        return item.email.toLowerCase().includes(lowercasedSearch);
      case 3:
        return item.followed;
      case 4:
        return !item.followed;
      default:
        return true;
    }
  };

  return (
    <div>
      {totalUsersCount > pageSize && (
        <div className={s.paginator}>
          <Paginator
            currentPage={currentPage}
            onPageChanged={onPageChanged}
            totalUsersCount={totalUsersCount}
            pageSize={pageSize}
          />
        </div>
      )}
      <br />
      <Input
        placeholder="Search"
        className=" w-96 m-3"
        onChange={searching}
        value={search}
      />
      <Select
        aria-label="Search criteria"
        className="w-96 m-3"
        options={options}
        placeholder={"Search criteria"}
        onChange={handleCriteriaChange}
        value={searchCriteria}
      />
      {props.users.filter(filterUsers).map((u) => (
        <User
          user={u}
          following={props.following}
          unfollow={props.unfollow}
          key={u.id}
          follow={props.follow}
          subId={props.subId}
        />
      ))}
      {!props.users.filter(filterUsers).length && (
        <div className=" text-xl m-5">No users found</div>
      )}
    </div>
  );
};

export default Users;
