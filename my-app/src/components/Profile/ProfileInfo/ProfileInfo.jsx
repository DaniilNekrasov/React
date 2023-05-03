import Preloader from '../../common/Preloader';
import s from './ProfileInfo.module.css'
import userPhoto from '../../../assets/images/user.jpg';
import ProfileStatusHook from './ProfileStatusHook';


const ProfileInfo = (props) => {
    debugger
    if (!props.profile) {
        return <Preloader />
    }
    return (
        <div >
            <div>
                <img className={s.content} src='https://us-wd.gr-cdn.com/blog/sites/5/2021/07/0917/pixabayj-scaled.jpg'></img>
            </div>
            <div className={s.describe}>
                <img className={s.photo} src={props.profile.photos.large ? props.profile.photos.large : "https://smotrim.net/uploads/posts/2019-05/1557473641_obeziany-1.jpg"} />
                <br></br>
                {props.profile.fullName}
                <br></br>
                {props.profile.aboutMe}
                <br></br>
                {props.profile.contacts.vk}
                <ProfileStatusHook status = {props.status} updateStatus = {props.updateStatus}/>
            </div>
        </div>
    )
}
export default ProfileInfo; 