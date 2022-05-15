import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';
import { useDispatch } from 'react-redux';
import { login, rehydrateUser, restoreUser } from '../store/actions/user.actions';
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from "../typings/navigations";

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
            expiration = new Date(JSON.parse(await SecureStore.getItemAsync('expiration')));
            
            // if expiration.....
            console.log("expiration", expiration);
            console.log("now", new Date());
            if (expiration < new Date()) { // then it is expired
                console.log("refresh token");
                refreshTokenString = await SecureStore.getItemAsync('refreshToken');
                dispatch(refreshToken(refreshTokenString));
            }
            console.log("no refresh token");

            userToken = await SecureStore.getItemAsync('userToken');
            user = JSON.parse(await SecureStore.getItemAsync('user'));
            
            // console.log(userToken);
            // console.log(user);
            // console.log(expiration);
          } catch (e) {
            // Restoring token failed
            console.log("restore token failed");
            console.log(e);
          }
    
          dispatch(restoreUser(user, userToken));
        };
    
        bootstrapAsync();
      }, []);

      


    return (
      <View style={styles.container}>
          <TextInput style={defaultStyles.textInput} onChangeText={onChangeEmail} value={email} />
          <TextInput style={defaultStyles.textInput} onChangeText={onChangePassword} value={password} />

          <Button title="Login" onPress={handleLogin} />
      </View>
  );
}

const styles = StyleSheet.create({
    container: {
         flex: 1,
         justifyContent: 'center',
         alignItems: 'center'
    },
    
 });
