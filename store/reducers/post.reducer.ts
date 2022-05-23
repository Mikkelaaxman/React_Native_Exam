import Post from "../../entities/Post";
import { FETCH_POSTS, ADD_POST, ADD_COMMENT, LIKE_COMMENT, DELETE_POST } from "../actions/post.actions";

interface ReduxState {
    posts: Post[]
}

const initialState: ReduxState = {
    posts: [],
}

interface ReduxAction {
    type: string,
    payload: Post
}

const postReducer = (state: ReduxState = initialState, action: ReduxAction) => {
    switch (action.type) {
        case ADD_POST:
            // Laver en ny Post obj til post arrayet uden at mutere state
            return {...state, posts: [...state.posts, action.payload]}
        case ADD_COMMENT:
/*             // find post position 
            const postIndex = state.posts.findIndex((post) => post.id === action.payload.id);
            const updatedPost = state.posts.find(post => post.id === action.payload.id);
           // updatedPost?.comments.push(action.payload.newComment);
            const updatedPosts = [...state.posts, action.payload.comments];
            updatedPosts[postIndex] = updatedPost;

            return {
                posts: updatedPosts,
            }; */
        case LIKE_COMMENT:
            console.log("like comment reducer");
        case FETCH_POSTS:
            console.log("Fetched Posts: " + action.payload)
            return { ...state,
                posts: action.payload,
            };
        case DELETE_POST:
/*             return { ...state, posts:
                state.posts.filter(post => post.id !== action.payload)
            } */
        default:
            return state;
    }
};

export default postReducer;