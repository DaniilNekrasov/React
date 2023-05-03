import s from './Post.module.css'

const Post = (props) => {

    const onDeletePost = async () => {
        await props.deletePost(props.id)
        props.getPosts()
    }
    return (
        <div className={s.post}>
            {/* <img src = {(props.photo.photos.large !== null) ? props.photo.photos.large : */}
            <img src ={'https://smotrim.net/uploads/posts/2019-05/1557473641_obeziany-1.jpg'} alt = {'noPhoto'}></img>
            {props.message}
            <div className={s.likesCount}>
                {props.likesCount}
            </div>
            <button onClick={onDeletePost} >Delete</button>
        </div>
    )
}

export default Post; 