import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  Dimensions
} from "react-native";

import { BackHandler } from "react-native";

import GuestListScreenForBilling from "./GuestListScreenForBilling";
import PassScreenForBilling from "./PassScreenForBilling";
import TermnCondition from "./TermnCondtion";
import BillDetailsScreen from "./BillDetailsScreen";

import QRCodeDisplay from "../qrCode/QRCodeDisplay";
import { bold } from "ansi-colors";

import { SimpleLineIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

import { Ionicons } from "@expo/vector-icons";
import ClubLocationDisplay from "../gmap/ClubLocationDisplay";
//https://github.com/laki944/react-native-navigation-directions/blob/master/index.js
import { OpenMapDirections } from '../gmap/GMapDirectionDrive'

import getDirections from '../gmap/gmapsdirection';  

const window = Dimensions.get("window");

let w = window.Width;

import { StackActions, NavigationActions } from 'react-navigation';

var navigatingFrom = null;

export default class TicketDisplayFromBooking extends React.Component {

  static navigationOptions = {
    //To set the header image and title for the current Screen
    title: 'Ticket',
    headerBackTitle: null,
    headerLeft: null,
    headerStyle: {
      backgroundColor: '#263238',
      //Background Color of Navigation Bar
    },

    headerTitleStyle: {
      justifyContent: 'center', 
      color:'#ffffff',
      textAlign:"left", 
        flex:1
  },

    headerTintColor: "#ffffff",
    //Text Color of Navigation Bar
  };

  static defaultProps = {
    backgroundColor: '#37474f',
    marginTop: 1,
    //width: 150,
    //height: 150,
    shadowColor: 'rgb(50,50,50)',
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 3
  };


  constructor(props) {
    super(props);
    this.didFocus = props.navigation.addListener("didFocus", payload =>
      BackHandler.addEventListener("hardwareBackPress", this.onBack),
    );

    this.state = {
      calc_height: 0,
      bookingDetailData:"",
    };
  }

  componentDidMount() {
    this.willBlur = this.props.navigation.addListener("willBlur", payload =>
      BackHandler.removeEventListener("hardwareBackPress", this.onBack),
    );
  }

  componentWillUnmount() {
    this.didFocus.remove();
    this.willBlur.remove();
    BackHandler.removeEventListener("hardwareBackPress", this.onBack);
  }

  onBack = () => {
    if(navigatingFrom != null && navigatingFrom == 'TicketsListScreen'){
      this.props.navigation.goBack(null);
      return;
    }else{
      console.log("TicketDisplayFromBooking: back");
      const resetAction = StackActions.reset({
        index: 0, // <-- currect active route from actions array
        actions: [
          NavigationActions.navigate({ routeName: 'MainTabNavigator' }),
        ],
      });
      return this.props.navigation.dispatch(resetAction);
    }
    
  };  

 
  
  //this.props.navigation.dispatch(resetAction);

  buttonClickListener = () => {
    //alert("Clicked On Button !!!");
  };

  _onPressClubLocation = () =>{

  };

  handleGetDirections = () => {
    const data = {
       source: {
        latitude: -33.8356372,
        longitude: 18.6947617
      },
      destination: {
        latitude: -33.8600024,
        longitude: 18.697459
      },
      params: [
        {
          key: "travelmode",
          value: "driving"        // may be "walking", "bicycling" or "transit" as well
        },
        {
          key: "dir_action",
          value: "navigate"       // this instantly initializes navigation using the given travel mode 
        }
      ]
    }

    getDirections(data)
  }


  _callShowDirections = (latlong) => {
    //"latlong":"19.106205,72.825633"
    console.log("TicketDisplayFromBooking: latlong "+latlong);
    var latlongArr = latlong.split(',');
    console.log("TicketDisplayFromBooking: latlong "+parseFloat(latlongArr[0]));
    console.log("TicketDisplayFromBooking: latlong "+latlongArr[1]);
    const startPoint = {
      longitude: -8.945406,
      latitude: 38.575078
    } 

    const endPoint = { 
      longitude: parseFloat(latlongArr[1]),
      latitude: parseFloat(latlongArr[0]),
    }

		const transportPlan = 'd';

    OpenMapDirections(null, endPoint, transportPlan).then(res => {
      console.log(res)
    });
  }

  render() {
    const { navigation } = this.props;  
    var bookingData = navigation.getParam("bookingData");
    console.log("TicketDisplayFromBooking: bookingData in TicketDisplayFromBooking: "+ JSON.stringify(bookingData));
    navigatingFrom = navigation.getParam("navigatingFrom");
    return (
      <View style={styles.container}> 
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer} 
        >
          {/* <Card>
          <QRCodeDisplay/> 
       
          </Card> */}



          <QRCodeDisplay bookingData={bookingData}/>
          <TouchableOpacity onPress={() => this._callShowDirections(bookingData.latlong)}>
          <ClubLocationDisplay bookingData={bookingData}/>
          </TouchableOpacity>

          {/* <Text style={styles.title} numberOfLines={2} ellipsizeMode={"tail"}>
            Sunday, March 9
          </Text> */}

          

          <GuestListScreenForBilling bookingData={bookingData}/>
          <PassScreenForBilling bookingData={bookingData}/>
          <BillDetailsScreen bookingData={bookingData}/>
          <TermnCondition/>
          

          {/* <View
            style={{
              flex: 1,
              justifyContent: "center", 
              flexDirection: "row"
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <AntDesign
                style={styles.icons}
                name="warning"
                size={20}
                color="tomato"
              />
              <Text style={{ fontSize: 14 }}>
                Be advised to carry age proofe
              </Text>
              
            </View>
          </View> */}
          {/* <View
            style={{
              flex: 1,
              justifyContent: "center",
              flexDirection: "row"
            }}
          >
            <View style={{ flexDirection: "row", margin: 5 }}>
              <SimpleLineIcons
                style={styles.icons}
                name="info"
                size={20}
                color="tomato"
              />
              <Text style={{ fontSize: 14 }}>
                Admission rights reserved by the club
              </Text>
            </View>
          </View> */}

          {/* <TableScreen></TableScreen> */}
        </ScrollView>

        <TouchableOpacity onPress={()=>this.onBack()} style ={{
                    height: 50,
                    //width:160,
                    //borderRadius:10,
                    
                    // marginLeft :50,
                    // marginRight:50,
                    // marginTop :20
                }}>
    <View style={{
    flex: 1, 
    alignItems: 'center',
    justifyContent: 'center', 
    backgroundColor : "#263238",
}}>
    <Text style={{color: '#ffffff'}}>
        DONE
    </Text> 
</View>
</TouchableOpacity>

        {/* <View style={{ width: w, marginLeft: 10, marginRight:10, marginBottom:5 }}>
   <Button 
      onPress={this.buttonClickListener}
      title="Done"
      color="#90A4AE"
    />
</View> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop:10
    //backgroundColor: "#939393",
  },

  icons: {
    width: 30,
    height: 30,
    //borderRadius: 30,
    //borderWidth: 2,
    borderColor: "rgb(170, 207, 202)"
  },

  dateContainer: {
    marginLeft: 10,
    marginRight: 10
  },

  rowContainer: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    //height: 100,
    //padding: 10,
    marginRight: 10,
    marginLeft: 10,
    //marginTop: 5,
    //borderRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#ffffff"
    // shadowOpacity: 1.0,
    // shadowRadius: 1
  },
  title: {
    paddingLeft: 10,
    //paddingTop: 5,
    fontSize: 16,
    fontWeight: "bold",
    color: "#777",
    textAlign: "center"
  },
  author: {
    paddingLeft: 10,
    marginTop: 5,
    fontSize: 14,
    color: "#777"
  },
  thumbnail: {
    flex: 1
    // height: undefined,
    // width: undefined
  },
  rowText: {
    flex: 4,
    flexDirection: "column"
  }
});
