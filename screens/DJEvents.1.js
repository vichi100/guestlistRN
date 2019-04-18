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
import axios from "axios";



export default class DJEvents extends Component {  

  

  
  constructor(props) {  
    super(props);
    this.state = {
      isLoading: true, 
      dataSource: []
    };
  }
 
  componentDidMount() { 
    return axios.get("http://192.168.43.64:6000/eventsDetails?djid=29Jan2019")
      //.then(response => response.json())
      .then(response => {
        // console.log("data : " + response);
       
        // mydatasource = response
        // x = response.filter( (item) => {
        //   console.log("item.date : " + item.eventdate);
        //   console.log("item.clubname : " + item.clubname);
        //   console.log("filter date : " + moment().format('DD/MMM/YYYY'));
        //   return item.eventdate === moment().format('DD/MMM/YYYY')
        // })
        this.setState({ dataSource: response.data, isLoading: false });
      })
      .catch(error => {
        console.error(error); 
      }); 
  }
  
  goToGuestListScreen = (clubid, eventDate) => { 
    // const {navigate} = this.props.navigation;
    // navigate('GuestListScreen'); 
    // console.log("date ; " + eventDate);
    // console.log("clubid ; " + clubid);
    this.props.navigation.navigate('BookingScreen', {eventDate:eventDate, clubid: clubid});  
}

goToTableScreen = (clubid, eventDate) => { 
  // const {navigate} = this.props.navigation;
  // navigate('GuestListScreen'); 
//   console.log("date ; " + eventDate);
//   console.log("clubid ; " + clubid);
  this.props.navigation.navigate('TableScreen', {eventDate:eventDate, clubid: clubid});  
}



  render() {
    
    if (this.state.isLoading) {
      return ( 
        <View style={{ flex: 1, justifyContent: 'center' }}>  
          <ActivityIndicator size="large" color="#00ff00"/>
        </View>
      );
    } 
 
    return (     
      <View style={styles.container}>  
        <FlatList
          data={this.state.dataSource}
          renderItem={({ item }) => 
          

<Card>
            <CardImage 
              source={{
                uri: "http://199.180.133.121:3030"+item.imageurl
                //"http://199.180.133.121:3030/images/club/barrelmansionandherieast/event/friday.jpg"
              }}
              eventDate={item.eventdate}
              //title="Above all i am here"
            />
            <CardTitle title={item.eventname} subtitle={item.clubname.toUpperCase()} />
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
  }
});
