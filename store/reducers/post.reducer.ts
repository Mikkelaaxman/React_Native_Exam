import { SET_POSTS, ADD_COMMENT, LIKE_COMMENT } from "../actions/post.actions";

interface ReduxState {
    posts: Posts[]
    isHappy: boolean
    counter: number
    name: string
}

const initialState: ReduxState = {
    posts: [],
    isHappy: false,
    counter: 0,
    name: "Peter"
}

interface ReduxAction {
    type: string,
    payload?: boolean | number | string | Posts
}

export default (state: ReduxState = initialState, action: ReduxAction) => {
    switch (action.type) {
        case ADD_COMMENT:
            console.log("hi from reducer");
            const postIndex = state.posts.findIndex((post) => post.id === action.postId);
            const updatedPost = state.posts.find((post == post.id) == action.postId);
            updatedPost.comments.push(action.newComment);
            const updatedPosts = [...state.posts];
            updatedPost[postIndex] = updatedPost;

            return {
                posts: updatedPosts,
            };
        case LIKE_COMMENT:
            console.log("like comment reducer");
        case SET_POSTS:
            return {
                posts: action.posts,
            };
        default:
            return state;
    }
};