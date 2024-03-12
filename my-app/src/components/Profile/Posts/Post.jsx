import s from "./Post.module.css";
import userPhoto from "./../../../assets/images/user.jpg";

const Post = (props) => {
  const onDeletePost = async () => {
    await props.deletePost(props.id);
    props.getPosts();
  };
  return (
    <div className={s.post}>
      <h2>{props.newsFlag && props.author}</h2>
      <img src={props.photo !== undefined ? props.photo : userPhoto} />
      {props.message}
      <br></br>
      {props.owner == props.author && !props.newsFlag && (
        <button onClick={onDeletePost}>Delete</button>
      )}
      <div className={s.date}>{props.date}</div>
    </div>
  );
};

export default Post;
