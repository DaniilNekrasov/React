import { followAPI, usersAPI } from "../API/API";
import { updateObjectInArray } from "../components/common/objectHelper";

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
const TOGGLE_IS_FOLLOWING = "TOGGLE_IS_FOLLOWING";


let initialState = {
    users: [],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    following: [],
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userID, "id", {followed: true})
            }
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userID, "id", {followed: false})
            }
        case SET_USERS:
            return {
                ...state,
                users: [...action.users]
            }
        case SET_CURRENT_PAGE:
            return {
                ...state, currentPage: action.currentPage
            }
        case SET_TOTAL_USERS_COUNT:
            return {
                ...state, totalUsersCount: action.count
            }
        case TOGGLE_IS_FETCHING:
            return {
                ...state, isFetching: action.isFetching
            }
        case TOGGLE_IS_FOLLOWING:
            return {
                ...state,
                following: action.isFollowing
                    ? [...state.following, action.userId]
                    : state.following.filter(id => id != action.userId)
            }
        default:
            return state;
    }
}

export const followSucces = (userID) => ({ type: FOLLOW, userID })
export const unfollowSucces = (userID) => ({ type: UNFOLLOW, userID })
export const setUsers = (users) => ({ type: SET_USERS, users })
export const setCurrentPage = (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage })
export const setTotalUsersCount = (totalUsersCount) => ({ type: SET_TOTAL_USERS_COUNT, count: totalUsersCount })
export const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching })
export const toggleFollowing = (isFollowing, userId) => ({ type: TOGGLE_IS_FOLLOWING, isFollowing, userId })

export const getUsers = (currentPage, pageSize) => {
    return async (dispatch) => {
        dispatch(toggleIsFetching(true));
        dispatch(setCurrentPage(currentPage))
        let response = await usersAPI.getUsers(currentPage, pageSize)
        dispatch(toggleIsFetching(false));
        dispatch(setUsers(response.items));
        dispatch(setTotalUsersCount(response.totalCount));
    }
}

const followUnfollow = async (dispatch, userId, APIMethod, actionCreator) => {
    dispatch(toggleFollowing(true, userId));
    let response = await APIMethod(userId)
    if (response.resultCode == 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(toggleFollowing(false, userId));
}

export const follow = (userId) => {
    return async (dispatch) => {
        let APIMethod = followAPI.follow.bind(userId)
        let actionCreator = followSucces;
        followUnfollow(dispatch, userId, APIMethod, actionCreator)
    }
}

export const unfollow = (userId) => {
    return async (dispatch) => {
        let APIMethod = followAPI.unfollow.bind(userId)
        let actionCreator = unfollowSucces;
        followUnfollow(dispatch, userId, APIMethod, actionCreator)
    }
}


export default usersReducer;