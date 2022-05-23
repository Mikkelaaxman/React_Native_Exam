import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  Image,
  TextInput,
} from "react-native";
import ChatRooms from "../dummy_data/chatrooms.json";
import ChatMessage from "./../components/ChatMessage";
import { RootState } from "../App";

import { useDispatch, useSelector } from "react-redux";
import { newChatMessage } from "../store/actions/chat.actions";
import { signup } from "../store/actions/user.actions";
import { Message } from "../entities/Message";

const ChatScreen = (props:any) => {
  const dispatch = useDispatch();

  const { id } = props.route.params;
  // console.log(id);
  const [value, onChangeText] = useState("Write message");
  // console.log(ChatRooms);

  //const chatMessages = ChatRooms.find(room => room.chatRoomId === id).messages;
  const chatMessages: any = useSelector((state: RootState) => state.chat.chatrooms).find(
    (room: any) => room.chatRoomId === id
  ).messages;
  const loggedInUser = useSelector((state: RootState) => state.user.loggedInUser);

  const handleSend = () => {
    const message = new Message("", value, new Date(), loggedInUser);
    dispatch(newChatMessage(id, message));
    console.log("value message " + value);
  };

  return (
    <View style={styles.container}>
      <View style={styles.messages}>
        <FlatList
          data={chatMessages}
          renderItem={(itemData) => (
            <ChatMessage
              chatmessage={itemData.item}
              image={require("./../assets/favicon.png")}
            ></ChatMessage>
          )}
          keyExtractor={(item) => item.messageId}
        ></FlatList>
      </View>

      <View style={styles.inputView}>
        <Image
          source={{ uri: "https://picsum.photos/200/300" }}
          style={{ width: 50, height: 50 }}
        />

        <TextInput
          style={styles.textInput}
          onChangeText={(text) => onChangeText(text)}
          value={value}
        />

        <Button title="Send" onPress={handleSend}></Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  messages: {
    flex: 1,
  },
  textInput: {
    flex: 1,
    height: 40,
    backgroundColor: "lightgray",
    marginLeft: 10,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  inputView: {
    flexDirection: "row",
    marginTop: 20,
    marginLeft: 5,
  },
  tinyLogo: {
    marginTop: -5,
  },
});

export default ChatScreen;
