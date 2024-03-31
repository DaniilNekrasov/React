import { connect } from "react-redux";
import { compose } from "redux";
import {
  sendMessage,
  setMessages,
  setDialogs,
} from "../../Redux/messagesReducer";
import { withAuthRedirect } from "../HOC/WithAuthRedirect";
import Dialogs from "./Dialogs";

let mapStateToProps = (state) => {
  return {
    messagesPage: state.messagesPage,
    userId: state.auth.userId,
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    sendMessage: (newMessageBody) => {
      dispatch(sendMessage(newMessageBody));
    },
    getMessages: (dialogId) => {
      dispatch(setMessages(dialogId));
    },
    getDialogs: (userId) => {
      dispatch(setDialogs(userId));
    },
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
  //   withAuthRedirect
)(Dialogs);
