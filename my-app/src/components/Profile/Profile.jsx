import s from "./Profile.module.css";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostContainer from "./Posts/MyPostContainer";

const Profile = (props) => {
  return (
    <div className={s.content}>
      <ProfileInfo
        profile={props.profile}
        saveProfile={props.saveProfile}
        isOwner={props.isOwner}
        savePhoto={props.savePhoto}
        status={props.status}
        updateStatus={props.updateStatus}
        subscribes={props.subscribes}
        subscribers={props.subscribers}
      />
      <MyPostContainer />
    </div>
  );
};
export default Profile;
