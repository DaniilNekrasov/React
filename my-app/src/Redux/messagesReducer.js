const ADD_MESSAGE = "ADD-MESSAGE";

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
}

const messagesReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, { id: 5, message: action.newMessageBody }]
            }
        default:
            return state;
    }

}

export const addMessageActionCreator = (newMessageBody) => ({ type: ADD_MESSAGE, newMessageBody})

export default messagesReducer;