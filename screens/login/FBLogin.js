import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

import * as firebase from "firebase";

// Initialize Firebase
const firebaseConfig = {
  // ADD YOUR FIREBASE CREDENTIALS
  apiKey: "AIzaSyAAvPhHhFlKx1eu_PWRFmNm1pRl7LqTNh8",
  authDomain: "https://guestlistandroid.firebaseio.com",
  databaseURL: "",
  projectId: "guestlistandroid",
  storageBucket: "guestlistandroid.appspot.com"
};

firebase.initializeApp(firebaseConfig);

// import { Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base'

export default class FBLogin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user != null) {
        console.log(user);
      }
    });
  }

  signUpUser = (email, password) => {
    try {
      if (this.state.password.length < 6) {
        alert("Please enter atleast 6 characters");
        return;
      }

      firebase.auth().createUserWithEmailAndPassword(email, password);
    } catch (error) {
      console.log(error.toString());
    }
  };

  loginUser = (email, password) => {
    try {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(function(user) {
          console.log(user);
        });
    } catch (error) {
      console.log(error.toString());
    }
  };

  async loginWithFacebook() {
    //ENTER YOUR APP ID
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
      "343969116414961",
      { permissions: ["public_profile"] }
    );

    if (type == "success") {
      const credential = firebase.auth.FacebookAuthProvider.credential(token);

      firebase
        .auth()
        .signInWithCredential(credential)
        .catch(error => {
          console.log(error);
        });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Button
          onPress={() => this.loginWithFacebook()}
          title="Login With Facebook"
          color="#2196f3"
          accessibilityLabel="Login With Facebook"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    padding: 10
  }
});
