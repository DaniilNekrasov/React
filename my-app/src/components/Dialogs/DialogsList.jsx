import { Input } from "antd";
import React, { useState } from "react";

const DialogsList = (props) => {
  const [search, setSearch] = useState("");
  return (
    <div>
      <Input placeholder="Search" onChange={(e) => setSearch(e.target.value)} />
      {props.items
        .filter((dialog) => {
          debugger;
          return dialog.props.login
            .toLowerCase()
            .includes(search.toLowerCase());
        })
        .map((dialog) => {
          return <div>{dialog}</div>;
        })}
    </div>
  );
};

export default DialogsList;
