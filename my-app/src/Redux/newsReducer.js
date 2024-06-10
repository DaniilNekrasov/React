import { eventAPI, postsAPI, usersAPI } from "../API/API";

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
    const arr = [];

    for (const subscribe of subscribes) {
      const sec = (await postsAPI.getPosts(subscribe.subscribedToId)).data;
      const events = (await eventAPI.getEvents(subscribe.subscribedToId)).data
        .events;
      const author = (await usersAPI.getProfile(subscribe.subscribedToId)).data;

      for (const post of sec) {
        arr.push({
          date: post.date,
          post,
          profile: { profile: author },
        });
      }
      for (const event of events) {
        arr.push({
          date: event.createdAt,
          event,
          profile: { profile: author },
        });
      }
    }
    arr.sort((a, b) => new Date(b.date) - new Date(a.date));

    dispatch(setNews(arr));
  };
};

export default newsReducer;
