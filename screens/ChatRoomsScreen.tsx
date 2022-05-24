import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "../typings/navigations";
import React, { useEffect } from "react";
import {
  Alert,
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Chatroom, Status } from "../entities/Chatroom";
import {
  addChatroom,
  deleteChatroom,
  fetchChatrooms,
} from "../store/actions/chat.actions";
import DefaultStyles from "../constants/DefaultStyles";
import { SafeAreaView } from "react-native-safe-area-context";

type ScreenNavigationType = NativeStackNavigationProp<
  StackParamList,
  "ChatRoomsScreen"
>;

export default function ChatRooms() {
  const navigation = useNavigation<ScreenNavigationType>();
  const [title, onChangeTitle] = React.useState("");

   const chatrooms: Chatroom[] = useSelector(
    (state: any) => state.chat.chatrooms
  );

  // console.log("isHappy", isHappy);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchChatrooms());
  }, []);

  //Maybe set title to user and date?
  const handleAddChatroom = () => {
    const chatroom: Chatroom = new Chatroom(title, Status.UNREAD, new Date());
    dispatch(addChatroom(chatroom));
  };

  //called by the Alert below
  const handleDeleteChatroom = (id: string) => {
    dispatch(deleteChatroom(id));
  };

  const createAlert = (id: string) =>
    Alert.alert(
      "Alert",
      "Are you sure you want to delete this chatroom?",
      [
        {
          text: "Delete Chatroom",
          onPress: () => handleDeleteChatroom(id),
        },  //We could add another button here
      ],
      { cancelable: true }  //Cool way to cancel!
    );

  //Make pretty
  const renderChatroom = ({ item }: { item: any }) => (
    <SafeAreaView >
      <Button
        title={item.title}
        onPress={() => navigation.navigate("ChatScreen", {id: item.id}) } //sending chatroom ID as param
      />
      <Button
        title="Delete Chatroom"
        onPress={() => createAlert(item.id)}
        color="red"
      />
    </SafeAreaView>
  );

  return (
    <View style={styles.container}>

      <FlatList data={chatrooms} renderItem={renderChatroom} />

      <TextInput
        onChangeText={onChangeTitle}
        value={title}
        placeholder="Chatroom name"
        style={DefaultStyles.textInput}
      />
      <Button title="Create chatroom" onPress={handleAddChatroom} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

});
