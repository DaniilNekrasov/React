import s from './Profile.module.css'
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostContainer from './Posts/MyPostContainer';

const Profile = (props) => {
        return (
            <div className={s.content}>
                <ProfileInfo profile = {props.profile} status = {props.status} updateStatus = {props.updateStatus}/>
                <MyPostContainer photo = {props.profile}/>
            </div>
        )
}
export default Profile;     