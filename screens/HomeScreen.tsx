import React from 'react';
import { Button, ImageBackground, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import DefaultStyles from '../constants/DefaultStyles';
import { logout } from '../store/actions/user.actions';

export default function HomeScreen() {
    const dispatch = useDispatch();

    const out = ()=> {
        return dispatch(logout())
    }

    return (
      <SafeAreaView>
        <ImageBackground
          source={{ uri: "https://picsum.photos/800/200" }}
          style={styles.background}
        >
          <Button title=" out "onPress={out}>Logout</Button>

          <TouchableOpacity onPress={out}>
            <Text style={styles.logout}>Log Out</Text>
          </TouchableOpacity>
        </ImageBackground>
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
    backgroundColor: "#FFFFFF",
    display: "flex",
    justifyContent: "space-between",
    borderRadius: 5,
    shadowColor: "#AAAAAA29",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 100,
    shadowRadius: 6,
    elevation: 6,
  },

  background: {
    width: "100%",
    height: "100%",
  },
  logout: {
      backgroundColor: 'white',
      color: '#3A59FF',
      width: "65%",
      borderRadius: 25,
      textAlign: 'center',
      fontWeight: 'bold',
      marginLeft: '18%',
      padding: "2%",
      fontSize:  33,
      marginTop: '70%'

  },
});