import * as SecureStore from 'expo-secure-store';
import { FirebaseSignupSuccess } from "../../entities/FirebaseSignupSuccess";
import { User } from '../../entities/User';

const api_key = "AIzaSyAablsQ7RPWYJBkDqGPCTZqfGAp2YA1gGU"

export const SIGNUP = 'SIGNUP';
export const LOGOUT = 'LOGOUT';
export const LOGIN = "LOGIN";
export const ERROR = 'ERROR';
export const REHYDRATE_USER = 'REHYDRATE_USER';
export const REFRESH_TOKEN = 'REFRESH_TOKEN';

export const rehydrateUser = (user: any, idToken: any) => {
    return { type: REHYDRATE_USER, payload: { user, idToken } }
}

export const logout = () => {
    SecureStore.deleteItemAsync('idToken');
    SecureStore.deleteItemAsync('user');
    SecureStore.deleteItemAsync("expiration");
    SecureStore.deleteItemAsync("refreshToken")
    return { type: LOGOUT }
}

export const signup = (email: string, password: string) => {
    return async (dispatch: any, getState: any) => {
        //const token = getState().user.token; // if you have a reducer named user(from combineReducers) with a token variable​

        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + api_key, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ //javascript to json
                //key value pairs of data you want to send to server
                // ...
                email: email,
                password: password,
                returnSecureToken: true
            })
        });

         console.log(response.json());

        if (!response.ok) {
            //There was a problem..
            //dispatch({type: SIGNUP_FAILED, payload: 'something'})
            //dispatch({ type: ERROR, payload: response.statusText })
            console.log("response error?: " + JSON.stringify(response))

        } else {
            const data: FirebaseSignupSuccess = await response.json(); // json to javascript
            console.log("Signup data from server", data);

            const user = new User(data.email, '', '');

            await SecureStore.setItemAsync('idToken', data.idToken);
            await SecureStore.setItemAsync('user', JSON.stringify(user)); // convert user js-obj. to json

            dispatch({ type: SIGNUP, payload: { user, idToken: data.idToken } })
        }
    };
};

export const login = (email: string, password: string) => {
    return async (dispatch: any, getState: any) => {
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + api_key, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ //javascript to json
                //key value pairs of data you want to send to server
                // ...
                email: email,
                password: password,
                returnSecureToken: true
            })
        });
        
        const data = await response.json(); // json to javascript
        if (!response.ok) {
            //There was a problem..
            dispatch({ type: ERROR, payload: data.error.message })
            console.log("response error?: " + JSON.stringify(response.statusText))
        } else {
            console.log("Login data from server", data);

            const user = new User(data.email, "", "", data.id);

            await SecureStore.setItemAsync('idToken', data.idToken);
            await SecureStore.setItemAsync('user', JSON.stringify(user)); // convert user js-obj. to json

            let expiration = new Date();
            expiration.setSeconds(expiration.getSeconds() + parseInt(data.expiresIn));
            await SecureStore.setItemAsync('expiration', JSON.stringify(expiration));
            await SecureStore.setItemAsync('refreshToken', data.refreshToken);

            dispatch({ type: LOGIN, payload: { user, idToken: data.idToken } })
        }

    }
}

//
export const refreshToken = (refreshToken: any) => {
    return async (dispatch: any, getState: any) => {
        console.log("refreshing token: " + refreshToken);
        const response = await fetch('https://securetoken.googleapis.com/v1/token?key=' + api_key, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                refresh_token: refreshToken,
                grant_type: 'refresh_token'
            })
        });


        if (!response.ok) {
            //dispatch({ type: ERROR, payload: response.statusText })
            console.log("response error?: " + JSON.stringify(response))
        } else {
            const data = await response.json();
            console.log("Data after refresh: " + data);
            dispatch({ type: REFRESH_TOKEN, payload: data.idToken })
        }
    };
}