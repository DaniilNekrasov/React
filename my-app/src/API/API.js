import axios from "axios"


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        "API-KEY": "7f9ba403-ec7d-4aec-8ebb-b93d8a37a171"
    }
});

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data);
    },
    getProfile(userId) {
        return instance.get(`profile/` + userId)
    }
}

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

export const authAPI = {
    me() {
        return instance.get(`auth/me`)
    }
}