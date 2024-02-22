import Preloader from '../../common/Preloader';
import s from './ProfileInfo.module.css'
import userPhoto from '../../../assets/images/user.jpg';
import ProfileStatusHook from './ProfileStatusHook';
import { useState } from 'react';
import ProfileDataForm from './ProfileDataForm';
import { saveProfile } from '../../../Redux/profileReducer';


const ProfileInfo = (props) => {

    let [editMode, setEditMode] = useState(false)

    if (!props.profile) {
        return <Preloader />
    }

    // const onMainPhotoSelected = (e) => {
    //     if (e.target.files.length) {
    //         props.savePhoto(e.target.files[0], props.profile.id)
    //     }
    // }

    const onSubmit = async (formData) => {
        await saveProfile(formData)
        .then (() => {
        setEditMode(false)})
    }

    return (
        <div >
            <div className={s.describe}>
                <img className={s.photo} src={props.profile.photo || userPhoto} />
                <br></br>
                <h2>{props.profile.login}</h2>
                {props.isOwner ? <ProfileStatusHook id={props.profile.id}
                    status={props.status} updateStatus={props.updateStatus} />
                    : <div>{props.status}</div>}
                <span>subscribers: {props.subscribers}</span>
                <br></br>
                <span>subscribes: {props.subscribes}</span>
                {editMode ? <ProfileDataForm props={props} initialValues={props.profile} onSubmit={onSubmit}/> :
                <ProfileData props={props} setEditMode={() => setEditMode(true)} />}
            </div>
        </div>
    )
}

const ProfileData = ({ props, setEditMode }) => {
    return <div>
        {props.isOwner && <button onClick={setEditMode}>edit</button>}
        <div>
            <div>
                <b>FullName: </b>{props.profile.FullName}
            </div>
            <div>
                <b>Looking for a job: </b>{props.profile.lokingForAJob ? "Yes" : "No"}
            </div>
        </div>
        {/* <div>
        <b>Contacts: </b> {Object.keys(props.profile.contacts).map(key => {
            return <Contact key={key} ContactTitle={key} contactValue={props.profile.contacts[key]} />
        })}
    </div> */}
    </div>
}

const Contact = ({ title, value }) => {
    return <div><b>{title}:</b> {value}</div>
}

export default ProfileInfo; 