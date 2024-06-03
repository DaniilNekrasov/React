import { Input } from "antd";
import React, { useState } from "react";

const DialogsList = (props) => {
  const [search, setSearch] = useState("");
  return (
    <div>
      <Input placeholder="Search" onChange={(e) => setSearch(e.target.value)} />
      <div className="overflow-y-auto max-h-[480px]">
        {props.items
          .filter((dialog) => {
            return dialog.props.dialog.user[0].login
              .toLowerCase()
              .includes(search.toLowerCase());
          })
          .map((dialog) => {
            return <div key={dialog.id}>{dialog}</div>;
          })}
      </div>
    </div>
  );
};

export default DialogsList;
