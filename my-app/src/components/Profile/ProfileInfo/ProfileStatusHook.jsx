import React, { useEffect, useState } from 'react';


const ProfileStatusHook = (props) =>{

    let [editMode, setEditMode] = useState(false)
    let [status, setStatus] = useState(props.status)

    useEffect(() => {
        debugger
        setStatus(props.status)
    }, [props.status])

    const activateEditMode = () => {
        setEditMode(true)
    }

    const deactivateEditMode = () => {
        setEditMode(false)
        props.updateStatus(props.id, status)
    }

    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value)
    }

    return (
        <div>
            {!editMode ?
                <h4>
                    <span onDoubleClick={activateEditMode}>{status || '-------'}</span>
                </h4>
                : <h4>
                    <input onChange={onStatusChange} autoFocus={true} onBlur={deactivateEditMode} value = {status}/>
                </h4>
            }
        </div>
    )
}
export default ProfileStatusHook; 