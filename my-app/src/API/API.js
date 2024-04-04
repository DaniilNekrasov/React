import axios from "axios";

const instance2 = axios.create({
  baseURL: "http://localhost:3001/",
});

const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  withCredentials: true,
  headers: {
    "API-KEY": "7f9ba403-ec7d-4aec-8ebb-b93d8a37a171",
  },
});

export const messagesAPI = {
  createDialog(id1, id2) {
    return instance2.post(`messages/createDialog`, { id1, id2 });
  },
  getDialogs(userId) {
    return instance2.get(`messages/dialogs?userId=${userId}`);
  },
  getMessages(dialogId) {
    return instance2.get(`messages/messages?dialogId=${dialogId}`);
  },
  sendMessage(message) {
    return instance2.post("messages/send", { message });
  },
};

export const postsAPI = {
  getPosts(id) {
    return instance2.get(`profile/posts?userId=${id}`);
  },
  addPost(id, text, title) {
    var date = new Date(Date.now()).toISOString();
    return instance2.post(`profile/posts?userId=${id}`, {
      content: text,
      date: date.toLocaleString(),
      title: title,
    });
  },
  deletePost(id) {
    debugger;
    return instance2.delete(`profile/posts?postId=${id}`);
  },
  getSubscribes(id) {
    return instance2.get(`profile/subscribes?userId=${id}`);
  },
  getSubscribers(id) {
    return instance2.get(`profile/subscribers?userId=${id}`);
  },
};

export const regAPI = {
  login(login, password, rememberMe) {
    return instance2.post("/auth/login", { login, password, rememberMe });
  },
  registration(login, password, email) {
    return instance2.post("/auth/registration", { login, password, email });
  },
};

export const usersAPI = {
  getUsers(currentPage = 1, pageSize = 10) {
    return instance2
      .get(`auth/users?page=${currentPage}&count=${pageSize}`)
      .then((response) => response.data);
  },
  getProfile(userId = 1) {
    return instance2.get(`profile/user?userId=${userId}`);
  },
  getStatus(userId = 1) {
    return instance2.get(`profile/status?userId=${userId}`);
  },
  updateStatus(id = 1, status) {
    return instance2.put(`profile/status`, { status: status, id: id });
  },
  savePhoto(file, id) {
    var formData = new FormData();
    formData.append("image", file);
    return instance2.put("profile/photo", { id: id }, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  saveProfile(profile) {
    return instance2.put("profile/", { profile: profile });
  },
};

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

export const followAPI = {
  follow(user, subscriber) {
    return instance2
      .post(`subscription/follow`, { user: user, subscriber: subscriber })
      .then((response) => response.data);
  },
  unfollow(user, subscriber) {
    return instance2
      .post(`subscription/unfollow`, { user: user, subscriber: subscriber })
      .then((response) => response.data);
  },
};

//samurai way
export const authAPI = {
  me() {
    return instance.get(`auth/me`); // неправильный адрес!!
  },
  login(email, password, rememberMe = false) {
    return instance.post("auth/login", { email, password, rememberMe });
  },
  logout() {
    return instance.delete("auth/login");
  },
};
