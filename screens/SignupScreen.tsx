import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from "../typings/navigations";
import React, { useEffect, useState } from 'react';
import { Button, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { rehydrateUser, signup } from '../store/actions/user.actions';
import DefaultStyles from '../constants/DefaultStyles';
import Colors from '../constants/Colors';

type ScreenNavigationType = NativeStackNavigationProp<
    StackParamList,
    "SignupScreen"
>

export default function SignupScreen() {
   
    const navigation = useNavigation<ScreenNavigationType>()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    async function readPersistedUserInfo() {
        const token = await SecureStore.getItemAsync('idToken');
        const userJson = await SecureStore.getItemAsync('user');
        let user = null;
        if (userJson) {
            user = JSON.parse(userJson);
        }
        if (user) {
            // then we have a priv. login
            // restore the signup by updating the redux store based on user and token.
            dispatch(rehydrateUser(user, token!)) //hvad er ! her. not null?
        }
    }

    useEffect(() => {
        readPersistedUserInfo();
    }, [])


    return (
      <View style={styles.container}>
        <Text>Signup Screen</Text>
        <TextInput
          value={email}
          placeholder="email"
          autoCompleteType="email"
          onChangeText={setEmail}
          style={DefaultStyles.textInput}
          
        />
        <TextInput
          value={password}
          placeholder="password"
          autoCompleteType="password"
          onChangeText={setPassword}
          style={DefaultStyles.textInput}
        />
        <Button
          title="Signup"
          onPress={() => dispatch(signup(email, password))}
        />
        
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate("LoginScreen")}
        >
          <Text style={styles.text}>{"Already signed up? Click here."}</Text>
        </Pressable>
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
  button: {
    alignItems: "center",
    marginTop: 10,
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "white",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "black",
  },
});