import React, { Component } from "react";
import {
  ActivityIndicator,
  Text,
  View,
  StyleSheet,
  FlatList
} from "react-native";
import Calendar from "./calendar/Calendar";
import moment from 'moment';
import Card from "./Card";
import CardTitle from "./CardTitle";
import CardContent from "./CardContent";
import CardAction from "./CardAction";
import CardButton from "./CardButton";
import CardImage from "./CardImage";
//import { CardButton } from 'react-native-material-cards'

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import GuestListScreen from "./GuestListScreen";
import BookingScreen from "./BookingScreen";
import axios from "axios";
import { SERVER_URL } from '../constants';

var mydatasource = []
var isDataChanged = false

const mydata = (data, date) => data.filter( (item) => {
  // console.log("Date : "+date.format('DD/MMM/YYYY'))
  // console.log("Data : "+JSON.stringify(data))
  isDataChanged = true
  return item.date === date.format('DD/MMM/YYYY')
})



export default class EventsOfOneClub extends Component {  

  

  
  constructor(props) {  
    super(props);
    this.state = {
      isLoading: true, 
      dataSource: []
    };
  }
 
  componentDidMount() { 
    return axios.get(SERVER_URL+"eventsDetails?clubid=29Jan2019")// pass club id rather than date
      //.then(response => response.json())
      .then(response => {
        console.log("data : " + response).data;
       
        this.setState({ dataSource: response.data, isLoading: false });
      })
      .catch(error => {
        console.error(error); 
      }); 
  }

  

  onSelectDate = (date) => {
    console.log("date ; " + date, 'day');
    console.log(date.format('DD/MMM/YYYY')); 
    this.setState({ dataSource: mydata(mydatasource, date) }); 
  };

  
  goToGuestListScreen = (clubid, eventDate) => { 
    // const {navigate} = this.props.navigation;
    // navigate('GuestListScreen'); 
    console.log("date ; " + eventDate);
    console.log("clubid ; " + clubid);
    this.props.navigation.navigate('BookingScreen', {eventDate:eventDate, clubid: clubid});  
}

goToTableScreen = (clubid, eventDate) => { 
  // const {navigate} = this.props.navigation;
  // navigate('GuestListScreen'); 
  console.log("date ; " + eventDate);
  console.log("clubid ; " + clubid);
  this.props.navigation.navigate('TableScreen', {eventDate:eventDate, clubid: clubid});  
}

_showMoreApp = () => {
  
  //this.props.navigation.navigate('Other');
};

  render() {
    
    if (this.state.isLoading) {
      return ( 
        <View style={{ flex: 1, justifyContent: "center" }}>  
          <ActivityIndicator />
        </View>
      );
    } 
 
    return (     
      <View style={styles.container}>  
        {/* <Calendar onSelectDate={this.onSelectDate} />    */}
        <FlatList
          data={this.state.dataSource}
          renderItem={({ item }) => 
          

<Card>
            <CardImage 
              source={{
                uri: "http://199.180.133.121:3030"+item.imageurl
              }}
              eventDate={item.eventdate}
              //title="Above all i am here"
            />
            {/* <CardTitle title={item.clubname.toUpperCase()} subtitle={item.music} /> */}



            <View style={styles.rowContainer}>
              {/* <Image source={{uri: this.props.thumbnail}}     
            style={styles.thumbnail}
             /> */}
              <View style={{ flex: 1}}>
              <Text
                  style={{  color: "#e040fb", fontSize: 15 }}
                  numberOfLines={1}
                >
                  {item.eventname}
                </Text>
                <Text
                  style={{
                    
                    color: "#00bfa5",
                    fontSize: 16,
                    fontWeight: "bold"
                  }}
                >
                  {item.clubname.toUpperCase()}
                </Text>
                
              </View>
              
              <View
                style={{
                  height: 35,
                  width: 1,
                  backgroundColor: "#03a9f4",
                  margin: 5
                }}
              />
              <View style={styles.rowText}>
                <Text
                  style={{textAlign: 'right', color: "#ff9800", fontSize: 16}}
                  numberOfLines={2}
                  ellipsizeMode={"tail"}
                >
                  Free shots for girls 
                </Text>
                <Text
                  style={{textAlign: 'right', color: "#ff9800"}}
                  numberOfLines={1}
                  ellipsizeMode={"tail"}
                >
                  upto 1:00PM 
                </Text>
              </View>
            </View>
            
            <CardContent text={item.music} />
            <CardAction separator={false} inColumn={false}>
              <View
                style={{
                  flex: 1,
                  justifyContent: "space-between",
                  flexDirection: "row",  
                  backgroundColor: '#ffffff',
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 5,
                    marginBottom: 5,
                    marginLeft: 10,
                    marginRight: 10
                  }}
                >
                  <Ionicons style={styles.icons} name="ios-list" size={15} />
                  <CardButton
                    onPress={() => this.goToGuestListScreen(item.clubid, item.eventdate)}
                    title="GuestList"
                    color="blue"
                  />
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 5,
                    marginBottom: 5,
                    marginLeft: 10,
                    marginRight: 10
                  }}
                >
                  <FontAwesome style={styles.icons} name="ticket" size={15} />
                  <CardButton onPress={() => this.goToGuestListScreen(item.clubid, item.eventdate)} title="Pass" color="blue" />
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 5,
                    marginBottom: 5,
                    marginLeft: 10,
                    marginRight: 10
                  }}
                >
                  <MaterialCommunityIcons
                    style={styles.icons}
                    name="table-plus"
                    size={15}
                  />
                  
              <CardButton onPress={() => this.goToTableScreen(item.clubid, item.eventdate)} title="Table" color="#8FD694" />
                </View>
              </View>
            </CardAction>
          </Card>
       
 
          
          }
          keyExtractor={item => item.eventid + item.eventdate} 
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingTop: 20
  },
  touchButton: {
    alignSelf: "center",
    backgroundColor: "#2980b9",
    paddingVertical: 25,
    width: 295,
    margin: 15
  },
  touchButtonText: {
    textAlign: "center",
    color: "#ffffff", 
    fontWeight: "bold" 
  },
  icons: {
    color: "#60B2E5"
  },
  rowContainer: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    //height: 100,
    //padding: 10,
    marginRight: 10,
    paddingLeft: 5,
    //marginLeft: 10,
    //marginTop: 5,
    //borderRadius: 4,
    shadowOffset: { width: 1, height: 1 }, 
    shadowColor: "#ffffff"
    // shadowOpacity: 1.0,
    // shadowRadius: 1
  },
  dateContainer: {
    //marginLeft: 10,
    marginRight: 10
  },
  rowText: {
    flex: 1,
    flexDirection: "column",
    color: "#607d8b",
    //textAlign: 'right', alignSelf: 'stretch'
  },
});
