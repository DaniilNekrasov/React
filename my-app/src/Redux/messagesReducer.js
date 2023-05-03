import { Navigate, useNavigate } from "react-router-dom";
import { messagesAPI } from "../API/API";

const ADD_MESSAGE = "ADD_MESSAGE";
const SET_MESSAGES = "SET_MESSAGES"

let initialState = {
    dialogs: [
        { id: 1, name: 'Danul' },
        { id: 2, name: 'Dimon' },
        { id: 3, name: 'Sapun' },
        { id: 4, name: 'Kostik' }],
    messages: [],
}

const messagesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_MESSAGES:
            return {
                ...state,
                messages: [...action.messages]
            }
        // case ADD_MESSAGE:
        //     return {
        //         ...state,
        //         messages: [...state.messages, { id: 50, message: action.newMessageBody }]
        //     }
        default:
            return state;
    }

}

export const setMessagesAC = (messages) => ({ type: SET_MESSAGES, messages })
// export const addMessageActionCreator = (newMessageBody) => ({ type: ADD_MESSAGE, newMessageBody})

export const setMessages = () => async (dispatch) => {
    let dialog = await messagesAPI.getMessages()
    dispatch(setMessagesAC(dialog.data))
}

export const sendMessage = (message) => async (dispatch) => {
    await messagesAPI.sendMessage(message)
}

export default messagesReducer;