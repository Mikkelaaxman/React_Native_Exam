import React from "react";
import { View, Text, Button, StyleSheet, Image } from "react-native";
import { useSelector } from "react-redux";

const ChatMessage = (props) => {
  const currentUser = useSelector((state) => state.user.loggedInUser.email);
  //user = await SecureStore.getItemAsync('user');

  //Getting time from message timestamp
  const hours = new Date(props.chatmessage.timestamp).getHours();
  const minutes = new Date(props.chatmessage.timestamp).getMinutes();

  const userOfMessage = props.chatmessage.username;

  const isUser = currentUser === userOfMessage;

  let sender;
  if (!isUser) {
    sender = "Fra " + userOfMessage;
  }

  let image;
  if (!isUser) {
    image = <Image style={styles.logo} source={props.image} />;
  }

  return (
    <View style={styles.outerContainer}>
      <View style={[styles.container, isUser ? styles.reverseContainer : ""]}>
        {image}
        <View
          style={[styles.messageView, isUser ? styles.messageViewFromMe : ""]}
        >
          <Text style={[styles.message, isUser ? styles.messageFromMe : ""]}>
            {props.chatmessage.message}
          </Text>
        </View>
      </View>
      <View
        style={[styles.timeContainer, isUser ? styles.reverseContainer : ""]}
      >
        {
          <Text style={styles.time}>
            {sender} kl. {hours}:{minutes}
          </Text>
        }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    paddingTop: 10,
  },
  timeContainer: {
    flex: 1,
    flexDirection: "row",
    paddingTop: 3,
  },
  reverseContainer: {
    flexDirection: "row-reverse",
  },
  message: {
    color: "white",
  },
  messageFromMe: {
    color: "white",
  },
  messageView: {
    backgroundColor: "purple",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 15,
    padding: 10,
  },
  messageViewFromMe: {
    backgroundColor: "blue",
    right: 0,
    marginRight: 10,
  },
  logo: {
    width: 30,
    height: 30,
  },
  time: {
    color: "black",
    marginLeft: 60,
    fontSize: 11,
  },
});

export default ChatMessage;
