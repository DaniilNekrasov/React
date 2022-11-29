import { NavLink } from 'react-router-dom';
import s from './../Dialogs.module.css'

const DialogItem = (Props) => {
    return (
        <div>
            <NavLink to={"/dialogs/" + Props.id} className={navData => navData.isActive ? s.active : s.dialog}>{Props.name}</NavLink>
        </div>
    )
}

export default DialogItem; 