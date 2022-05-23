import { Chatroom } from "../../entities/Chatroom";
import {
  ADD_CHATROOM,
  FETCH_CHATROOMS,
  TOGGLE_HAPPY,
  NEW_MESSAGE,
} from "../actions/chat.actions";

interface ReduxState {
  chatrooms: Chatroom[];
  isHappy: boolean;
  counter: number;
  name: string;
  id: string;
}

const initialState: ReduxState = {
  chatrooms: [],
  isHappy: false,
  counter: 0,
  name: "Peter",
  id: "",
};

interface ReduxAction {
  type: string;
  payload?: Chatroom | any;
}

const chatReducer = (state: ReduxState = initialState, action: ReduxAction) => {
  switch (action.type) {
    case TOGGLE_HAPPY:
      console.log("Happy");

      return { ...state, isHappy: !state.isHappy };

    case ADD_CHATROOM:
      console.log(action.payload);
      return { ...state, chatrooms: [...state.chatrooms, action.payload] };
    // state.chatrooms.push(chatroom) // mutating state. Not allowed

    case FETCH_CHATROOMS:
      // create a new state object with the action.payload assigned to the chatrooms array.
      return { ...state, chatrooms: action.payload };
    case NEW_MESSAGE:
      // Find the chatroom object based on chatroomId.
      // Copy messages array of the right chatroom object
      // Copy chatrooms to avoid state mutations when updating the messages array in the
      // specific chatroom object.
      const chatroom: any = state.chatrooms.find(
        (room) => room.id === action.payload.chatRoomId
      );
      console.log("messagebject" + action.payload.messageObj);
      //have to work around the array possibly being undefined and missing iterator. spread syntax cant have undefined. { ...(chatroom !== undefined ? chatroom : []) }
      const chatmessages = [
        ...(chatroom.messages || []),
        action.payload.messageObj,
      ]; // id or message // TODO
      // 2: Copy chatroom object and attach new chat array that you copied.
      const newChatRoom: Chatroom = { ...chatroom };
      newChatRoom.messages = chatmessages;

      //3: Insert the new chatroom object into the array of chatrooms
      // Hint: use js-array's findIndex function, to find the index in the array of the object we want.
      // js Splice method to create a new array and insert the created chatroom object.
      const index = state.chatrooms.findIndex(
        (room) => room.id === action.payload.chatRoomId
      );
      const chatroomArray = [...state.chatrooms];

      chatroomArray.splice(index, 1, newChatRoom);

      return { ...state, chatRooms: chatroomArray };

    default:
      return state;
  }
};

export default chatReducer;
