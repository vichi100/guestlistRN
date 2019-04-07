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
  Dimensions,
  ActivityIndicator
} from "react-native";

import moment from "moment";
import HeaderImageScrollView, {
  TriggeringView
} from "react-native-image-header-scroll-view";

import Card from "./Card";
import CardImageOverlayBooking from "./CardImageOverlayBooking";
import GuestListScreen from "./GuestListScreen";
import PassScreen from "./PassScreen";
import TableScreen from "./TableScreen";
import { bold } from "ansi-colors";
import BillDetailsScreen from "../screens/BillDetailsScreenForBooking";
import TicketDisplayScreen from "../screens/ticketDistpay/TicketDisplayScreen";

import Login from "../screens/login/Login";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AsyncStorage } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import NumericInput from "../screens/numericInput/NumericInput";
import { create, PREDEF_RES } from "react-native-pixel-perfect";
const calcSize = create(PREDEF_RES.iphone7.px);
import Dialog from "react-native-dialog";

const window = Dimensions.get("window");

var email;
var mobile;

let w = window.Width;
let eventData;
// var lastPassCoupleCount = 0;
// var lastPassStagCount = 0;

export default class BookingScreen extends React.Component {
  static defaultProps = {
    backgroundColor: "#37474f",
    marginTop: 1,
    //width: 150,
    //height: 150,
    shadowColor: "rgb(50,50,50)",
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 3
  };

  static navigationOptions = {
    //To set the header image and title for the current Screen
    title: "Booking",
    headerBackTitle: null,
    headerStyle: {
      backgroundColor: "#263238"
      //Background Color of Navigation Bar
    },

    headerTitleStyle: {
      justifyContent: "center",
      color: "#ffffff",
      textAlign: "left",
      flex: 1
    },

    headerTintColor: "#606070"
    //Text Color of Navigation Bar
  };

  constructor(props) {
    super(props);
    this.state = {
      calc_height: 0,
      isLoading: true,
      guestListCoupleAvailableStr: "Couple/Free",
      guestListGirlAvailableStr: "Girl/Free",
      guestListTitleStr:"Guest List",
      totalAmount: 0,
      remainingamount: 0,
      clubTicketData:null,
      eventTicketDataByDj:null,
      eventTicketDataByPR:null,
      eventTicketDataByGuestList: null,
      totalGirlGuestListCount: 0,
      totalCoupleGuestListCount: 0,
      dataSource: [],
      lastPassCoupleCount:0,
      lastPassStagCount:0,
      guestlistgirlcount:0,
      guestlistcouplecount: 0,
      dialogVisible : false,

      
    };
  }

  componentDidMount() {
    return fetch(
      "http://192.168.43.64:6000/ticketDetails?clubid=" +
        eventData.clubid +
        "&eventDate=" +
        eventData.eventdate
    )
      .then(response => response.json()) 
      .then(response => {
        console.log("ticketDetailsData : " + JSON.stringify(response));

        //TICKET DATA FOR CLUB 
        console.log(" clubTicketData "+response.clubTicketData.guestlistGirlAvailableCount) 
        this.setState({
          clubTicketData:response.clubTicketData,
          eventTicketDataByDj: response.eventTicketDataByDj,
          eventTicketDataByPR: response.eventTicketDataByPR,
          eventTicketDataByGuestList: response.eventTicketDataByGuestList,
        })


        var guestlistGirlAvailableCountByClub = parseInt(response.clubTicketData.guestlistGirlAvailableCount);
        var guestlistGirlAvailableCountByDj = parseInt(response.eventTicketDataByDj.guestlistGirlAvailableCount);
        var guestlistGirlAvailableCountByPR = parseInt(response.eventTicketDataByPR.guestlistGirlAvailableCount);
        var guestlistGirlAvailableCountByGuestList = parseInt(response.eventTicketDataByGuestList.guestlistGirlAvailableCount);

        var guestlistCouplelAvailableCountByClub = parseInt(response.clubTicketData.guestlistCoupleAvailableCount);
        var guestlistCoupleAvailableCountByDj = parseInt(response.eventTicketDataByDj.guestlistCoupleAvailableCount);
        var guestlistCoupleAvailableCountByPR = parseInt(response.eventTicketDataByPR.guestlistCoupleAvailableCount);
        var guestlistCoupleAvailableCountByGuestList = parseInt(response.eventTicketDataByGuestList.guestlistCoupleAvailableCount);
        
        totalGirlGuestListCount = guestlistGirlAvailableCountByClub+guestlistGirlAvailableCountByDj
                                  +guestlistGirlAvailableCountByPR+guestlistGirlAvailableCountByGuestList;
        totalCoupleGuestListCount = guestlistCouplelAvailableCountByClub+guestlistCoupleAvailableCountByDj
                                  +guestlistCoupleAvailableCountByPR+guestlistCoupleAvailableCountByGuestList;

        if(guestlistCouplelAvailableCountByClub > 0 || guestlistGirlAvailableCountByClub > 0  ){
          this.setState({guestListTitleStr: "Guest List"})
        }else if(guestlistCoupleAvailableCountByDj > 0 || guestlistGirlAvailableCountByDj > 0){
          this.setState({guestListTitleStr: "Guest List with love by "+response.eventTicketDataByDj.postedByName})
        }else if(guestlistCoupleAvailableCountByPR || guestlistGirlAvailableCountByPR > 0){
          this.setState({guestListTitleStr: "Guest List with love by "+response.eventTicketDataByPR.postedByName})
        }else if(guestlistCoupleAvailableCountByGuestList > 0 || guestlistGirlAvailableCountByGuestList > 0){
          this.setState({guestListTitleStr: "Guest List"})
        }else{
          this.setState({ guestListTitleStr: "Guest List",
                          guestListCoupleAvailableStr: "Couple/Sold Out",
                        })
        }
        
        this.setState({ dataSource: response, isLoading: false }); 
      })
      .catch(error => {
        console.error(error);
      });
  }
 
  pressedIncreaseGuestListGirlCount = value => {
    console.log("guestlistgirlcount " + JSON.stringify(value));
    this.setState({ guestlistgirlcount: value.guestlistgirlcount });
  };

  pressedIncreaseGuestListCoupleCount = value => {
    console.log("guestlistcouplecount" + JSON.stringify(value));
    this.setState({ guestlistcouplecount: value.guestlistcouplecount });
  };

  //fetch data from AsyncStorage
  _retrieveData = async () => {
    try {
      email = await AsyncStorage.getItem("email");
      mobile = await AsyncStorage.getItem("mobile");
      if (email !== null && mobile !== null) {
        // We have data!!
        console.log(email + ": " + mobile);
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  bookTicket = async eventData => {
    // check if already logged in if not ask for login
    //this._retrieveData();

    if(this.state.guestlistcouplecount == 0 && this.state.guestlistgirlcount ==0 
      && this.state.lastPassCoupleCount == 0 && this.state.lastPassStagCount ==0){
          this._showDialog();
          return; 
      }

    email = await AsyncStorage.getItem("email");
    mobile = await AsyncStorage.getItem("mobile");
    var userid = await AsyncStorage.getItem("customerId");

    if (email == null && mobile == null) {
      // go to login form
      console.log(email + ": " + mobile);
      //this.props.navigation.navigate('BookingScreen', {data:item});
      this.props.navigation.navigate("LoginScreen", {
        eventDataFromBookingScreen: eventData,
        // fromScreen:'BookingScreen.js'
      }); // move to login page
      return;
    }
    
    var bookingTimeStamp = moment().valueOf();
    var postData = {
      bookingid: bookingTimeStamp,
      userid: userid,
      mobilenumber: mobile,
      email: email,
      clubid: eventData.clubid,
      clubname: eventData.clubname,
      eventid: eventData.eventid,
      eventname: eventData.eventname,
      eventdate: eventData.eventdate,
      imageurl: eventData.imageurl,
      postedby: eventData.postedby,
      offerid: eventData.offerid,
      tablediscountamt: "", //eventData.tablediscount,
      tablediscountpercentage: "",
      passdiscountamt: "", //eventData.passdiscount,
      passdiscountpercentage: "",
      totalprice: this.state.totalAmount,
      priceafterdiscount: this.state.totalAmount,
      paidamount: this.state.totalAmount, //this.state.totalAmountAfterDiscount,
      remainingamount: this.state.remainingamount,
      guestlistgirlcount: this.state.guestlistgirlcount,
      guestlistcouplecount: this.state.guestlistcouplecount,
      passcouplecount: this.state.passcouplecount,
      passstagcount: this.state.passstagcount,
      tablenumber: this.state.tablenumber,
      tablepx: this.state.tablepx,
      transactionnumber: "10000000000000003", //transactionnumber,
      paymentstatusmsg: "success",
      bookingconfirm: "yes",
      termncondition: "",
      latlong: eventData.latlong,
      qrcode:
        eventData.clubid +
        "_" +
        eventData.clubname +
        "_" +
        eventData.eventid +
        "_" +
        eventData.eventdate +
        "_" +
        this.state.totalAmount +
        "_" +
        bookingTimeStamp,
      bookingdate: moment().toDate(),
      bookingtimestamp: bookingTimeStamp // current date and time
    };

    //https://stackoverflow.com/questions/43447106/how-to-send-data-to-server-and-fetched-response-using-react-native-application

    // SEND BOOKING DETAILS TO SERVER -  START
    return fetch("http://192.168.43.64:6000/bookTicket", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(postData)
    })
      .then(response => response.json())
      .then(response => {
        console.log("data : " + response);
        this.setState({ dataSource: response, isLoading: false });
        this.props.navigation.navigate("TicketDisplayFromBooking", {
          postData: postData
        });
        console.log("data send to server");
      })
      .catch(error => {
        console.error(error);
      });
    // SEND BOOKING DETAILS TO SERVER FINSH -END
  };

  _showDialog = () => {
    this.setState({ dialogVisible: true });
  };
  
  handleOk = () => {
    // The user has pressed the "Delete" button, so here you can do your own logic.
    // ...Your logic
    this.setState({ dialogVisible: false });
  };

  pressedPassStag = value => {
    console.log("current stag " + JSON.stringify(value));
    console.log("this.state.totalAmount stag " + this.state.totalAmount);
    console.log("lastPassStagCount " + this.state.lastPassStagCount);

    if (value.passstagcount > this.state.lastPassStagCount) {
      var totalAmountx =
        this.state.totalAmount + parseInt(this.state.clubTicketData.passStagCost);
      this.setState({ totalAmount: totalAmountx });
    } else if (value.passstagcount < this.state.lastPassStagCount) {
      var totalAmountx =
        this.state.totalAmount - parseInt(this.state.clubTicketData.passStagCost);
      this.setState({ totalAmount: totalAmountx });
    }
    this.setState({ passstagcount: value.passstagcount });
    this.setState({ lastPassStagCount: value.passstagcount });
    setTimeout(() => {}, 200);
  };

  pressedPassCouple = value => {
    console.log(" current couple " + JSON.stringify(value));
    console.log("this.state.totalAmount couple " + this.state.totalAmount);
    console.log("lastPassCoupleCount " + this.state.lastPassCoupleCount);
    if (value.passcouplecount > this.state.lastPassCoupleCount) {
      var totalAmountx =
        this.state.totalAmount + parseInt(this.state.clubTicketData.passCoupleCost);
      this.setState({ totalAmount: totalAmountx });
    } else if (value.passcouplecount < this.state.lastPassCoupleCount) {
      var totalAmountx =
        this.state.totalAmount - parseInt(this.state.clubTicketData.passCoupleCost);
      this.setState({ totalAmount: totalAmountx });
    }

    this.setState({ passcouplecount: value.passcouplecount });
    //lastPassCoupleCount = value.passCouple;
    this.setState({ lastPassCoupleCount: value.passcouplecount });
    setTimeout(() => {}, 200);
  };

  render() {
    const { navigation } = this.props;
    eventData = navigation.getParam("data");
    console.log("data from events screen :" + JSON.stringify(eventData));

    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator size="large" />
        </View>
      );
    }

    setTimeout(() => {}, 200);

    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <CardImageOverlayBooking
            source={{
              uri: "http://199.180.133.121:3030" + eventData.imageurl
              //"http://199.180.133.121:3030/images/club/barrelmansionandherieast/event/friday.jpg"
            }}
            eventData={eventData}
          />

          {/* <GuestListScreen /> Start   */}

          <View
            //outer GuestList
            style={[
              styles.cardView,
              {
                backgroundColor: this.props.backgroundColor,
                marginTop: this.props.marginTop,
                width: this.props.width,
                //height: this.props.height,
                height: 170,
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
              <Ionicons style={styles.icons} name="ios-list" size={20} />
              <Text style={{ fontSize: 14, color: "#4caf50" }}>
                Guest Lists
              </Text>
            </View>

            <View
              //Girls Section

              style={[
                styles.cardView,
                {
                  backgroundColor: this.props.backgroundColor,
                  marginTop: this.props.marginTop,
                  width: this.props.width,
                  //height: this.props.height,
                  height: 45,
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
                  marginLeft: 10,
                  marginRight: 10
                }}
              >
                <Text style={styles.instructions}>Girls/Free</Text>
                {/* <TouchableOpacity onPress={()=>this.pressedLike()} > */}
                <NumericInput
                  initValue={this.state.guestlistgirlcount}
                  value={this.state.guestlistgirlcount}
                  onChange={guestlistgirlcount =>
                    this.pressedIncreaseGuestListGirlCount({
                      guestlistgirlcount
                    })
                  }
                  totalWidth={150}
                  totalHeight={35}
                  minValue={0}
                  maxValue={3}
                  step={1}
                  iconStyle={{ fontSize: 15, color: "#434A5E" }}
                  inputStyle={{ fontSize: 18, color: "#ffffff" }}
                  valueType="real"
                  borderColor="#C7CBD6"
                  rightButtonBackgroundColor="#C7CBD6"
                  leftButtonBackgroundColor="#C7CBD6"
                />
              </View>
            </View>

            <View style={[
                styles.cardView,
                {
                  backgroundColor: this.props.backgroundColor,
                  marginTop: this.props.marginTop,
                  width: this.props.width,
                  //height: this.props.height,
                  height: 45,
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
                  marginLeft: 10,
                  marginRight: 10
                }}
              >
                <Text style={styles.instructions}>
                  {this.state.guestListCoupleAvailableStr}
                </Text>
                <NumericInput
                  initValue={this.state.guestlistcouplecount}
                  value={this.state.guestlistcouplecount}
                  onChange={guestlistcouplecount =>
                    this.pressedIncreaseGuestListCoupleCount({
                      guestlistcouplecount
                    })
                  }
                  totalWidth={150}
                  totalHeight={35}
                  minValue={0}
                  maxValue={1}
                  step={1}
                  iconStyle={{ fontSize: 15, color: "#434A5E" }}
                  inputStyle={{ fontSize: 18, color: "#ffffff" }}
                  valueType="real"
                  borderColor="#C7CBD6"
                  rightButtonBackgroundColor="#C7CBD6"
                  leftButtonBackgroundColor="#C7CBD6"
                />
              </View>
            </View>
          </View>

          {/* <GuestListScreen /> End */}
          {/* <PassScreen /> Start*/}

          <View
            //outer Pass
            style={[
              styles.cardView,
              {
                backgroundColor: this.props.backgroundColor,
                marginTop: this.props.marginTop,
                width: this.props.width,
                //height: this.props.height,
                height: 170,
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
              <FontAwesome style={styles.icons} name="ticket" size={20} />
              <Text style={{ fontSize: 14, color: "#4caf50" }}>Passes</Text>
            </View>

            <View
              //Girls Section

              style={[
                styles.cardView,
                {
                  backgroundColor: this.props.backgroundColor,
                  marginTop: this.props.marginTop,
                  width: this.props.width,
                  // height: this.props.height,
                  height: 45,
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
                  marginLeft: 10,
                  marginRight: 10
                }}
              >
                <Text style={styles.instructions}>
                  Couples/{this.state.clubTicketData.passCoupleCost} Rs
                </Text>
                <NumericInput
                  initValue={this.state.passcouplecount}
                  value={this.state.passcouplecount}
                  onChange={passcouplecount =>
                    this.pressedPassCouple({ passcouplecount })
                  }
                  totalWidth={150}
                  totalHeight={35}
                  minValue={0}
                  maxValue={9999}
                  step={1}
                  iconStyle={{ fontSize: 15, color: "#434A5E" }}
                  inputStyle={{ fontSize: 18, color: "#ffffff" }}
                  valueType="real"
                  borderColor="#C7CBD6"
                  rightButtonBackgroundColor="#C7CBD6"
                  leftButtonBackgroundColor="#C7CBD6"
                />
              </View>
            </View>

            <View
              //Couple Section

              style={[
                styles.cardView,
                {
                  backgroundColor: this.props.backgroundColor,
                  marginTop: this.props.marginTop,
                  width: this.props.width,
                  //height: this.props.height,
                  height: 45,
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
                  marginLeft: 10,
                  marginRight: 10
                }}
              >
                <Text style={styles.instructions}>
                  Stags/{this.state.clubTicketData.passStagCost} Rs
                </Text>
                <NumericInput
                  initValue={this.state.passstagcount}
                  value={this.state.passstagcount}
                  onChange={passstagcount =>
                    this.pressedPassStag({ passstagcount })
                  }
                  totalWidth={150}
                  totalHeight={35}
                  minValue={0}
                  maxValue={9999}
                  step={1}
                  iconStyle={{ fontSize: 15, color: "#434A5E" }}
                  inputStyle={{ fontSize: 18, color: "#ffffff" }}
                  valueType="real"
                  borderColor="#C7CBD6"
                  rightButtonBackgroundColor="#C7CBD6"
                  leftButtonBackgroundColor="#C7CBD6"
                />
              </View>
            </View>
          </View>

          {/* <PassScreen /> End*/}
          {/* <BillDetailsScreen/> Start */}

          <View
            //outer GuestList
            style={[
              styles.cardView,
              {
                backgroundColor: this.props.backgroundColor,
                marginTop: this.props.marginTop,
                width: this.props.width,
                height: this.props.height,
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
              <FontAwesome style={styles.icons} name="rupee" size={20} />
              <Text style={{ fontSize: 14, color: "#4caf50" }}>
                Payment Details
              </Text>
            </View>

            <View
              style={[
                styles.cardView,
                {
                  backgroundColor: this.props.backgroundColor,
                  marginTop: this.props.marginTop,
                  width: this.props.width,
                  height: this.props.height,
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
                  marginLeft: 10,
                  marginRight: 10
                }}
              >
                <Text style={styles.instructions}>Total Amount</Text>
                <Text style={styles.instructions}>
                  {this.state.totalAmount} Rs
                </Text>
              </View>
            </View>

            <View
              //Girls Section

              style={[
                styles.cardView,
                {
                  backgroundColor: this.props.backgroundColor,
                  marginTop: this.props.marginTop,
                  width: this.props.width,
                  height: this.props.height,
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
                  justifyContent: "flex-end",
                  flexDirection: "row",
                  marginTop: 5,
                  marginBottom: 5,
                  marginLeft: 10,
                  marginRight: 10
                }}
              >
                <Text style={styles.coverCharge}>
                  All amount is with full cover charge
                </Text>
              </View>
            </View>

            <View
              //Couple Section

              style={[
                styles.cardView,
                {
                  backgroundColor: this.props.backgroundColor,
                  marginTop: this.props.marginTop,
                  width: this.props.width,
                  height: this.props.height,
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
            />
          </View>

          {/* <BillDetailsScreen/> End */}
        </ScrollView>






        <View style={{ width: w }}>
          <TouchableOpacity
            onPress={() => this.bookTicket(eventData)}
            style={{
              height: 50
              //width:160,
              //borderRadius:10,

              // marginLeft :50,
              // marginRight:50,
              // marginTop :20
            }}
          >
            <View
              style={{ 
                flex: 1,
                alignItems: "center", 
                justifyContent: "center",
                backgroundColor: "#263238"
              }}
            >
              <Text style={{ color: "#ffffff" }}>BOOK</Text>
            </View>
          </TouchableOpacity>
          {/* <Button
            onPress={this.buttonClickListener}
            title="BOOK"
            color="#263238" 
            height="40"
          /> */}
        </View>

        <Dialog.Container visible={this.state.dialogVisible}>
          {/* <Dialog.Title>Enter Mobile Number</Dialog.Title> */}
          <Dialog.Description>
            No Guest List or Passes selected !
          </Dialog.Description>

          
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff"
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
    color: "#777"
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
  },
  icons: {
    width: 30,
    height: 30,
    color: "#0091ea"
    //borderRadius: 30,
    //borderWidth: 2,
    //borderColor: 'rgb(170, 207, 202)'
  },
  instructions: {
    color: "#e0e0e0"
  },
  coverCharge: {
    color: "#e0e0e0"
  }
});
