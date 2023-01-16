import { connect } from 'react-redux';
import { addMessageActionCreator, updateMessageTextActionCreator } from '../../Redux/messagesReducer';
import Dialogs from './Dialogs';

let mapStateToProps =(state) => {
    return{
        messagesPage: state.messagesPage
    }
}

let mapDispatchToProps =(dispatch) => {
    return{
        updateNewMessageBody: (body) => {
            dispatch(updateMessageTextActionCreator(body));
        },
        sendMessage: () => {
            dispatch(addMessageActionCreator());
        }
    }
}

const DialogContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);

export default DialogContainer; 