import Preloader from '../../common/Preloader';
import s from './ProfileInfo.module.css'
import userPhoto from '../../../assets/images/user.jpg';
import ProfileStatus from './ProfileStatus';


const ProfileInfo = (props) => {
    if (!props.profile) {
        return <Preloader />
    }
    return (
        <div >
            <div>
                <img className={s.content} src='https://us-wd.gr-cdn.com/blog/sites/5/2021/07/0917/pixabayj-scaled.jpg'></img>
            </div>
            <div className={s.describe}>
                <img className={s.photo} src={props.profile.photos.large ? props.profile.photos.large : userPhoto} />
                <br></br>
                {props.profile.fullName}
                <br></br>
                {props.profile.aboutMe}
                <br></br>
                {props.profile.contacts.vk}
                <ProfileStatus status = "hello world"/>
            </div>
        </div>
    )
}
export default ProfileInfo; 