import { messagesAPI } from "../API/API";

const ADD_MESSAGE = "ADD_MESSAGE";
const SET_MESSAGES = "SET_MESSAGES";
const SET_DIALOGS = "SET_DIALOGS";

let initialState = {
  dialogs: [
    { id: 1, login: "Danul" },
    { id: 2, login: "Dimon" },
    { id: 3, login: "Sapun" },
    { id: 4, login: "Kostik" },
  ],
  messages: [],
};

const messagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DIALOGS:
      return {
        ...state,
        dialogs: [...action.dialogs],
      };
    case SET_MESSAGES:
      return {
        ...state,
        messages: [...action.messages],
      };
    case ADD_MESSAGE: //useless
      return {
        ...state,
        messages: [
          ...state.messages,
          { id: 50, message: action.newMessageBody },
        ],
      };
    default:
      return state;
  }
};

export const setMessagesAC = (messages) => ({ type: SET_MESSAGES, messages });
export const setDialogsAC = (dialogs) => ({ type: SET_DIALOGS, dialogs });
// export const addMessageActionCreator = (newMessageBody) => ({ type: ADD_MESSAGE, newMessageBody})

export const setMessages = (dialogId) => async (dispatch) => {
  let messages = await messagesAPI.getMessages(dialogId);
  dispatch(setMessagesAC(messages.data.messages));
};

export const setDialogs = (userId) => async (dispatch) => {
  let dialogs = await messagesAPI.getDialogs(userId);
  dispatch(setDialogsAC(dialogs.data.dialogs));
};

export const sendMessage = (message) => async () => {
  await messagesAPI.sendMessage(message);
};

export default messagesReducer;
