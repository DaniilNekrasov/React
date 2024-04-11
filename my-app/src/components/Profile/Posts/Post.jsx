import s from "./Post.module.css";
import userPhoto from "./../../../assets/images/user.jpg";
import { Button, Image } from "antd";
import dayjs from "dayjs";
import { NavLink } from "react-router-dom";

const Post = (props) => {
  const onDeletePost = async () => {
    await props.deletePost(props.id);
    props.getPosts(props.profile.curId);
  };
  return (
    <div className="bg-neutral-400 p-5 max-w-screen-lg mx-auto">
      <h1 className="text-xl font-bold ml-3">
        {props.newsFlag && (
          <NavLink to={"/profile/" + props.profile.profile.id}>
            {props.profile.profile.login}
          </NavLink>
        )}
      </h1>
      <Image
        src={`http://localhost:3001/user/avatar/${
          props.profile.profile.avatarURL?.split("\\")[1]
        }`}
        fallback={userPhoto}
        className="rounded-lg"
        width={100}
        height={100}
      />
      {/* //"text-wrap max-w-96"> */}
      <article className={s.text}>
        <h2 className="text-2xl text-gray-700">{props.title}</h2>
        <p>{props.message}</p>
      </article>
      {props.owner === props.author && !props.newsFlag && (
        <Button className="bg-red-500" onClick={onDeletePost}>
          Delete
        </Button>
      )}
      <div className={s.date}>{dayjs(props.date).format(`MM.DD HH:mm`)}</div>
    </div>
  );
};

export default Post;
