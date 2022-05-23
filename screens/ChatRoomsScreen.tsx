import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from "../typings/navigations";
import React, { useEffect } from 'react';
import { Button, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Chatroom, Status } from '../entities/Chatroom';
import { addChatroom, fetchChatrooms, toggleHappy } from '../store/actions/chat.actions';
import DefaultStyles from '../constants/DefaultStyles';
import { SafeAreaView } from 'react-native-safe-area-context';


type ScreenNavigationType = NativeStackNavigationProp<
    StackParamList,
    "ChatRoomsScreen"
>

export default function ChatRooms() {
    const navigation = useNavigation<ScreenNavigationType>()
    const [title, onChangeTitle] = React.useState('');

    const isHappy = useSelector((state: any) => state.chat.isHappy) // subscribe to redux store and select attribute (isHappy)
    const chatrooms: Chatroom[] = useSelector((state: any) => state.chat.chatrooms)

    // console.log("isHappy", isHappy);
    const dispatch = useDispatch()

    useEffect(() => { // only runs dispatch the first time the component renders
        dispatch(fetchChatrooms())
    }, [])
    //Maybe set title to user and date
    const handleAddChatroom = () => {
        const chatroom: Chatroom = new Chatroom(title, Status.UNREAD, new Date());
        dispatch(addChatroom(chatroom));
    }

    //Make pretty and clickable 
    const renderChatroom = ({ item }: { item: any }) => (
      <SafeAreaView>
      <Text>
         {item.title}
          
         <Button
           title="Open"
           onPress={() => navigation.navigate("ChatScreen", item.id)} //sending chatroom ID as param
         /> 
      </Text>
      </SafeAreaView>
    );

    return (
      <View style={styles.container}>
        <Text>Screen 1</Text>
       {/*  <Button
          title="Go to chatscreen"
          onPress={() =>
            navigation.navigate("ChatScreen" )
          }
        /> */}
        <Text>{isHappy.toString()}</Text>
        <Button title="Toggle happy" onPress={() => dispatch(toggleHappy())} />

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
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})