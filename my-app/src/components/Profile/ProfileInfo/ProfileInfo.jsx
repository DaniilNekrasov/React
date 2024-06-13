import Preloader from "../../common/Preloader";
import userPhoto from "../../../assets/images/user.jpg";
import ProfileStatusHook from "./ProfileStatusHook";
import { useNavigate } from "react-router-dom";
import ProfileDataForm from "./ProfileDataForm";
import { Image, Input, Button } from "antd";
import { messagesAPI } from "../../../API/API";
import dayjs from "dayjs";

const ProfileInfo = (props) => {
  const handleProfileUpdate = (info) => {
    debugger;
    props.updateInfo(info.work, info.awards, info.education, props.profile.id);
  };
  let navigate = useNavigate();

  if (!props.profile) {
    return <Preloader />;
  }

  const onMainPhotoSelected = (e) => {
    if (e.target.files.length) {
      props.savePhoto(e.target.files[0], props.profile.id);
    }
  };

  const startDialog = async () => {
    const dialog = await messagesAPI.createDialog(props.profile.id, props.myId);
    navigate(`/dialogs?chatId=${dialog.data.id}`);
  };
  return (
    <div className="p-6 rounded-lg shadow-lg">
      <div className="flex flex-col items-center space-y-4">
        <Image
          width={250}
          height={250}
          className="rounded-lg"
          src={`http://localhost:3001/user/avatar/${
            props.profile.avatarURL?.split("\\")[2]
          }`}
          fallback={userPhoto}
        />
        {props.isOwner ? (
          <Input
            className="w-1/4 justify-center content-center"
            type="file"
            onChange={onMainPhotoSelected}
            accept="image/*,.png,.jpg,.web"
            name="select file"
          ></Input>
        ) : (
          <Button className=" bg-slate-400" onClick={startDialog}>
            Send message
          </Button>
        )}
        <div className="text-xl font-semibold">{props.profile.login}</div>
        {props.isOwner ? (
          <ProfileStatusHook
            id={props.profile.id}
            status={props.status}
            updateStatus={props.updateStatus}
          />
        ) : (
          <div className="px-4 py-2 text-lg">Status: {props.status}</div>
        )}
        <div className="text-gray-400">{props.profile.email}</div>
        <div className="text-gray-400">
          Registration date:{" "}
          {dayjs(props.profile.lastOnline).format(`YYYY.MM.DD`)}
        </div>
        <p className="text-gray-400">Subscribers: {props.subscribers}</p>
        <p className="text-gray-400">Subscribes: {props.subscribes}</p>
        <ProfileDataForm
          profile={props.profile}
          isOwner={props.isOwner}
          onSubmit={handleProfileUpdate}
        />
      </div>
    </div>
  );
};

export default ProfileInfo;
