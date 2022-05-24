import React from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import { useSelector } from 'react-redux';

const ChatMessage = props => {
  //props.chatmessage
  //show image if not "me".
  //show purple container if "me"
  //show time if time is not the same as previous time and same user
  //show date if this message contains a new date compared to previous.

  const currentUser = useSelector((state) => state.user.loggedInUser.email);
  //user = await SecureStore.getItemAsync('user');
  console.log("props message: " + props.chatmessage.message);
  console.log("props time: " + props.chatmessage.timestamp);
   // const hours = props.chatmessage.timestamp;
   const hours = new Date(props.chatmessage.timestamp).getHours();
    const minutes = new Date(props.chatmessage.timestamp).getMinutes();

  // console.log("------------------");
  const userOfMessage = props.chatmessage.username;
    console.log("props email? " + userOfMessage);

  const isUser = currentUser === userOfMessage;

  let sender;
  if (!isUser) {
    sender = "From " + userOfMessage;
  }

  let image;
  if (!isUser) {
    image = <Image style={styles.tinyLogo} source={props.image} />;
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
        {  <Text style={styles.time}>{sender} at {hours}</Text> }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        paddingTop: 10,
 },
 timeContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 3,
},
 reverseContainer: {
     flexDirection: 'row-reverse',
 },
 message: {
    color: '#333333'
 },
 messageFromMe: {
    color: 'lightgrey',
    
 },
 messageView: {
     backgroundColor: '#EEEEEE',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 15,
    padding: 10,
 },
 messageViewFromMe: {
     backgroundColor: '#5050A5',
     right: 0,
     marginRight: 5
 },
 tinyLogo: {
     marginTop: -5
 },
 time: {
    color: '#333333',
    marginLeft: 60,
    fontSize: 11,
},
});

export default ChatMessage;