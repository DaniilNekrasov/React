import { Input } from "antd";
import React, { useState } from "react";

const DialogsList = (props) => {
  const [search, setSearch] = useState("");
  return (
    <div>
      <Input placeholder="Search" onChange={(e) => setSearch(e.target.value)} />
      {props.items
        .filter((dialog) => {
          return dialog.props.name.toLowerCase().includes(search.toLowerCase());
        })
        .map((dialog) => {
          return <div>{dialog}</div>;
        })}
    </div>
  );
};

export default DialogsList;
