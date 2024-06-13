import { stopSubmit } from "redux-form";
import { postsAPI, usersAPI } from "../API/API";

const ADD_POST = "ADD-POST";
const DELETE_POST = "DELETE-POST";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_STATUS = "SET_STATUS";
const SET_POSTS = "SET_POSTS";
const SET_SUBSCRIBERS = "SET_SUBSCRIBERS";
const SET_SUBSCRIBES = "SET_SUBSCRIBES";
const SAVE_PHOTO = "SAVE_PHOTO";
const SET_INFO = "SET_INFO";

let initialState = {
  posts: [],
  profile: null,
  status: "",
  curId: null,
  work: "",
  education: "",
  awards: "",
  subscribes: 0,
  subscribers: 0,
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_POSTS:
      return {
        ...state,
        posts: [...action.posts.reverse()],
      };
    case ADD_POST:
      let newPost = {
        id: action.newPost.id,
        message: action.newPost.message,
        likesCount: 0,
      };
      return {
        ...state,
        newPostText: "",
        posts: [newPost, ...state.posts],
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((p) => p.post_id !== action.postId),
      };
    case SET_USER_PROFILE:
      return {
        ...state,
        profile: action.profile,
        avatarURL: action.avatarURL,
        curId: action.profile.id,
      };
    case SET_STATUS:
      return {
        ...state,
        status: action.status,
      };
    case SET_INFO:
      debugger;
      return {
        ...state,
        work: action.work,
        education: action.education,
        awards: action.awards,
      };
    case SAVE_PHOTO:
      return {
        ...state,
        profile: { ...state.profile, photo: action.photo },
      };
    case SET_SUBSCRIBES:
      return {
        ...state,
        subscribes: action.value,
      };
    case SET_SUBSCRIBERS:
      return {
        ...state,
        subscribers: action.value,
      };
    default:
      return state;
  }
};

export const addPostAC = (newPost) => ({ type: ADD_POST, newPost });
export const deletePostAC = (postId) => ({ type: DELETE_POST, postId });
export const setUserProfile = (profile) => ({
  type: SET_USER_PROFILE,
  profile,
});
export const setStatus = (status) => ({ type: SET_STATUS, status });
export const setInfo = (work, awards, education, userId) => ({
  type: SET_INFO,
  work,
  awards,
  education,
  userId,
});
export const setPosts = (posts) => ({ type: SET_POSTS, posts });
export const savePhotoSuccess = (photo) => ({ type: SAVE_PHOTO, photo });
export const setSubscribes = (value) => ({ type: SET_SUBSCRIBES, value });
export const setSubscribers = (value) => ({ type: SET_SUBSCRIBERS, value });

export const deletePost = (id) => async (dispatch) => {
  await postsAPI.deletePost(id);
  dispatch(deletePostAC(id));
};

export const addPost =
  (authors, text, title, files, keywords) => async (dispatch) => {
    let newPosts = await postsAPI.addPost(
      authors,
      text,
      title,
      files,
      keywords
    );
    dispatch(setPosts(newPosts));
  };

export const getUserPosts = (id) => {
  return async (dispatch) => {
    let response = await postsAPI.getPosts(id);
    dispatch(setPosts(response.data));
  };
};

export const getUserProfile = (userId) => async (dispatch) => {
  let response = await usersAPI.getProfile(userId);
  dispatch(setUserProfile(response.data));
  let subs = await postsAPI.getSubscribes(userId);
  dispatch(setSubscribes(subs.data.length));
  let subers = await postsAPI.getSubscribers(userId);
  dispatch(setSubscribers(subers.data.length));
};

export const getStatus = (userId) => async (dispatch) => {
  let response = await usersAPI.getStatus(userId);
  dispatch(setStatus(response.data));
};

export const updateStatus = (id, status) => async (dispatch) => {
  let response = await usersAPI.updateStatus(id, status);
  if (response.data.message === "success") dispatch(setStatus(status));
};

export const updateInfo =
  (work, awards, education, userId) => async (dispatch) => {
    let response = await usersAPI.updateInfo(work, awards, education, userId);
    if (response.data.message === "success")
      dispatch(setInfo(work, awards, education));
  };

export const savePhoto = (file, id) => async (dispatch) => {
  let response = await usersAPI.savePhoto(file, id);
  if (response.message === "success")
    dispatch(setUserProfile(response.data.candidate));
};

export const saveProfile = (profile) => async (dispatch, getState) => {
  const userId = getState().auth.userId;
  let response = await usersAPI.saveProfile(profile);
  if (response.data.message === "success") {
    dispatch(getUserProfile(userId));
  } else {
    dispatch(
      stopSubmit("edit-profile", {
        contacts: { facebook: response.data.messages[0] },
      })
    );
    return Promise.reject(response.data.messages[0]);
  }
};

export default profileReducer;
