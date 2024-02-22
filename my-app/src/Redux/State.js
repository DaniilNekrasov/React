import messagesReducer from "./messagesReducer";
import profileReducer from "./profileReducer";

let store = {
  _State: {
    profilePage: {
      posts: [
        { id: 1, message: "Danul", likesCount: 10 },
        { id: 2, message: "Dimon", likesCount: 10 },
        { id: 3, message: "Sapun", likesCount: 10 },
        { id: 4, message: "Kostik", likesCount: 10 },
      ],
      newPostText: "Danul",
    },

    messagesPage: {
      dialogs: [
        { id: 1, name: "Danul" },
        { id: 2, name: "Dimon" },
        { id: 3, name: "Sapun" },
        { id: 4, name: "Kostik" },
      ],
      messages: [
        { id: 1, message: "hi" },
        { id: 2, message: "life" },
        { id: 3, message: "could be" },
        { id: 4, message: "dream" },
      ],
      newMessageText: "Message",
    },
  },
  _callSubscriber() {
    console.log("state changed");
  },

  getState() {
    return this._State;
  },
  subcsribe(observer) {
    this._callSubscriber = observer; //наблюдатель
  },

  dispatch(action) {
    this._State.profilePage = profileReducer(this._State.profilePage, action);
    this._State.messagesPage = messagesReducer(
      this._State.messagesPage,
      action
    );
    this._callSubscriber(this._State);
  },
};

export default store;
