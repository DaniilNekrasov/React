const ADD_MESSAGE = "ADD-MESSAGE";
const UPDATE_MESSAGE_TEXT = "UPDATE-MESSAGE-TEXT";

let initialState = {
    dialogs: [
        { id: 1, name: 'Danul' },
        { id: 2, name: 'Dimon' },
        { id: 3, name: 'Sapun' },
        { id: 4, name: 'Kostik' }],
    messages: [
        { id: 1, message: 'hi' },
        { id: 2, message: 'life' },
        { id: 3, message: 'could be' },
        { id: 4, message: 'dream' }],
    newMessageText: "Message",
}

const messagesReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_MESSAGE:
            return {
                ...state,
                newMessageText: "",
                messages: [...state.messages, { id: 5, message: state.newMessageText }]
            }
        case UPDATE_MESSAGE_TEXT:
            return{
                ...state,
                newMessageText: action.newMessage
            }
        default:
            return state;
    }

}

export const addMessageActionCreator = () => ({ type: ADD_MESSAGE })
export const updateMessageTextActionCreator = (text) =>
    ({ type: UPDATE_MESSAGE_TEXT, newMessage: text })

export default messagesReducer;