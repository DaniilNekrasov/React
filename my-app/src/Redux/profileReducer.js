import { postsAPI, usersAPI } from "../API/API";

const ADD_POST = "ADD-POST";
const DELETE_POST = "DELETE-POST";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_STATUS = "SET_STATUS";
const SET_POSTS = "SET_POSTS";

let initialState = {
    posts: [
        // { id: 1, message: 'Danul', likesCount: 0 },
        // { id: 2, message: 'Dimon', likesCount: 0 },
        // { id: 3, message: 'Sapun', likesCount: 0 },
        // { id: 4, message: 'Kostik', likesCount: 0 }
    ],
    profile: null,
    status: '',
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_POSTS:
            return {
                ...state,
                posts: [...action.posts]
            }
        case ADD_POST:
            let newPost = {
                id: action.newPost.id,
                message: action.newPost.message,
                likesCount: 0,
            }
            return {
                ...state,
                newPostText: "",
                posts: [newPost, ...state.posts],
            }
        case DELETE_POST:
            return {
                ...state, posts: state.posts.filter(p => p.id !== action.postId)
            }
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            }
        case SET_STATUS:
            return {
                ...state,
                status: action.status
            }
        default:
            return state;
    }
}

export const addPostAC = (newPost) => ({ type: ADD_POST, newPost })
export const deletePostAC = (postId) => ({ type: DELETE_POST, postId })
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile })
export const setStatus = (status) => ({ type: SET_STATUS, status })
export const setPosts = (posts) => ({ type: SET_POSTS, posts })

export const deletePost = (id) => async (dispatch) => {
    await postsAPI.deletePost(id)
    dispatch(deletePostAC(id))
}

export const addPost = (text) => async (dispatch) => {
    let newPost = await postsAPI.addPost(text)
    dispatch(addPostAC(newPost.data))
}

export const getUserPosts = () => {
    return async (dispatch) => {
        let response = await postsAPI.getPosts()  
        dispatch(setPosts(response.data));
    }
}

export const getUserProfile = (userId) => async (dispatch) => {
    debugger
    let response = await usersAPI.getProfile(userId)
    dispatch(setUserProfile(response.data));
}

export const getStatus = (userId) => async (dispatch) => {
    let response = await usersAPI.getStatus(userId)
    dispatch(setStatus(response.data));
}

export const updateStatus = (status) => async (dispatch) => {
    let response = await usersAPI.updateStatus(null, status)
    if (response.data.resultCode === 0)
        dispatch(setStatus(status));
}

export default profileReducer;