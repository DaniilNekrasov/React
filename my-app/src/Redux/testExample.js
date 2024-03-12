// import profileReducer, { addPostActionCreator, deletePost } from "./profileReducer";

// let initialState = {
//     posts: [
//         { id: 1, message: 'Danul', likesCount: 10 },
//         { id: 2, message: 'Dimon', likesCount: 10 },
//         { id: 3, message: 'Sapun', likesCount: 10 },
//         { id: 4, message: 'Kostik', likesCount: 10 }],
//     profile: null,
//     status: '',
// }

// it("length of posts should be incremented", () => {
//     let action = addPostActionCreator("Danul")
//     let newState = profileReducer(initialState, action)

//     expect(newState.posts.length).toBe(5);
// })

// it("message of new post should be correct", () => {
//     let action = addPostActionCreator("Danul")
//     let newState = profileReducer(initialState, action)

//     expect(newState.posts[4].message).toBe("Danul");
// })

// it("after deleting, length should be decremented ", () => {
//     let action = deletePost(1)
//     let newState = profileReducer(initialState, action)

//    expect(newState.posts.length).toBe(3);
// })

// it("after deleting, length should`nt be decremented if id is incorrect", () => {
//     let action = deletePost(1000)
//     let newState = profileReducer(initialState, action)

//    expect(newState.posts.length).toBe(4);
// })