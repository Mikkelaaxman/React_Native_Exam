import { User } from "../../entities/User";
import { LOGOUT, REHYDRATE_USER, SIGNUP, ERROR, LOGIN, REFRESH_TOKEN } from "../actions/user.actions";

interface ReduxState {
    loggedInUser: User | null,
    idToken: string | undefined
}

const initialState: ReduxState = {
    loggedInUser: null,
    idToken: undefined
}

const userReducer = (state: ReduxState = initialState, action: any) => {
    switch (action.type) {
        case LOGOUT:
            return { ...state, loggedInUser: null, idToken: undefined }
        case REHYDRATE_USER:
            return { ...state, loggedInUser: action.payload.user, idToken: action.payload.idToken }
        case REFRESH_TOKEN:
            return{ ...state, idToken: action.payload }
        case SIGNUP:
            // const user = new User(action.payload.email, '', '');
            //state.loggedInUser = user; // MUTATION!!!!
            return { ...state, loggedInUser: action.payload.user, idToken: action.payload.idToken }
        case ERROR:
            return { ...state, error: action.payload}
        case LOGIN: 
            return { ... state, loggedInUser: action.payload.user, idToken: action.payload.idToken, }
        default:
            return state;
    }
};

export default userReducer;