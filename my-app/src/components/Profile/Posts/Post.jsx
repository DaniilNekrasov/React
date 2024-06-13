import s from "./Post.module.css";
import userPhoto from "./../../../assets/images/user.jpg";
import { Button, Image, Tag } from "antd";
import dayjs from "dayjs";
import { NavLink } from "react-router-dom";
import PostActions from "./PostActions";
import classNames from "classnames";
import { eventAPI } from "../../../API/API";
import Files from "./Components/Files";
import Author from "./Components/Author";

const Post = (props) => {
  const onDeletePost = async () => {
    if (props.isPost) {
      await props.deletePost(props.id);
      props.getPosts(props.profile.curId);
    } else {
      await props.deleteEvent(props.id);
      props.getEvents(props.profile.curId);
    }
  };
  const onFollow = async () => {
    let event = {
      title:
        props.title + ` (Following ${props.profile.profile.login}'s event)`,
      description: props.message,
      start: props.start,
      end: props.end,
      isPublic: false,
    };
    await eventAPI.createEvent(props.author, event);
  };
  return (
    <div
      className={classNames("p-3 max-w-screen-lg mx-auto", {
        "bg-stone-400": !props.isPost,
        "bg-gray-400": props.isPost,
      })}
    >
      <h1 className="text-xl font-bold ml-3">
        {props.newsFlag && props.authors?.length > 1 && (
          <NavLink to={"/profile/" + props.profile.profile.id}>
            {props.profile.profile.login}
          </NavLink>
        )}
      </h1>
      {!props.isPost && (
        <Image
          src={
            props.profile.profile?.avatarURL
              ? `http://localhost:3001/user/avatar/${
                  props.profile.profile.avatarURL?.split("\\")[2]
                }`
              : userPhoto
          }
          fallback={userPhoto}
          className="rounded-lg"
          width={100}
          height={100}
        />
      )}

      <div className="flex justify-between items-center">
        {props.authors?.map((author) =>
          author.id !== props.author.id ? (
            <Author key={author.id} author={author} />
          ) : (
            <></>
          )
        )}
      </div>
      <div>
        {props.keywords?.map((item) => (
          <Tag key={item.id} className=" bg-green-200 text-base p-1 m-1">
            {item.title}
          </Tag>
        ))}
      </div>
      <article className={s.text}>
        <h2 className="text-2xl p-3 text-gray-700">
          {!props.isPost && `Event: `} {props.title}
        </h2>
        <p className="p-3">{props.message}</p>
      </article>
      <Files files={props.files} />
      {props.isPost ? (
        <PostActions
          postLikes={props.postLike}
          comments={props.comments}
          userId={props.author}
          postId={props.id}
          profile={props.profile}
        />
      ) : (
        <div>
          {dayjs(props.start).format(`MM.DD HH:MM`)} -{" "}
          {dayjs(props.end).format(`MM.DD HH:MM`)}
        </div>
      )}
      {props.isPublic && !props.isPost && props.owner !== props.author && (
        <Button className=" bg-slate-400" onClick={onFollow}>
          Follow event
        </Button>
      )}
      <div className="flex justify-between">
        <span className={s.date}>
          {dayjs(props.date).format(`MM.DD HH:mm`)}
        </span>
        {props.isPublic && !props.isPost && (
          <span className="font-bold pb-0 from-stone-500 ">Public event</span>
        )}
        {props.owner === props.author && !props.newsFlag && (
          <div className="flex justify-end">
            <Button className="bg-red-500 justify-end" onClick={onDeletePost}>
              Delete
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Post;
