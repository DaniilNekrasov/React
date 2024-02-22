import { postsAPI, usersAPI } from "../API/API";

const SET_NEWS = "SET_NEWS";

let initialState = {
    news: [],
}

const newsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_NEWS:
            return {
                ...state,
                news: [...action.posts]
            }
        default:
            return state;
    }
}

export const setNews = (posts) => ({ type: SET_NEWS, posts })

export const getAllPosts = (id) => {
    return async (dispatch) => {
        let subscribes = (await postsAPI.getSubscribes(id)).data
        let arr = []
        let i = 0
        while (i < subscribes.length) {
            let sec = (await postsAPI.getPosts(subscribes[i].user_id)).data
            let author = (await usersAPI.getProfile(subscribes[i].user_id)).data.login
            let j = 0
            while (j < sec.length) {
                const newsPost = {
                    post: sec[j],
                    author: author,
                }
                arr.push(newsPost)
                j++;
            }
            i++
        }

        for (let j = 0; j < arr.length - 1; j++) {
            for (let i = 0; i < arr.length - 1; i++) {
                if (arr[i].post.post_id < arr[i + 1].post.post_id) {
                    let x = arr[i]
                    arr[i] = arr[i + 1]
                    arr[i + 1] = x
                }
            }
        }

        dispatch(setNews(arr));
    }
}

export default newsReducer;