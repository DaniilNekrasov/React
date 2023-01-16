import axios from 'axios';
import React from 'react';
import styles from './Users.module.css';
import userPhoto from './../../assets/images/user.jpg';

let Users = (props) => {
    let getUsers = () => {
        if (props.users.length === 0) {

            axios.get("https://social-network.samuraijs.com/api/1.0/users").then(response => {
                props.setUsers(response.data.items);
            });

            // props.setUsers(
            //     [{
            //         id: 1, photoUrl: 'https://s0.rbk.ru/v6_top_pics/resized/590xH/media/img/0/10/756372136012100.jpg',
            //         followed: false, fullName: 'Danul', Status: 'Napasit', location: { city: 'Minsk', country: 'Belarus' }
            //     },
            //     {
            //         id: 2, photoUrl: 'https://s0.rbk.ru/v6_top_pics/resized/590xH/media/img/0/10/756372136012100.jpg',
            //         followed: true, fullName: 'Dimon', Status: 'Napasit', location: { city: 'Minsk', country: 'Belarus' }
            //     },
            //     {
            //         id: 3, photoUrl: 'https://s0.rbk.ru/v6_top_pics/resized/590xH/media/img/0/10/756372136012100.jpg',
            //         followed: true, fullName: 'Sapun', Status: 'lublu koky', location: { city: 'Minsk', country: 'Belarus' }
            //     },
            //     {
            //         id: 4, photoUrl: 'https://s0.rbk.ru/v6_top_pics/resized/590xH/media/img/0/10/756372136012100.jpg',
            //         followed: true, fullName: 'Vanul', Status: 'Napasit', location: { city: 'Minsk', country: 'Belarus' }
            //     },
            //     {
            //         id: 5, photoUrl: 'https://s0.rbk.ru/v6_top_pics/resized/590xH/media/img/0/10/756372136012100.jpg',
            //         followed: false, fullName: 'Kostya', Status: 'Muzhiki, kto v obschagu?', location: { city: 'Minsk', country: 'Belarus' }
            //     }])
        }
    }

    return <div>
        <button onClick={getUsers}>More</button>
        {
            props.users.map(u => <div key={u.id}>
                <span>
                    <div>
                        <img src={u.photos.small != null ? u.photos.small : userPhoto}
                            className={styles.userPhoto} />
                    </div>
                    <div>
                        {u.followed
                            ? <button onClick={() => { props.unfollow(u.id) }}>Unfollow</button>
                            : <button onClick={() => { props.follow(u.id) }}>Follow</button>}
                    </div>
                </span>
                <span>
                    <span>
                        <div>{u.name}</div>
                        <div>{u.status}</div>
                    </span>
                    <span>
                        <div>{"u.location.country"}</div>
                        <div>{"u.location.city"}</div>
                    </span>
                </span>
            </div>)
        }
    </div>
}

export default Users;