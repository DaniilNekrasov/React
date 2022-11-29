import s from './ProfileInfo.module.css'

const ProfileInfo = () => {
    return (
        <div className={s.content}>
            <div>
                <img src='https://us-wd.gr-cdn.com/blog/sites/5/2021/07/0917/pixabayj-scaled.jpg'></img>
            </div>
            <div className={s.describe}>
                ava+describe
            </div>
        </div>
    )
}
export default ProfileInfo; 