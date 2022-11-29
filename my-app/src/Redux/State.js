let rerenderEntireTree = () => {
    console.log('state changed');
}

let State = {
    profilePage: {
        posts: [
            { id: 1, message: 'Danul', likesCount: 10 },
            { id: 2, message: 'Dimon', likesCount: 10 },
            { id: 3, message: 'Sapun', likesCount: 10 },
            { id: 4, message: 'Kostik', likesCount: 10 }],
        newPostText: 'Danul'
    },

    messagesPage: {
        dialogs: [
            { id: 1, name: 'Danul' },
            { id: 2, name: 'Dimon' },
            { id: 3, name: 'Sapun' },
            { id: 4, name: 'Kostik' }],
        messages: [
            { id: 1, message: 'hi' },
            { id: 2, message: 'life' },
            { id: 3, message: 'could be' },
            { id: 4, message: 'dream' }]
    }
}

export let addPost = () => {
    let newPost = {
        id: 5,
        message: State.profilePage.newPostText,
        likesCount: 9
    };
    State.profilePage.posts.push(newPost);
    State.profilePage.newPostText = "";
    rerenderEntireTree(State);
}

export let updateNewPostText = (newText) => {
    State.profilePage.newPostText = newText;
    rerenderEntireTree(State);
}
 
export const subcsribe = (observer) => {
    rerenderEntireTree = observer;  //наблюдатель
}
export default State;