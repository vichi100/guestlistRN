import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Navigator,
  Platform,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

import TopBar from './topBar';
import TabProfile from './tabProfile';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons"; 
import OfficeLocationDisplay from "../screens/gmap/OfficeLocationDisplay";
import { OpenMapDirections } from '../screens/gmap/GMapDirectionDrive';


var mePic = require('../images/sebas.jpg');
var meName = 'Sebastian Diaz'
var meUsername = 'holasebasdiaz'


export default class Profile extends Component {

  static navigationOptions = {
    //To set the header image and title for the current Screen
    title: 'Hey There !',
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
  
    this.state = {};
  }
  _callShowDirections = () => {
    //"latlong":19.074103, 72.869604
    

    const endPoint = { 
      longitude: 72.869604,
      latitude: 19.074103
    }

		const transportPlan = 'd';

    OpenMapDirections(null, endPoint, transportPlan).then(res => {
      console.log(res)
    });
  }


  render() {

    return (
     <View> 

        {/* <TopBar title={meUsername}/> */}
 
      <ScrollView automaticallyAdjustContentInsets={false} style={styles.scrollView}>


      <View style={styles.headerContainer}>
        <ImageBackground
          style={styles.headerBackgroundImage}
          blurRadius={10}
          source={{
            uri: "http://199.180.133.121:3030"+'/images/club/tipplingstreetjuhu/tipplingstreetjuhu.jpg',
          }}
        >
          <View style={styles.headerColumn}>
            <Image
              style={styles.userImage}
              source={{
                uri: "http://199.180.133.121:3030"+'/images/club/tipplingstreetjuhu/tipplingstreetjuhu.jpg',
              }}
            />
            <Text style={styles.userNameText}>name</Text>
            </View>
        </ImageBackground>
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
            <MaterialCommunityIcons
                style={styles.icons} 
                name="untappd"
                size={20}
              />
              <Text style={{ fontSize: 14 , color:'#4caf50'}}>Our Philosophy</Text>
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
                <Text style={styles.instructions}>Life is too short to go to bad parties. {"\n"}You should be able to discover, book & join the best events in town with your finger tips.</Text>
                
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
            <Foundation
                style={styles.icons} 
                name="social-instagram"
                size={20}
              />
              <Text style={{ fontSize: 14 , color:'#4caf50'}}>Follow us</Text>
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
                <Text style={styles.instructions}>@yoguestlist</Text>
                
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
            <MaterialIcons
                style={styles.icons} 
                name="contact-phone"
                size={20}
              />
              <Text style={{ fontSize: 14 , color:'#4caf50'}}>Call & Chat with us</Text>
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
                <Text style={styles.instructions}>+91 986714466</Text>
                
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
            <MaterialIcons
                style={styles.icons} 
                name="location-on"
                size={20}
              />
              <Text style={{ fontSize: 14 , color:'#4caf50'}}>Find us</Text>
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
                <Text style={styles.instructions}>GuestList {"\n"}
                91springboard, Kagalwala House{"\n"}
Bandra Kurla Complex, Mumbai 400098</Text>
                
              </View>
            </View>
          </View>
        
          <TouchableOpacity onPress={() => this._callShowDirections()}>
          <OfficeLocationDisplay/>
          </TouchableOpacity>
  
  
  


      </ScrollView>
     
    </View>
    );
  }
}

const styles = StyleSheet.create({
  scrollView:{
    backgroundColor: '#fff',
    //marginBottom:110
  },
 
  container: {

    flex: 1,
    backgroundColor: "#fff"

  },

  headerBackgroundImage: {
    paddingBottom: 20,
    paddingTop: 35,
  },

  headerContainer: {},
  headerColumn: {
    backgroundColor: 'transparent',
    ...Platform.select({
      ios: {
        alignItems: 'center',
        elevation: 1,
        marginTop: -1,
      },
      android: {
        alignItems: 'center',
      },
    }),
  },

  userImage: {
    borderColor: '#01C89E',
    borderRadius: 85,
    borderWidth: 3,
    height: 170,
    marginBottom: 15,
    width: 170,
  },

  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 15,
  },
  mePic:{
      width:70,
      height:70,
      borderRadius:35
  },
  meInfoWrap:{
    paddingTop:5,
    
    flexDirection:'row'
  },
  meData:{
    flex:2,
    paddingTop:20,
    flexDirection:'row',
    
  },
  meInfo:{
    alignItems:'center',
    padding:15
  },
  meName:{
    fontWeight:'bold',
    fontSize:12,
    paddingTop:10
  },
  data:{
    flex:1,
    
    alignItems:'center'
  },
  edit:{
    borderWidth:1,
    borderColor:'#ccc',
    borderRadius:3,
    alignItems:'center',
    margin:15,
    padding:2,
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
  },
  userNameText: {
    color: '#FFF',
    fontSize: 22,
    //fontWeight: 'bold',
    paddingBottom: 8,
    textAlign: 'center',
  }, 

});

