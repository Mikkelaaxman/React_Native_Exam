import React, { useState } from 'react';
import { View, Button, StyleSheet, TextInput } from 'react-native';
import { useDispatch } from 'react-redux';
import { login, rehydrateUser, refreshToken } from '../store/actions/user.actions';
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from "../typings/navigations";
import {User} from "../entities/User"
import DefaultStyles from '../constants/DefaultStyles';
type ScreenNavigationType = NativeStackNavigationProp<
  StackParamList,
  "LoginScreen"
>

export default function LoginScreen() {

  const navigation = useNavigation<ScreenNavigationType>()

  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");
  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch(login(email, password));
  }


  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken, user, expiration, refreshTokenString;

      try {

        expiration = new Date(JSON.stringify(await SecureStore.getItemAsync("expiration"))); //cant parse, only stringify?

        if (expiration < new Date()) { // then it is expired
          console.log("refresh token");
          refreshTokenString = await SecureStore.getItemAsync("refreshToken");
          dispatch(refreshToken(refreshTokenString));
        }
        console.log("no refresh token");

        userToken = await SecureStore.getItemAsync('userToken');
        user = await SecureStore.getItemAsync('user'); //JSON.parse?

         console.log(userToken);
         console.log(user);
         console.log(expiration);
      } catch (e) {
        // Restoring token failed
        console.log("restore token failed");
        console.log(e);
      }

      dispatch(rehydrateUser(user, userToken));
    };

    bootstrapAsync();
  }, []);




  return (
    <View style={styles.container}>
      <TextInput
        autoCompleteType="username"
        placeholder="username"
        style={DefaultStyles.textInput}
        onChangeText={onChangeEmail}
        value={email}
      />
      <TextInput
        autoCompleteType="password"
        placeholder="password"
        style={DefaultStyles.textInput}
        onChangeText={onChangePassword}
        value={password}
      />

      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
