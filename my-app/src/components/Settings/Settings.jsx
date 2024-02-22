import {useEffect, useRef, useState } from 'react';
import s from './Settings.module.css'
import { withAuthRedirect } from '../HOC/WithAuthRedirect';
import { compose } from 'redux';
import { connect } from 'react-redux';

const Settings = (props) => {
    const [messages, setMessages] = useState([])
    const [value, setValue] = useState('')
    const socket = useRef
    const [connected, setConnected] = useState(false)
    const [username, setUsername] = useState(props.login)

    function connect() {
        socket.current = new WebSocket("ws://localhost:3002")
        socket.current.onopen = () => {
            setConnected(true)
            const message = {
                event: "connection",
                username,
                id: Date.now()
            }
            socket.current.send(JSON.stringify(message))
            console.log("Connected")
        }
        socket.current.onmessage = (event) => {
            const message = JSON.parse(event.data)
            setMessages(prev => [...prev, message])
        }
        socket.current.onclose = () => {
            console.log("Socket was closed")
        }
        socket.current.onerror = () => {
            console.log("Socket error")
        }
    }

    const sendMessage = async() => {
        const message = {
            username, 
            message: value, 
            id: Date.now(),
            event: "message"
        }
        socket.current.send(JSON.stringify(message))
        setValue("")
    }

    if (!connected) {
        return (
            <div>
                <button className={s.butt} onClick={connect}>Connect to chat</button>
            </div>
        )
    }

    return (
        <div className={s.wrapper}>
            <div>
                <div className={s.messages}>
                    {messages.map(mess =>
                        <div key = {mess.id}>
                            {mess.event === "connection"
                                ? <span >User {mess.username} connected</span>
                                : <span className={s.message}>{mess.username}: {mess.message}</span>}
                        </div>
                    )}
                </div>
                <div className={s.input}>
                    <input onChange={e => setValue(e.target.value)} type="text" value = {value}/>
                    <button onClick={sendMessage}>Send</button>
                </div>
            </div>
        </div>
    )
}

const  mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
});

export default compose(connect(mapStateToProps),withAuthRedirect) (Settings);
