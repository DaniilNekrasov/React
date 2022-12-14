import s from './Profile.module.css'
import MyPosts from './Posts/MyPosts';
import ProfileInfo from './ProfileInfo/ProfileInfo';

const Profile = (props) => {
    return (
        <div className={s.content}>
            <ProfileInfo />
            <MyPosts Data = {props.profilePage} 
            newPostText = {props.profilePage.newPostText}
            addPost = {props.addPost}
            updateNewPostText = {props.updateNewPostText} />
        </div>
    )
}
export default Profile; 