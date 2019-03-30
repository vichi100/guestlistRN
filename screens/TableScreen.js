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
//import WebViewPostMessage from './react-native-web-view'
//import { WebView } from 'react-native-webview';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import NumericInput from "react-native-numeric-input";
import { create, PREDEF_RES } from "react-native-pixel-perfect";
import TableDetailsnPrice from "./TableDetailsnPrice"



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
    return fetch("http://192.168.43.64:6000/tableDetails?clubid=1000001&eventDate=19/Mar/2019")
      .then(response => response.json())   
      .then(response => {
       console.log("data : " + JSON.stringify(response));   
       Object.keys(response).map((keyName, keyIndex) =>{ 
        // use keyName to get current key's name
        let tableid = response[keyName].tableid;
        //console.log("tableid "+tableid);
        // console.log("data : " + response[keyName].type);  
        // and a[keyName] to get its value
      })
      
        this.setState({ dataSource: response, isLoading: false });
      })
      .catch(error => {
        console.error(error); 
      }); 
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
    var clickedTableid = urlArr[1];
    
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
          var tablePrice = this.state.dataSource[keyName].cost;
          this.setState({tablePrice:tablePrice});
          var tableSize = this.state.dataSource[keyName].size;
          this.setState({tableSize:tableSize});
          var tableDetails = this.state.dataSource[keyName].details;
          this.setState({tableDetails:tableDetails});
          var tableData = {
            "tableNumber": this.state.dataSource[keyName].tablenumber,
            "tablePrice": this.state.dataSource[keyName].cost,
            "tableSize": this.state.dataSource[keyName].size,
            "tableDetails": this.state.dataSource[keyName].details,
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
              source={{ uri: "http://199.180.133.121/imagemap/layouthtml/1000001-13Mar2019.html" }}
              //source={ require('../react-image-mapper/index.html' )} 
              javaScriptEnabled={true}
              domStorageEnabled={true} 
              //scalesPageToFit={true}
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

{/* 
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
          <MaterialCommunityIcons
              style={styles.icons} 
              name="table-plus"
              size={20}
            />
            <Text style={{ fontSize: 14 , color:'#4caf50'}}>Table Details</Text>
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
                justifyContent: "space-between",
                flexDirection: "row",
                marginTop: 5,
                marginBottom: 5,
                marginLeft: 10,
                marginRight: 10
              }}
            >
              <Text style={styles.instructions}>Table No.</Text>
              <Text style={styles.instructions}>
              {this.state.tableNumber}
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
                justifyContent: "space-between",
                flexDirection: "row",
                marginTop: 5,
                marginBottom: 5,
                marginLeft: 10,
                marginRight: 10
              }}
            >
              <Text style={styles.instructions}>Table Size</Text>
              <Text style={styles.instructions}>
              Remaining Rs
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
              <Text style={styles.instructions}>Table Price</Text>
              <Text style={styles.instructions}>
              Total Rs
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
              <Text style={styles.instructions}>Table Price</Text>
              <Text style={styles.instructions}>
              Total Rs
                  </Text>
            </View>
          </View>

        </View>
      
  


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
            <Text style={{ fontSize: 14 , color:'#4caf50'}}>Payment Details</Text>
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
                justifyContent: "space-between",
                flexDirection: "row",
                marginTop: 5,
                marginBottom: 5,
                marginLeft: 10,
                marginRight: 10
              }}
            >
              <Text style={styles.instructions}>Booking Amount</Text>
              <Text style={styles.instructions}>
              Amount Rs
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
                justifyContent: "space-between",
                flexDirection: "row",
                marginTop: 5,
                marginBottom: 5,
                marginLeft: 10,
                marginRight: 10
              }}
            >
              <Text style={styles.instructions}>Remaining Amount</Text>
              <Text style={styles.instructions}>
              Remaining Rs
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
              Total Rs
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
              <Text style={styles.instructions}>All amount is with full cover charge</Text>
              <Text style={styles.instructions}>
              Total Rs
                  </Text> 
            </View>
          </View>

        </View>
       */}
      
</ScrollView>

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
