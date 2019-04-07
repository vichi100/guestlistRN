import React, { Component } from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  ImageBackground,
  WebView
} from "react-native";
import moment from 'moment';
//import WebViewPostMessage from './react-native-web-view'
//import { WebView } from 'react-native-webview';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import NumericInput from "react-native-numeric-input";
import { create, PREDEF_RES } from "react-native-pixel-perfect";
import TableDetailsnPrice from "./TableDetailsnPrice";
import Dialog from "react-native-dialog";

let eventData;
var email;
var mobile;

var clickedTableid = null;

export default class TableScreen extends React.Component {

  static navigationOptions = {
    //To set the header image and title for the current Screen
    title: 'Table Booking',
    headerBackTitle: null,
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
  }


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
    this.state = {
      dialogVisible: false,
      calc_height: 0,
      tableNumber: 0,
      dataSource:[],
      tableNumber:'', 
      tablePrice:'',
      tableSize: '',
      tableDetails:'',
      tablelayoutURL: '',
      tableData:{}
    }; 
  } 

  componentDidMount() { 
    //return fetch("http://192.168.43.64:6000/tableDetails?clubid=1000001&eventDate=19/Mar/2019")
    return fetch("http://192.168.43.64:6000/tableDetails?clubid="+eventData.clubid+"&eventDate="+eventData.eventdate)
      .then(response => response.json())   
      .then(response => {
       console.log("Table data from response  : " + JSON.stringify(response));   
       Object.keys(response).map((keyName, keyIndex) =>{ 
        // use keyName to get current key's name
        let tableid = response[keyName].tableid;
        console.log("tableid "+tableid);
        // console.log("data : " + response[keyName].type);  
        // and a[keyName] to get its value 
      })
      
        this.setState({ dataSource: response, isLoading: false });
      })
      .catch(error => { 
        console.error(error); 
      }); 
  }

  _showDialog = () => {
    this.setState({ dialogVisible: true });
  };
  
  handleOk = () => {
    // The user has pressed the "Delete" button, so here you can do your own logic.
    // ...Your logic
    this.setState({ dialogVisible: false });
  };

bookTicket= async() =>{
  if(clickedTableid == null){
        this._showDialog();
        return; 
  }

  if (email == null && mobile == null) {
    // go to login form
    console.log(email + ": " + mobile);
    //this.props.navigation.navigate('BookingScreen', {data:item});
    this.props.navigation.navigate("LoginScreen", {
      eventDataFromBookingScreen: eventData
    }); // move to login page
    return;
  }

  email = await AsyncStorage.getItem("email");
  mobile = await AsyncStorage.getItem("mobile");
  var userid = await AsyncStorage.getItem("customerId");


  var bookingTimeStamp = moment().valueOf();
  var postData = {
    "bookingid": bookingTimeStamp,
    "userid" : "9999",
    "mobilenumber":"9867614466",
    "email" : "vichi100@gmail.com",
    "clubid" : eventData.clubid, 
    "clubname" : eventData.clubname,
    "eventid" : eventData.eventid,
    "eventname" : eventData.eventname,
    "eventdate" : eventData.eventdate,
    "imageurl": eventData.imageurl,
    "postedby" : eventData.postedby,
    "offerid" : eventData.offerid, 
    "tablediscountamt" : "",//eventData.tablediscount,
    "tablediscountpercentage" : "",
    "passdiscountamt" : "",//eventData.passdiscount,
    "passdiscountpercentage": "", 
    "totalprice" : this.state.tableData.tablePrice,
    "priceafterdiscount": this.state.totalAmount,
    "paidamount" : this.state.tableData.bookingAmount,//this.state.totalAmountAfterDiscount,
    "remainingamount" : this.state.tableData.remainingAmount,
    "guestlistgirlcount" : this.state.guestlistgirlcount,
    "guestlistcouplecount" : this.state.guestlistcouplecount,
    "passcouplecount" : this.state.passcouplecount,
    "passstagcount" : this.state.passstagcount,
    "tablenumber" : this.state.tableData.tableNumber,
    "tablepx" : this.state.tableData.tableSize,
    "transactionnumber" : "10000000000000003",//transactionnumber,
    "paymentstatusmsg" : "success",
    "bookingconfirm" : "yes",
    "termncondition": "", 
    "latlong" : eventData.latlong,
    "qrcode" : eventData.clubid+"_"+eventData.clubname+"_"+eventData.eventid+"_"+eventData.eventdate+"_"
              +this.state.totalAmount+"_"+bookingTimeStamp,
    "bookingdate" : moment().toDate(),
    "bookingtimestamp" : bookingTimeStamp,// current date and time

  }
  
  //https://stackoverflow.com/questions/43447106/how-to-send-data-to-server-and-fetched-response-using-react-native-application

  // SEND BOOKING DETAILS TO SERVER -  START
  return fetch("http://192.168.43.64:6000/bookTicket",{
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
    this.props.navigation.navigate('TicketDisplayFromTableBooking', { "postData":postData }); 
  console.log("data send to server");
  }) 
  .catch(error => {
    console.error(error); 
  }); 
  // SEND BOOKING DETAILS TO SERVER FINSH -END
  

}  




  onMessage(m) {
    //alert(m.nativeEvent.data);
    console.log(m.nativeEvent.data);
  }

  _onNavigationStateChange(webViewState) {
    console.log("vichi"+webViewState.url);
  }

  pressedIncreaseGuestListGirlCount =(value) => { 
    console.log("guestlistgirlcount "+JSON.stringify(value));
    this.setState({guestlistgirlcount: value.guestlistgirlcount}  )
  } 

  _onShouldStartLoadWithRequest = (e) =>{
    //"url": "http://199.180.133.121/imagemap/layouthtml/1000004-13Mar2019.html#BJ-1000004-C1",
    console.log("vichi "+e.url);
    var urlArr = e.url.split('#'); 
    clickedTableid = urlArr[1];   
    console.log("this.state.dataSource : "+this.state.dataSource);
    if(this.state.dataSource && this.state.dataSource.length > 0){
      //console.log("this.state.dataSource" + this.state.dataSource);
      Object.keys(this.state.dataSource).map((keyName, keyIndex) =>{ 
        // use keyName to get current key's name
        let tableid = this.state.dataSource[keyName].tableid;
        //console.log("clickedTableid "+clickedTableid)
        if(clickedTableid != null && clickedTableid == tableid){
          var tableNumber = this.state.dataSource[keyName].tablenumber; 
          //console.log("tableNumber " + tableNumber)
          this.setState({tableNumber:tableNumber});
          var tablePriceStr = this.state.dataSource[keyName].cost;
          this.setState({tablePrice:tablePrice});
          var tableSize = this.state.dataSource[keyName].size;
          this.setState({tableSize:tableSize});
          var tableDetails = this.state.dataSource[keyName].details; 
          this.setState({tableDetails:tableDetails});
          var bookingAmount = 0;
          var tablePrice = parseInt(tablePriceStr);  
          if(tablePrice <= 5000){ 
            bookingAmount = 2000;
          }else if(tablePrice <= 10000){
            bookingAmount = 3000;
          }else if(tablePrice <= 20000){
            bookingAmount = 5000
          }else if(tablePrice <= 35000){ 
            bookingAmount = 7000;
          }else{
            bookingAmount = 10000;
          }
          var remainingAmount = tablePrice -bookingAmount;
          var tableData = {
            "tableNumber": this.state.dataSource[keyName].tablenumber,
            "tablePrice": this.state.dataSource[keyName].cost,
            "tableSize": this.state.dataSource[keyName].size,
            "tableDetails": this.state.dataSource[keyName].details,
            "bookingAmount": bookingAmount,
            "remainingAmount":remainingAmount,
          }

          this.setState({tableData:tableData});

        }
        console.log("tableid "+tableid);
        // console.log("data : " + response[keyName].type);  
        // and a[keyName] to get its value
      })

    }
   
    
  }


  render() {

    setTimeout(() => { 
      
    }, 200);

    const { navigation } = this.props;  
    eventData = navigation.getParam("data");

    function replaceAll(str, find, replace) {
      return str.replace(new RegExp(find, 'g'), replace);
  }
    var eventDateForImageURL = eventData.eventdate.replace(new RegExp('/', 'g'), '');
    console.log('eventDateForImageURL '+eventDateForImageURL) 
    console.log("data from events screen :"+ JSON.stringify(eventData));
    return (
      <View style={styles.container}>
      <ScrollView>

      
        <View
          //outer Pass
          style={[
            styles.cardView,
            {
              backgroundColor: this.props.backgroundColor,
              marginTop: this.props.marginTop,
              width: this.props.width,
              height: 350,
              //margin: 5,
              ...Platform.select({
                ios: {
                  shadowColor: this.props.shadowColor,
                  shadowOpacity: this.props.shadowOpacity,
                  shadowRadius: this.props.shadowRadius,
                  shadowOffset: {
                    height: -1,
                    width: 0
                  }
                },
                android: {
                  elevation: this.props.elevation
                }
              })
            }
          ]}
        >
          <View style={{ flexDirection: "row", margin: 10 }}>
            <MaterialCommunityIcons
              style={styles.icons}
              name="table-plus"
              size={20}
            />
            <Text style={{ fontSize: 14 , color:'#4caf50' }}>Table Booking</Text>
          </View>

          <View
            //Couple Section

            style={[
              styles.cardView,
              {
                backgroundColor: this.props.backgroundColor,
                marginTop: this.props.marginTop,
                width: this.props.width,
                height: 270,
                margin: 5,
                ...Platform.select({
                  ios: {
                    shadowColor: this.props.shadowColor,
                    shadowOpacity: this.props.shadowOpacity,
                    shadowRadius: this.props.shadowRadius,
                    shadowOffset: {
                      height: -1,
                      width: 0
                    }
                  },
                  android: {
                    elevation: this.props.elevation
                  }
                }) 
              }
            ]}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "space-between",
                flexDirection: "row",
                marginTop: 5,
                marginBottom: 5,
                //marginLeft: 10, 
                //marginRight: 10
              }}  
            > 
               <WebView
              useWebKit={true} 
              //style={{ height: 200 }} 
              ////http://199.180.133.121/imagemap/layouthtml/1000000-21Mar2019.html
              //source={{ uri: "http://199.180.133.121/imagemap/layouthtml/1000001-13Mar2019.html" }}

              //source={{ uri: "http://199.180.133.121:8000/" }}
              source={{ uri: "http://192.168.43.64:8000/"+eventData.clubid+"-"+eventDateForImageURL+".html" }}

              //http://localhost:8000/999999-20Mar2019.html
              //source={{ uri: "http://192.168.43.64:.html" }}
              //source={ require('../react-image-mapper/index.html' )} 
              javaScriptEnabled={true}
              domStorageEnabled={true} 
              scalesPageToFit={true}
              scrollEnabled={false}
              automaticallyAdjustContentInsets={true}
              injectedJavaScript={this.state.cookie} 
              startInLoadingState={false}
              onMessage={m => this.onMessage(m)} 
              onLoadEnd={e => console.log("end", e)}
              onLoadStart={e => console.log("start", e)}  
              onError={e => console.log("error", e)}
              //onNavigationStateChange={this._onNavigationStateChange.bind(this)}

              onLoad={e => console.log("end", e)}
              onShouldStartLoadWithRequest={this._onShouldStartLoadWithRequest}
              onNavigationStateChange={this._onShouldStartLoadWithRequest}
            />
            </View>
          </View>

          
        </View>
        
        
        <TableDetailsnPrice tableData = {this.state.tableData}/> 


      
</ScrollView> 

<Dialog.Container visible={this.state.dialogVisible}>
          {/* <Dialog.Title>Enter Mobile Number</Dialog.Title> */}
          <Dialog.Description>
            Please select a table !
          </Dialog.Description>

          
          <Dialog.Button
            style={{ fontFamily: "sans-serif" }}
            label="OK"
            onPress={this.handleOk}
          />
        </Dialog.Container>

<TouchableOpacity onPress={()=>this.bookTicket()} style ={{
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
        BOOK
    </Text> 
</View>
</TouchableOpacity>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
    //backgroundColor: "#939393",
  },

  icons: {
    width: 30,
    height: 30,
    color:'#0091ea'
    //borderRadius: 30, 
    //borderWidth: 2, 
    //borderColor: 'rgb(170, 207, 202)'
},
instructions:{
  color: '#e0e0e0'
}
  
});
