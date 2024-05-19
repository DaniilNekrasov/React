import React, { useEffect, useState } from "react";

const ProfileStatusHook = (props) => {
  let [editMode, setEditMode] = useState(false);
  let [status, setStatus] = useState(props.status);

  useEffect(() => {
    setStatus(props.status);
  }, [props.status]);

  const activateEditMode = () => {
    setEditMode(true);
  };

  const deactivateEditMode = () => {
    setEditMode(false);
    props.updateStatus(props.id, status);
  };

  const onStatusChange = (e) => {
    setStatus(e.currentTarget.value);
  };

  return (
    <div>
      {!editMode ? (
        <div className="px-4 py-2 text-lg " onDoubleClick={activateEditMode}>
          Status: {status || ""}
        </div>
      ) : (
        <h4>
          <input
            className="text-black"
            onChange={onStatusChange}
            autoFocus={true}
            onBlur={deactivateEditMode}
            value={status}
          />
        </h4>
      )}
    </div>
  );
};
export default ProfileStatusHook;
