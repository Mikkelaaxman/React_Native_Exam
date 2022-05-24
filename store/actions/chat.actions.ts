import { Chatroom } from "../../entities/Chatroom";
import { Message } from "../../entities/Message";
import { refreshToken, rehydrateUser } from "./user.actions";

export const ADD_CHATROOM = "ADD_CHATROOM";
export const FETCH_CHATROOMS = "FETCH_CHATROOMS";
export const NEW_MESSAGE = "NEW_MESSAGE";
export const DELETE_CHATROOM = "DELETE_CHATROOM";

export const fetchChatrooms = () => {
  return async (dispatch: any, getState: any) => {
    const token = getState().user.idToken;
    const user = getState().user.loggedInUser; // accessing token in the state.
    refreshToken(token);
    rehydrateUser(user, token);

    const response = await fetch(
      "https://reactproject-a0334-default-rtdb.europe-west1.firebasedatabase.app/chatrooms.json",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      console.log("Unable to fetch chatrooms" + response.body);
      //dispatch({type: ERROR, payload: 'Fetch chatroom failed'})
    } else {
      const data = await response.json(); // json to javascript
      let chatrooms = [];

      //for each chatroom in db
      for (const key in data) {
        //Now pull messages from array and push into new one to update IDs
        let messages = [];
        for (const k in data[key].messages) {
          const msg = data[key].messages[k];
          messages.push(
            new Message(msg.username, msg.message, msg.timestamp, k) //id at the end because its optional
          );
        }
        const obj = data[key];
        // create Chatroom objects and push them into the array chatrooms.
        chatrooms.push(
          new Chatroom(
            obj.title,
            obj.status,
            new Date(obj.timestamp),
            messages, // ? messages : [],
            key
          )
        );
      }

      //chatroom.id = data.name; kun ved POST

      dispatch({ type: "FETCH_CHATROOMS", payload: chatrooms });
    }
  };
};

export const addChatroom = (chatroom: Chatroom) => {
  return async (dispatch: any, getState: any) => {
    const token = getState().user.idToken;

    //fetching with POST
    const response = await fetch(
      "https://reactproject-a0334-default-rtdb.europe-west1.firebasedatabase.app/chatrooms.json?auth=" +
        token,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(chatroom),
      }
    );

    // console.log(await response.json());

    if (!response.ok) {
      console.log("Error in POSTing new chatroom")
      //dispatch({type: ERROR, payload: 'something'})
    } else {
      const data = await response.json(); // json to javascript

      console.log("data from server", data);
      chatroom.id = data.name;

      dispatch({ type: ADD_CHATROOM, payload: chatroom });
    }
  };
};

export const newChatMessage = (chatRoomId: string, message: Message) => {
  return async (dispatch: any, getState: any) => {
    // redux thunk

    const token = getState().user.idToken; // accessing token in the state.
    const chatrooms = getState().chat.chatrooms;
    const chat = chatrooms.find((chatroom: any) => chatroom.id == chatRoomId);

    chat.messages.push(message || []); //UNDEFINED
    const jsonMsg = JSON.stringify(chat.messages);

    const response = await fetch(
      "https://reactproject-a0334-default-rtdb.europe-west1.firebasedatabase.app/chatrooms/" +
        chatRoomId +
        "/messages.json?auth=" +
        token,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: jsonMsg,
      }
    );

    const data = await response.json(); // json to javascript
    if (!response.ok) {
      console.log("Error in posting message: " + response.json);
    } else {
      // do something?

      message.id = data.name;

      dispatch({
        type: NEW_MESSAGE,
        payload: { chatRoomId: chatRoomId, messageObj: message },
      });
    }
  };
};

export const deleteChatroom = (id: string) => {
  return async (dispatch: any, getState: any) => {
    const token = getState().user.idToken;
    //fetching URL with ID and with Delete method to remove the given chatroom
    const response = await fetch(
      "https://reactproject-a0334-default-rtdb.europe-west1.firebasedatabase.app/chatrooms/" +
        id +
        ".json?auth=" +
        token,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // console.log(await response.json());

    if (!response.ok) {
      console.log("Could not delete chatroom: " + id);
      console.log("with user id: " + token);

      console.log("response: " + response.status + response.statusText);

      //dispatch({type: DELETE_CHATROOM_FAILED, payload: 'something'})
    } else {
      console.log("Deleted room with ID: " + id);

      dispatch({ type: DELETE_CHATROOM, payload: id });
    }
  };
};
