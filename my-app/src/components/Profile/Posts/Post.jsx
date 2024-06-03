import s from "./Post.module.css";
import userPhoto from "./../../../assets/images/user.jpg";
import { Button, Image } from "antd";
import dayjs from "dayjs";
import { NavLink } from "react-router-dom";
import PostActions from "./PostActions";
import classNames from "classnames";

const Post = (props) => {
  const onDeletePost = async () => {
    await props.deletePost(props.id);
    props.getPosts(props.profile.curId);
  };
  debugger;
  return (
    <div
      className={classNames("p-3 max-w-screen-lg mx-auto", {
        " bg-stone-400": !props.isPost,
        "bg-gray-400": props.isPost,
      })}
    >
      <h1 className="text-xl font-bold ml-3">
        {props.newsFlag && (
          <NavLink to={"/profile/" + props.profile.profile.id}>
            {props.profile.profile.login}
          </NavLink>
        )}
      </h1>
      <Image
        src={`http://localhost:3001/user/avatar/${
          props.profile.profile.avatarURL?.split("\\")[2]
        }`}
        fallback={userPhoto}
        className="rounded-lg"
        width={100}
        height={100}
      />
      <span className={s.date}>{dayjs(props.date).format(`MM.DD HH:mm`)}</span>
      {/* //"text-wrap max-w-96"> */}
      <article className={s.text}>
        <h2 className="text-2xl p-3 text-gray-700">
          {!props.isPost && `Event: `} {props.title}
        </h2>
        <p className="p-3">{props.message}</p>
      </article>
      <div className="p-1 space-y-2">
        {props.files?.map((file) => (
          <div key={file.id} className="bg-gray-500 p-1">
            {file.fileType.startsWith("image/") ? (
              <Image
                src={`http://localhost:3001/${file.filePath}`}
                alt={file.filePath}
                width={300}
                height={300}
              />
            ) : (
              <a
                href={`http://localhost:3001/download/${
                  file.filePath.split("\\")[2]
                }`}
                download
              >
                {file.origName}
              </a>
            )}
          </div>
        ))}
      </div>
      {props.owner === props.author && !props.newsFlag && props.isPost && (
        <Button className="bg-red-500" onClick={onDeletePost}>
          Delete
        </Button>
      )}
      {props.isPost && (
        <PostActions initialLikes={0} initialDislikes={0} comments={{}} />
      )}
      {props.isPublic && !props.isPost && props.owner !== props.author && (
        <Button className=" bg-slate-400">Follow event</Button>
      )}
    </div>
  );
};

export default Post;
