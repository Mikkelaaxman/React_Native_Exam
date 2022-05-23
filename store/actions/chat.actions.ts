import { Chatroom } from "../../entities/Chatroom";
import { Message } from "../../entities/Message";

export const TOGGLE_HAPPY = "TOGGLE_HAPPY";
export const ADD_CHATROOM = "ADD_CHATROOM";
export const FETCH_CHATROOMS = "FETCH_CHATROOMS";
export const NEW_MESSAGE = "NEW_MESSAGE";

export const toggleHappy = () => {
  return { type: TOGGLE_HAPPY };
};

export const fetchChatrooms = () => {
  return async (dispatch: any, getState: any) => {
    const token = getState().user.idToken;

    const response = await fetch(
      "https://reactproject-a0334-default-rtdb.europe-west1.firebasedatabase.app/chatrooms.json",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    // console.log(await response.json());

    if (!response.ok) {
      console.log("Unable to fetch chatrooms" + response.body);
      //There was a problem..
      //dispatch({type: FETCH_CHATROOM_FAILED, payload: 'something'})
    } else {
      const data = await response.json(); // json to javascript
      let chatrooms = [];
      let messages = [];
      for (const key in data) {
        //Now pull messages from array
        for (const k in data[key].messages) {
          const msg = data[key].messages[k];
          messages.push(
            new Message(msg.user, msg.message, new Date(msg.timestamp), k) //id at the end because its optional
          );
        }
        const obj = data[key];
        // create Chatroom objects and push them into the array chatrooms.
        chatrooms.push(
          new Chatroom(
            obj.title,
            obj.status,
            new Date(obj.timestamp),
            obj.messages ? messages : [],
            key
          )
        );
      }
      console.log("Messages: ", messages);

      console.log("chatrooms: ", chatrooms);

      // console.log("data from server", data);
      //chatroom.id = data.name;

      dispatch({ type: "FETCH_CHATROOMS", payload: chatrooms });
    }
  };
};

export const addChatroom = (chatroom: Chatroom) => {
  return async (dispatch: any, getState: any) => {
    const token = getState().user.idToken;

    //delete chatroom.id // for an update, this would remove the id attribute (and value) from the chatroom
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
      //There was a problem..
      //dispatch({type: ADD_CHATROOM_FAILED, payload: 'something'})
    } else {
      const data = await response.json(); // json to javascript
      // let chatrooms = []
      // for (const key in data) {
      //     console.log(data[key].name)​
      // }

      console.log("data from server", data);
      chatroom.id = data.name;

      dispatch({ type: ADD_CHATROOM, payload: chatroom });
    }
  };
};

export const newChatMessage = (chatRoomId: string, message: Message) => {
  return async (dispatch: any, getState: any) => {
    // redux thunk
    const token = getState().user.token; // accessing token in the state.

    // const url = 'https://kvaliapp-default-rtdb.europe-west1.firebasedatabase.app/chatrooms/' + chatRoomId + '/messages.json?auth=';
    // console.log("url " + url);
    // console.log("message", message);
    // Find this link for YOUR firebase, in the "Realtime Database"-tab in the firebase console
    // You must use YOUR link and not this link, to save data in your database and not mine.
    const response = await fetch(
      "https://kvaliapp-default-rtdb.europe-west1.firebasedatabase.app/chatrooms/" +
        chatRoomId +
        "/messages.json?auth=" +
        token,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          //javascript to json
          //key value pairs of data you want to send to server
          // ...

          ...message,
        }),
      }
    );

    const data = await response.json(); // json to javascript
    console.log(data);
    if (!response.ok) {
      //There was a problem..
    } else {
      // do something?
      dispatch({
        type: NEW_MESSAGE,
        payload: { chatRoomId: chatRoomId, messageObj: message },
      });
    }
  };

  // const tempUser = new User('1', 'Peter Møller', 'Jensen', 'dummyUrlLink');
  // const messageObj = new Message(Math.random().toString(), message, new Date(), tempUser);
  // // console.log("************");
  // // console.log(messageObj);
  // // console.log("************");
  // return { type: NEW_CHATMESSAGE, payload: { chatRoomId, messageObj } };
};
