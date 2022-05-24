import { Chatroom } from "../../entities/Chatroom";
import {
  ADD_CHATROOM,
  FETCH_CHATROOMS,
  NEW_MESSAGE,
  DELETE_CHATROOM
} from "../actions/chat.actions";

interface ReduxState {
  chatrooms: any[];

}

const initialState: ReduxState = {
  chatrooms: [],
};

interface ReduxAction {
  type: string;
  payload?: Chatroom | any;
}

const chatReducer = (state: ReduxState = initialState, action: ReduxAction) => {
  switch (action.type) {

    case ADD_CHATROOM:
      return { ...state, chatrooms: [...state.chatrooms, action.payload] };

    case FETCH_CHATROOMS:
      // create a new state object with the action.payload assigned to the chatrooms array.
      return { ...state, chatrooms: action.payload };
    case NEW_MESSAGE:
      // Find the chatroom object based on chatroomId.

      const chatroom: any = state.chatrooms.find(
        (room) => room.id === action.payload.chatRoomId
      );
      //have to work around the array possibly being undefined and missing iterator. spread syntax cant have undefined. { ...(chatroom !== undefined ? chatroom : []) }
      const chatmessages = [
        ...(chatroom.messages || []),
        action.payload.messageObj,
      ]; 
      // Copy chatroom object and attach new chat array
      const newChatRoom: Chatroom = { ...chatroom };
      newChatRoom.messages = chatmessages;

      // Inserting the new chatroom object into the array of chatrooms
     
      const index = state.chatrooms.findIndex(
        (room) => room.id === action.payload.chatRoomId
      );
      const chatroomArray = [...state.chatrooms];

      chatroomArray.splice(index, 1, newChatRoom);

      return { ...state, chatrooms: chatroomArray };

      case DELETE_CHATROOM:
        return {
          ...state,
          chatrooms: state.chatrooms.filter(
            (room) => room.id !== action.payload
          ),
        };
    default:
      return state;
  }
};

export default chatReducer;
