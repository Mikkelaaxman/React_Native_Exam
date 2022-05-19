import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from "../typings/navigations";
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { rehydrateUser, signup } from '../store/actions/user.actions';
import DefaultStyles from '../constants/DefaultStyles';

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
            dispatch(rehydrateUser(user, token!)) //hvad er ! her. not any?
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
        <Button
          title="Already signed up? Log in here"
          onPress={() => navigation.navigate("LoginScreen")}
        />
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