import { postsAPI, usersAPI } from "../API/API";

const SET_NEWS = "SET_NEWS";

let initialState = {
  news: [],
};

const newsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NEWS:
      return {
        ...state,
        news: [...action.posts],
      };
    default:
      return state;
  }
};

export const setNews = (posts) => ({ type: SET_NEWS, posts });

export const getAllPosts = (id) => {
  return async (dispatch) => {
    const subscribes = (await postsAPI.getSubscribes(id)).data;
    debugger;
    const arr = [];

    for (const subscribe of subscribes) {
      const sec = (await postsAPI.getPosts(subscribe.subscribedToId)).data;
      const author = (await usersAPI.getProfile(subscribe.subscribedToId)).data;

      for (const post of sec) {
        arr.push({
          post: post,
          profile: { profile: author },
        });
      }
    }
    debugger;
    arr.sort((a, b) => b.post.id - a.post.id);

    dispatch(setNews(arr));
  };
};

export default newsReducer;
