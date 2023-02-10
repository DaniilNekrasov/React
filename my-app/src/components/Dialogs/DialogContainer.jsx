import { connect } from 'react-redux';
import { compose } from 'redux';
import { addMessageActionCreator, updateMessageTextActionCreator } from '../../Redux/messagesReducer';
import { withAuthRedirect } from '../HOC/WithAuthRedirect';
import Dialogs from './Dialogs';

let mapStateToProps =(state) => {
    return{
        messagesPage: state.messagesPage,
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

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Dialogs)