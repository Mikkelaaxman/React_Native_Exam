import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  Image,
  TextInput,
} from "react-native";
import ChatMessage from "./../components/ChatMessage";
import { RootState } from "../App";

import { useDispatch, useSelector } from "react-redux";
import { fetchChatrooms, newChatMessage } from "../store/actions/chat.actions";
import { signup } from "../store/actions/user.actions";
import { Message } from "../entities/Message";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "../typings/navigations";
import Navigation from "../components/Navigation";

type ScreenNavigationType = NativeStackNavigationProp<
  StackParamList,
  "ChatScreen"
>; //Bruges ikke?

export default function ChatScreen() {
  const navigation = useNavigation<ScreenNavigationType>();
  
  //Her er den mest besværlige måde at få route.params på! 
  const route = useRoute().params;
  type ObjectKey = keyof typeof route;
  let roomId = "";
  const id = "id" as ObjectKey;
  if (route != undefined) {
    roomId = route[id];
  }

  console.log("Route ID is " + roomId);

  const dispatch = useDispatch();

  const [value, onChangeText] = useState("Write message");

  //const chatMessages = ChatRooms.find(room => room.id === id).messages;
  const chatMessages: any = useSelector(
    (state: RootState) => state.chat.chatrooms
  ).find((room: any) => room.id == roomId).messages;

  console.log(chatMessages);
  const loggedInUser = useSelector(
    (state: RootState) => state.user.loggedInUser
  );

  //Laver ny besked og dispatcher til chat actions 
  const handleSend = () => {
    const message = new Message(loggedInUser.email, value, new Date());
    dispatch(newChatMessage(roomId, message));
  };
  
  useEffect(() => {
    dispatch(fetchChatrooms());
  }, []);


  return (
    <View style={styles.container}>
      <View style={styles.messages}>
        <Text>Begin chatting here</Text>
        <FlatList
          data={chatMessages}
          renderItem={(itemData) => (
            <ChatMessage
              chatmessage={itemData.item}
              image={require("./../assets/cbs.png")}
            ></ChatMessage>
          )}
           keyExtractor={(item) => item.id}
        ></FlatList>
      </View>

      <View style={styles.inputView}>
        <Image
          source={{ uri: "https://picsum.photos/200/300" }}
          style={{ width: 50, height: 50 }}
        />

        <TextInput
          onFocus={() => {
            onChangeText("");
          }}
          style={styles.textInput}
          onChangeText={(text) => onChangeText(text)}
          value={value}
        />

        <Button title="Send" onPress={handleSend}></Button>
      </View>
    </View>
  );
}

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
    backgroundColor: "white",
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
