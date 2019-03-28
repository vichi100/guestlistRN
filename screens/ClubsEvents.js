import React, { Component } from "react";
import {
  ActivityIndicator,
  Text,
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  ImageBackground,
} from "react-native";
import Calendar from "./calendar/Calendar";
import moment from 'moment';
import Card from "./Card";
import CardTitle from "./CardTitle";
import CardContent from "./CardContent";
import CardAction from "./CardAction";
import CardButton from "./CardButton";
// import CardImage from "./CardImage";
import CardImageOverlayEvents from "./CardImageOverlayEvents"
//import { CardButton } from 'react-native-material-cards'

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";


import { EvilIcons } from "@expo/vector-icons";

import GuestListScreen from "./GuestListScreen";
import BookingScreen from "./BookingScreen";

var mydatasource = []
var isDataChanged = false

const mywidth = Dimensions.get("window").width;
const myheight = Dimensions.get('window').height;
const mycenter = (Dimensions.get('window').height)/2;

const mydata = (data, eventdate) => data.filter( (item) => {
  // console.log("Date : "+date.format('DD/MMM/YYYY'))
  // console.log("Data : "+JSON.stringify(data))
  isDataChanged = true
  return item.eventdate === eventdate.format('DD/MMM/YYYY')
})



export default class ClubsEvents extends Component {  

  

  
  constructor(props) {  
    super(props);
    this.state = {
      isLoading: true, 
      dataSource: []
    };
  }
 
  componentDidMount() { 
    return fetch("http://192.168.43.64:6000/eventsDetails?eventDate=29Jan2019")
      .then(response => response.json())
      .then(response => {
       // console.log("data : " + response);
       
        mydatasource = response
        x = response.filter( (item) => {
          // console.log("item.date : " + item.eventdate);
          // console.log("item.clubname : " + item.clubname);
          // console.log("filter date : " + moment().format('DD/MMM/YYYY'));
          return item.eventdate === moment().format('DD/MMM/YYYY')
        })
        this.setState({ dataSource: x, isLoading: false });
      })
      .catch(error => {
        console.error(error); 
      }); 
  }

  

  onSelectDate = (date) => {
    // console.log("date ; " + date, 'day');
    // console.log(date.format('DD/MMM/YYYY')); 
    this.setState({ dataSource: mydata(mydatasource, date) }); 
  };

  
  goToGuestListScreen = (item) => { 
    // const {navigate} = this.props.navigation;
    // navigate('GuestListScreen'); 
    // console.log("date ; " + eventDate);
    // console.log("clubid ; " + clubid);
    this.props.navigation.navigate('BookingScreen', {data:item});  
}

goToTableScreen = (clubid, eventDate) => { 
  // const {navigate} = this.props.navigation;
  // navigate('GuestListScreen'); 
  // console.log("date ; " + eventDate);
  // console.log("clubid ; " + clubid);
  this.props.navigation.navigate('TableScreen', {eventDate:eventDate, clubid: clubid});  
}

_showMoreApp = () => {
  
  //this.props.navigation.navigate('Other');
};

  render() {

    setTimeout(() => { 
      
    }, 200);
    
    if (this.state.isLoading) {
      return ( 
        <View style={{ flex: 1, justifyContent: 'center' }}>  
          <ActivityIndicator size="large" />
        </View>
      );
    } 
 
    return (     
      <View style={styles.container}>  
        <Calendar onSelectDate={this.onSelectDate} />   
        <FlatList
          data={this.state.dataSource}
          extraData={this.state} 
          renderItem={({ item }) => 
          


            // <CardImageOverlayEvents 
            //   source={{
            //     uri: "http://199.180.133.121:3030"+item.imageurl
            //     //"http://199.180.133.121:3030/images/club/barrelmansionandherieast/event/friday.jpg"
            //   }}
            //   eventDate={item.eventdate}
            //   eventData={item}
            //   //title="Above all i am here"
            // />


            <View
        style={[styles.cardImage]}
        onLayout={e => {
          this.setState({ calc_height: (e.nativeEvent.layout.width * 9) / 16 });
        }}
      >
        <ImageBackground
          source={{ uri: "http://199.180.133.121:3030"+item.imageurl}}
          resizeMode="cover"//{this.props.resizeMode || "cover"}
          resizeMethod="scale"//{this.props.resizeMethod || "resize"}
          style={[styles.imageContainer, { height: this.state.calc_height }]}   
          
        >

{/* <View style={{ flexWrap: "wrap", backgroundColor: 'rgba(0, 0, 0, 0.5)', alignSelf: 'flex-start' , position: "absolute", top: 0, margin:5,}}>
          <Text style={{ color: 'white', fontSize: 14, marginTop:5, marginLeft:5, marginRight:5}}>{weekDayName}</Text>
          <Text style={{ color: 'white',  marginLeft:5, marginRight:5}}>{date[0]}</Text>
          <Text style={{ color: 'white',  marginLeft:5, marginRight:5, marginBottom:5}}>{date[1]}</Text>
        </View> */}


<View style={{
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              alignSelf: "flex-start",
              position: "absolute",
              bottom: 0,
              //left:0,
              height: 75,
              width: mywidth,
              flexDirection: "row",
            }}>
           
              <View style={{ flex: 1, marginLeft:10}}>
              <Text
                  style={{  color: "#e040fb", fontSize: 15 }}
                  numberOfLines={1}
                >
                   {item.eventname}
                </Text>
                <Text
                  style={{
                    
                    color: "#2196f3",
                    fontSize: 17,
                    //fontWeight: "bold"
                  }}
                >
                  {item.clubname}
                </Text>
                
              </View>
              
              <View
                style={{
                  height: 35,
                  width: 1,
                  backgroundColor: "#ffffff",
                  marginRight: 5
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
            
            
            
              <View
                style={{
                  flex: 1,
                  justifyContent: "space-evenly",
                  flexDirection: "row",  
                  //backgroundColor: '#ffffff',
                  position: "absolute",
                  bottom: 0,
                  justifyContent:"center",
                  marginTop: 5,
    
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 5,
                    marginBottom: 5,
                    justifyContent:"flex-start",
                    flex: 1,
                    marginLeft: 10,
                    // marginRight: 10
                  }}
                >
                  <Ionicons style={styles.icons} name="ios-list" size={15} />
                  <CardButton
                    onPress={() => this.goToGuestListScreen(item)}
                    title="GuestList"
                    color="blue"
                  />
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 5,
                    marginBottom: 5,
                    justifyContent:"center",
                    flex: 1,
                    // marginLeft: 10,
                    // marginRight: 10
                  }}
                >
                  <FontAwesome style={styles.icons} name="ticket" size={15} />  
                  <CardButton onPress={() => this.goToGuestListScreen(item)} title="Pass" color="blue" />
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 5,
                    marginBottom: 5,
                    justifyContent:"flex-end",
                    flex: 1,
                    // marginLeft: 10,
                    marginRight: 5
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
           

              
          <MaterialCommunityIcons
          onPress={() => this.pressedLike()}
            style={styles.heartwhite}
            name="heart-outline"
            size={30}
          />
          <EvilIcons style={styles.share} name="share-google" size={30} />
        </ImageBackground>
      </View>
            
 
          
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
    paddingTop: 2
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
    color: "#60B2E5",
    //transform: [{ rotate: '90deg'}]
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
  cardImage: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "grey",
    //alignSelf: 'stretch',
    marginBottom: 1,
    justifyContent: "center"
    //alignItems: 'stretch'
  },
  imageContainer: {
    flex: 1,
    flexDirection: "column",
    //paddingRight: 16,
    //paddingLeft: 16,
    paddingBottom: 10,
    paddingTop: 5,
    justifyContent: "flex-end"
  },
  imageTitleText: {
    fontSize: 24,
    color: "rgba(255 ,255 ,255 , 0.87)"
  },
  heartwhite: {
    margin: 10,
    position: "absolute",
    top: 0,
    right: 0,
    width: 30,
    height: 30,
    color: "#ffffff"
  },
  heartred: {
    margin: 10,
    position: "absolute",
    top: 0,
    right: 0,
    width: 30,
    height: 30,
    color: "red"
  },
  share: {
    margin: 10,
    position: "absolute",
    top: 50,
    right: 0,
    width: 30,
    height: 30,
    color: "#009688"
  },
  near_me: {
    margin: 10,
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 30,
    height: 30,
    color: "#60B2E5" 
  },

  rowText: {
    flex: 1,
    flexDirection: "column",
    color: "#607d8b",
    marginRight:10,
    //textAlign: 'right', alignSelf: 'stretch'
  },
  icons: {
    color: "#60B2E5",
    //transform: [{ rotate: '90deg'}]
  },
});
