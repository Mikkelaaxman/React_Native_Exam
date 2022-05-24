import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../App';
import AllPostsScreen from '../screens/AllPostsScreen';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import SinglePostScreen from '../screens/SinglePostScreen';
import ChatRooms from './../screens/ChatRoomsScreen';
import ChatScreen from './../screens/ChatScreen';
import Screen3 from './../screens/Screen3';
import { StackParamList } from "./../typings/navigations";

const Stack = createNativeStackNavigator<StackParamList>();
const Tab = createBottomTabNavigator();

function ChatStackNavigator() {

    return (
        <Stack.Navigator>
            <Stack.Screen name="ChatRoomsScreen" component={ChatRooms} />
            <Stack.Screen name="ChatScreen" component={ChatScreen}/>
            <Stack.Screen name="Screen3" component={Screen3} />
        </Stack.Navigator>
    );
}

function PostStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="AllPostsScreen" component={AllPostsScreen} />
      <Stack.Screen name="SinglePostScreen" component={SinglePostScreen} />
    </Stack.Navigator>
  );
}


export default function Navigation() {
    const user = useSelector((state: RootState) => state.user.loggedInUser)
    
    return (
      <NavigationContainer>
        {/* Move navigation related code to a seperate component that is used here */}
        {/* Determine if the user is logged in and display:
        A stack navigator (only) with signup and login
        Our "normal" app with tabs navigation */}
        {user !== null ? (
          // Show the app with all navigation
          <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Post" component={PostStackNavigator} />
            <Tab.Screen name="Chat" component={ChatStackNavigator} />
            {/* <Tab.Screen name="Menu" component={MenuScreen} /> */}
          </Tab.Navigator>
        ) : (
          // show a stack navigator with only signup and login screens.
          <Stack.Navigator>
            <Stack.Screen name="SignupScreen" component={SignupScreen} />
            {<Stack.Screen name="LoginScreen" component={LoginScreen} />}
          </Stack.Navigator>
        )}
      </NavigationContainer>
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