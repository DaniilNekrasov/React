import s from './Profile.module.css'
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostContainer from './Posts/MyPostContainer';

const Profile = (props) => {
    return (
        <div className={s.content}>
            <ProfileInfo />
            <MyPostContainer />
        </div>
    )
}
export default Profile; 