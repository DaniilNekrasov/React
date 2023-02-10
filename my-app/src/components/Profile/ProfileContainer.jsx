import s from './Profile.module.css'
import Profile from './Profile';
import React from 'react';
import { getUserProfile} from '../../Redux/profileReducer';
import { connect } from 'react-redux';
import {useLocation,useNavigate, useParams} from "react-router-dom";
import { compose } from 'redux';

function withRouter(Component) {
    function ComponentWithRouterProp(props) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return (
            <Component
                {...props}
                router={{ location, navigate, params }}
            />
        );
    }

    return ComponentWithRouterProp;
}

class ProfileContainer extends React.Component {

    componentDidMount() {
        let userId = this.props.router.params.userId;
        if (!userId){ userId = 1000;}
        this.props.getUserProfile(userId);
        this.props.getUserStatus(userId);
    }
 
    render() {
        return (
            <div className={s.content}>
                <Profile {...this.props} profile={this.props.profile} />
            </div>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status 
    }
}

export default compose(
    connect(mapStateToProps, {getUserProfile}),
    withRouter,
    //withAuthRedirect,
)(ProfileContainer)