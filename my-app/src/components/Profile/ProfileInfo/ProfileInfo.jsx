import Preloader from "../../common/Preloader";
import s from "./ProfileInfo.module.css";
import userPhoto from "../../../assets/images/user.jpg";
import ProfileStatusHook from "./ProfileStatusHook";
import { useState } from "react";
import ProfileDataForm from "./ProfileDataForm";
import { saveProfile } from "../../../Redux/profileReducer";
import { Image, Input } from "antd";

const ProfileInfo = (props) => {
  let [editMode, setEditMode] = useState(false);

  if (!props.profile) {
    return <Preloader />;
  }

  const onMainPhotoSelected = (e) => {
    if (e.target.files.length) {
      props.savePhoto(e.target.files[0], props.profile.id);
    }
  };

  const onSubmit = async (formData) => {
    await saveProfile(formData).then(() => {
      setEditMode(false);
    });
  };
  debugger;
  return (
    <div>
      <div className={s.describe}>
        <Image
          width={250}
          height={250}
          className="rounded-lg"
          src={`http://localhost:3001/user/avatar/${
            props.profile.avatarURL?.split("\\")[1]
          }`}
          fallback={userPhoto}
        />
        {props.isOwner && (
          <Input
            className="w-1/4"
            type="file"
            onChange={onMainPhotoSelected}
            accept="image/*,.png,.jpg,.web"
          ></Input>
        )}
        <h2>{props.profile.login}</h2>
        <h3>{props.profile.email}</h3>
        {props.isOwner ? (
          <ProfileStatusHook
            id={props.profile.id}
            status={props.status}
            updateStatus={props.updateStatus}
          />
        ) : (
          <div>{props.status}</div>
        )}
        <p>subscribers: {props.subscribers}</p>
        <p>subscribes: {props.subscribes}</p>
        {editMode ? (
          <ProfileDataForm
            props={props}
            initialValues={props.profile}
            onSubmit={onSubmit}
          />
        ) : (
          <ProfileData props={props} setEditMode={() => setEditMode(true)} />
        )}
      </div>
    </div>
  );
};

const ProfileData = ({ props, setEditMode }) => {
  return (
    <div>
      {props.isOwner && <button onClick={setEditMode}>edit</button>}
      <div>
        <div>
          <b>FullName: </b>
          {props.profile.FullName}
        </div>
        <div>
          <b>Looking for a job: </b>
          {props.profile.lokingForAJob ? "Yes" : "No"}
        </div>
      </div>
      {/* <div>
        <b>Contacts: </b> {Object.keys(props.profile.contacts).map(key => {
            return <Contact key={key} ContactTitle={key} contactValue={props.profile.contacts[key]} />
        })}
    </div> */}
    </div>
  );
};

const Contact = ({ title, value }) => {
  return (
    <div>
      <b>{title}:</b> {value}
    </div>
  );
};

export default ProfileInfo;
