import s from './Post.module.css'

const Post = (props) => {
    return (
        <div className={s.post}>
            <img src='https://smotrim.net/uploads/posts/2019-05/1557473641_obeziany-1.jpg'></img>
            {props.message}
            <div>
                {props.likesCount}
            </div>
        </div>
    )
}

export default Post; 