import { Input } from "antd";
import React, { useState } from "react";

const DialogsList = (props) => {
  const [search, setSearch] = useState("");
  return (
    <div className="overflow-y-auto max-h-96">
      <Input placeholder="Search" onChange={(e) => setSearch(e.target.value)} />
      {props.items
        .filter((dialog) => {
          return dialog.props.dialog.user[0].login
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
