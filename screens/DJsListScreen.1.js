import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Navigator,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import TopBar from "./topBar";
import TabProfile from "./tabProfile";
import Card from "./Card";

import { MaterialCommunityIcons } from "@expo/vector-icons";

var mePic = require("../images/sebas.jpg");
var meName = "Sebastian Diaz";
var meUsername = "holasebasdiaz";

export default class DJsListScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      liked : false,
      //follow: 'follow'
    };
  }

  pressedLike =() => { 
    this.setState({liked: !this.state.liked, })
  }

  goToGuestListScreen = (clubid, eventDate) => { 
    // const {navigate} = this.props.navigation;
    // navigate('GuestListScreen'); 
    console.log("date ; " + eventDate);
    console.log("clubid ; " + clubid);
    this.props.navigation.navigate('DJProfile', {eventDate:eventDate, clubid: clubid});  
}


  render() {
    if (this.props.navigator) {
      console.log("Si");
    } else {
      console.log("no");
    }
    return (
      <View>
        <ScrollView
          automaticallyAdjustContentInsets={false}
          style={styles.scrollView}
        >
          <Card>
            <View style={styles.meInfoWrap}>
              <TouchableOpacity
                onPress={() =>
                  this.goToGuestListScreen("999999", "22/Mar/2019")
                }
              >
                <View style={styles.meInfo}>
                  <Image source={mePic} style={styles.mePic} />
                </View>
              </TouchableOpacity>

              <View style={{ flex: 1 }}>
                <View style={styles.edit}>
                  <Text>DJ Name</Text>
                </View>
                <View
                  style={{
                    height: 1,
                    flexDirection: "row",
                    //width: 40,
                    backgroundColor: "#D81458",
                    marginTop: 5,
                    marginLeft: 50,
                    marginRight: 50
                  }}
                />
                <View style={styles.meData}>
                  <View style={styles.data}>
                    <Text style={{ fontWeight: "bold" }}>22</Text>
                    <Text style={{ fontSize: 12, color: "#777" }}>events</Text>
                  </View>

                  <View style={styles.data}>
                    <Text style={{ fontWeight: "bold" }}>204</Text>
                    <Text style={{ fontSize: 12, color: "#777" }}>
                      followers
                    </Text>
                  </View>
                  <View style={styles.data}>
                  <TouchableOpacity onPress={()=>{this.pressedLike()}} >
                  
                    <MaterialCommunityIcons
                      color={this.state.touchableHighlightMouseDown?'#424242':(this.state.liked ? '#dd2c00' : '#424242')}
                      name="heart-outline"
                      size={20}
                    />
                    <Text style={{ fontSize: 12, color: "#777" }}>{this.state.touchableHighlightMouseDown?'follow':(this.state.liked ? 'unfollow' : 'follow')}</Text>
                  
                  </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </Card>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: "#fff",
    marginBottom: 110
  },
  container: {
    backgroundColor: "#fff"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  },
  mePic: {
    width: 70,
    height: 70,
    borderRadius: 35
  },
  meInfoWrap: {
    paddingTop: 5,

    flexDirection: "row"
  },
  meData: {
    flex: 2,
    paddingTop: 10,
    flexDirection: "row"
  },
  meInfo: {
    alignItems: "center",
    padding: 5
  },
  meName: {
    fontWeight: "bold",
    fontSize: 12
    //paddingTop:10
  },
  data: {
    flex: 1,

    alignItems: "center"
  },
  edit: {
    //borderWidth:1,
    // borderColor:'#ccc',
    // borderRadius:3,
    alignItems: "center",
    //margin:15,
    padding: 2
  },
  heart: {
    // margin: 10,
    // position: "absolute",
    // top: 0,
    // right: 0,
    // width: 25,
    // height: 25,
    color: "tomato"
  }
});
