import Post from "../../entities/Post";
import { SET_POSTS, ADD_COMMENT, LIKE_COMMENT, DELETE_POST } from "../actions/post.actions";

interface ReduxState {
    posts: Post[]
}

const initialState: ReduxState = {
    posts: [],
}

interface ReduxAction {
    type: string,
    payload: Post | any
}

const postReducer = (state: ReduxState = initialState, action: ReduxAction) => {
    switch (action.type) {
        case ADD_COMMENT:
            console.log("add comment reducer trigger");
            
            // find post position 
            const postIndex = state.posts.findIndex((post) => post.id === action.payload.postId);
            // 
            const updatedPost = state.posts.find(post => post.id === action.payload.postId);
           // updatedPost?.comments.push(action.payload.newComment);
            const updatedPosts = [...state.posts, action.payload.postObj];
            updatedPosts[postIndex] = updatedPost;

            return {
                posts: updatedPosts,
            };
        case LIKE_COMMENT:
            console.log("like comment reducer");
        case SET_POSTS:
            return { ...state,
                posts: action.payload.posts,
            };
        case DELETE_POST:
            return { ...state, posts:
                state.posts.filter(post => post.id !== action.payload)
            }
        default:
            return state;
    }
};

export default postReducer;