import { NavLink } from 'react-router-dom';
import s from './Navigation.module.css'
import dialogsPic from '../../assets/images/dialogs.png'
import profilePic from '../../assets/images/profile.png'
import usersPic from '../../assets/images/users.png'

const Navigation = () => {
    return (
        <nav className={s.nav}>
            <div className={s.page}>
                <img className={s.pic} src={profilePic} />
                <NavLink to='profile' className={navData => navData.isActive ? s.active : s.item}>Profile</NavLink>
            </div>
            <div className={s.page}>
                <img className={s.pic} src={dialogsPic} />
                <NavLink to='dialogs' className={navData => navData.isActive ? s.active : s.item}>Dialogs</NavLink>
            </div>
            <div className={s.page}>
                <img className={s.pic} src={dialogsPic} />
                <NavLink to='news' className={navData => navData.isActive ? s.active : s.item}>News</NavLink>
            </div>
            <div className={s.page}>
                <img className={s.pic} src={dialogsPic} />
                <NavLink to='music' className={navData => navData.isActive ? s.active : s.item}>Music</NavLink>
            </div>
            <div className={s.page}>
                <img className={s.pic} src={dialogsPic} />
                <NavLink to='settings' className={navData => navData.isActive ? s.active : s.item}>Global chat</NavLink>
            </div>
            <div className={s.page}>
                <img className={s.pic} src={usersPic} />
                <NavLink to='users' className={navData => navData.isActive ? s.active : s.item}>Users</NavLink>
            </div>
        </nav>
    )
}
export default Navigation; 