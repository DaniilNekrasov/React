import s from "./Post.module.css";
import userPhoto from "./../../../assets/images/user.jpg";
import { Button, Image } from "antd";

const Post = (props) => {
  const onDeletePost = async () => {
    debugger;
    await props.deletePost(props.id);
    props.getPosts();
  };
  return (
    <div className="bg-neutral-400 p-5">
      <h2>{props.newsFlag && props.author}</h2>
      <Image
        src={props.photo !== undefined ? props.photo : userPhoto}
        className="rounded-lg"
        width={100}
      />
      <h3>{props.title}</h3>
      <p>{props.message}</p>
      {props.owner === props.author && !props.newsFlag && (
        <Button className="bg-red-500" onClick={onDeletePost}>
          Delete
        </Button>
      )}
      <div className={s.date}>{props.date}</div>
    </div>
  );
};

export default Post;
