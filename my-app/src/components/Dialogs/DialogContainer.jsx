import { connect } from 'react-redux';
import { compose } from 'redux';
import { sendMessage, setMessages} from '../../Redux/messagesReducer';
import { withAuthRedirect } from '../HOC/WithAuthRedirect';
import Dialogs from './Dialogs';

let mapStateToProps =(state) => {
    return{
        messagesPage: state.messagesPage,
    }
}

let mapDispatchToProps =(dispatch) => {
    return{
        sendMessage: (newMessageBody) => {
            dispatch(sendMessage(newMessageBody));
        },
        getDialog: () => {
            dispatch(setMessages())
        }
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
  withAuthRedirect
)(Dialogs)