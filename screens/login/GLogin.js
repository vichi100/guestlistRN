import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TouchableOpacity
} from "react-native";
//import Expo from "expo"
import * as Expo from "expo";
import { AsyncStorage } from "react-native";
import Dialog from "react-native-dialog";

export default class GLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signedIn: false,
      name: null,
      dialogVisible: false,
      photoUrl: null,
      mobile: null,
      modiMob: null,
      email:null,
      id: null,
    };
  }


  signIn = async () => {
    this._retrieveData();
    if (this.state.mobile == null) {
      this.showDialog();
      return;
    }
    try { 
      const result = await Expo.Google.logInAsync({
        androidClientId:
          "260664005963-btpvaslb1iff4bvutc0fr0b01qb948qg.apps.googleusercontent.com",
        //iosClientId: YOUR_CLIENT_ID_HERE,  <-- if you use iOS
        scopes: ["profile", "email"]
      });

      if (result.type === "success") {
        this.setState({ 
          signedIn: true,
          name: result.user.name,
          photoUrl: result.user.photoUrl,
          id:result.user.id,
          email:result.user.email,
        });  
  
        setTimeout(() => {  
      
        }, 200);   

        this.insertCustomerDetails();
        this.props.navigation.navigate('TicketDisplayFromBooking', { "data":eventDataFromBookingScreen }); 

      } else {
        console.log("cancelled");
      } 
    } catch (e) {
      console.log("error", e);
    }
  };

  _storeData = async (mobile) => {
    try {
      await AsyncStorage.setItem("mobile", mobile);
      console.log("store mobile"+ mobile);
    } catch (error) {
      // Error saving data
    }
  };

  _storeCustomerData = async () => {
    try {
      //await AsyncStorage.setItem("mobile", this.state.mobile);
      await AsyncStorage.setItem("email", this.state.email);
      await AsyncStorage.setItem("name", this.state.name);
      await AsyncStorage.setItem("photoUrl", this.state.photoUrl);
      await AsyncStorage.setItem("customerId", this.state.id);
      console.log("store mobile"+ mobile);
    } catch (error) {
      // Error saving data
    }
  };

  //fetch data from AsyncStorage
  _retrieveData = async () => {
    try {
      //email = await AsyncStorage.getItem('email');
      var mobilex = await AsyncStorage.getItem("mobile");
      console.log("get mobile"+ mobilex);
      if (mobilex !== null) {
        // We have data!!
        console.log(mobilex);
        this.state({ mobile: mobilex });
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  insertCustomerDetails=() =>{
    var postData = {
      "userid" : this.state.id,
      "mobilenumber":this.state.mobile,
      "email" : this.state.email,
      "name" : this.state.name, 
    }

    this._storeCustomerData();

    // SEND Customer DETAILS TO SERVER -  START
    return fetch("http://192.168.43.64:6000/insertCustomerDetails",{  
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',   
      },
      body:  JSON.stringify(postData)
    })
    .then(response => response.json()) 
    .then(response => {
    console.log("data : " + response); 
      this.setState({ dataSource: response, isLoading: false });
      
    console.log("data send to server");
    }) 
    .catch(error => {
      console.error(error); 
    }); 
    // SEND Customer DETAILS TO SERVER FINSH -END

  }

  showDialog = () => {
    this.setState({ dialogVisible: true });
  };
  handleCancel = () => {
    this.setState({ dialogVisible: false, mobile: null });
  };

  handleOk = () => {
    // The user has pressed the "Delete" button, so here you can do your own logic.
    // ...Your logic
    this.setState({ dialogVisible: false });
    this._storeData(this.state.mobile);
  };

  setMobile = text => {
    console.log(text);
    //var myMob = "91" + text;
    //changeText = myMob;
    //console.log("myMob : " + myMob);
    this.setState({ mobile: myMob });
    //var lastChar = myMob[myMob.length - 1];
    //this.setState({ modiMob: myMob });
  };

  render() {
    return (
      <View style={styles.container}>
        {/* {this.state.signedIn ? (
          <LoggedInPage name={this.state.name} photoUrl={this.state.photoUrl} />
        ) : (
          <LoginPage signIn={this.signIn} />
        )} */}
        <LoginPage signIn={this.signIn} />
        <Dialog.Container visible={this.state.dialogVisible}>
          <Dialog.Title>Enter Mobile Number</Dialog.Title>
          <Dialog.Description>
            Mobile number is required by bank and payment getway.
          </Dialog.Description>

          <Dialog.Input
            style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
            onChangeText={text => this.setMobile(text)}
            keyboardType="phone-pad"
            maxLength={10}
            autoCorrect={false}
            //value={changeText}
            textAlign={"center"}
            autoFocus={true}
          />
          <Dialog.Button
            style={{ fontFamily: "sans-serif" }}
            label="Cancel"
            onPress={this.handleCancel}
          />
          <Dialog.Button
            style={{ fontFamily: "sans-serif" }}
            label="OK"
            onPress={this.handleOk}
          />
        </Dialog.Container>
      </View>
    );
  }
}

const LoginPage = props => {
  return (
    <View>
      {/* <Text style={styles.header}>Sign In With Google</Text> */}
      {/* <Button title="Sign in with Google" onPress={() => props.signIn()} /> */}
      <TouchableOpacity
        onPress={() => props.signIn()}
        style={{
          height: 50
        }}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#d81b60"
          }}
        >
          <Text
            style={{
              color: "#ffffff",
              fontFamily: "sans-serif",
              fontWeight: "bold"
            }}
          >
            SIGN IN WITH GOOGLE
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const LoggedInPage = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome:{props.name}</Text>
      <Image style={styles.image} source={{ uri: props.photoUrl }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    backgroundColor: "#2c3e50"
    // alignItems: "center",
    // justifyContent: "center"
  },
  header: {
    fontSize: 25
  },
  image: {
    marginTop: 15,
    width: 150,
    height: 150,
    borderColor: "rgba(0,0,0,0.2)",
    borderWidth: 3,
    borderRadius: 150
  }
});
