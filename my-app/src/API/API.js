import axios from "axios"
import { Navigate } from "react-router-dom";

const instance2 = axios.create({
    baseURL: "http://localhost:3001/",
})

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        "API-KEY": "7f9ba403-ec7d-4aec-8ebb-b93d8a37a171"
    }
});

export const messagesAPI = {
    getMessages() {
        return instance2.get("messages")
    },
    sendMessage(message) {
        return instance2.post("messages", { message })
    }
}

export const postsAPI = {
    getPosts() {
        return instance2.get("posts")
    },
    addPost(text) {
        return instance2.post("posts", { text })
    },
    deletePost(id) {
        return instance2.delete(`posts/${id}`)
    }
}

export const regAPI = {
    login(login, password, rememberMe) {
        return instance2.post("/auth/login", { login, password, rememberMe })
    },
    registration(login, password, rememberMe) {
        return instance2.post("/auth/registration", { login, password, rememberMe })
    }
}

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data);
    },
    getProfile(userId) {
        return instance2.get(`profile/user`, { userId })
    },
    getStatus(userId = 1) {
        return instance2.get(`profile/status`, { userId })
    },
    updateStatus(id = 1, status) {
        return instance2.put(`profile/status`, { status: status, id: id })
    }
}

//samurai way
// export const usersAPI = {
//     getUsers(currentPage = 1, pageSize = 10) {
//         return instance.get(`users?page=${currentPage}&count=${pageSize}`)
//             .then(response => response.data);
//     },
//     getProfile(userId) {
//         return instance.get(`profile/` + userId)
//     },
//     getStatus(userId = 1) {
//         return instance2.get(`profile/status/` + userId)
//     },
//     updateStatus(status) {
//         return instance.put(`profile/status/` , {status: status})
//     }
// }

//samurai way
export const followAPI = {
    follow(ID = 1) {
        return instance.post(`follow/${ID}`)
            .then(response => response.data);
    },
    unfollow(ID = 1) {
        return instance.delete(`follow/${ID}`)
            .then(response => response.data);
    }
}


//samurai way
export const authAPI = {
    me() {
        return instance.get(`auth/me`)// неправильный адрес!!
    },
    login(email, password, rememberMe = false) {
        return instance.post('auth/login', { email, password, rememberMe })
    },
    logout() {
        return instance.delete('auth/login')
    }
}