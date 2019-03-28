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

export default class TableScreen extends React.Component {
  static defaultProps = {
    backgroundColor: "#fff",
    marginTop: 10,
    //width: 350,
    //height: 350,
    shadowColor: "rgb(50,50,50)",
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 3
  };

  constructor(props) {
    super(props);
    this.state = {
      calc_height: 0
    };
  }

  onMessage(m) {
    //alert(m.nativeEvent.data);
    console.log(m.nativeEvent.data);
  }

  _onNavigationStateChange(webViewState) {
    console.log(webViewState.url);
  }

  _onShouldStartLoadWithRequest(e) {
    console.log(e.url);

    // if(checkUrl(e.url)) {

    //     let Router = this.props.navigator.props.router;
    //     let route = Router.getRouteFromUrl(e.url);
    //     this.props.navigator.push(route);

    //     this.refs[WEBVIEW_REF].stopLoading();  // <---- Add a similar line
    //     //This will tell your webView to stop processing the clicked link

    //     return false;

    // }

    return true;
  }

  render() {
    return (
      <View style={styles.container}>
        <View
          //outer Pass
          style={[
            styles.cardView,
            {
              backgroundColor: this.props.backgroundColor,
              marginTop: this.props.marginTop,
              width: this.props.width,
              height: 330,
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
          <View style={{ flexDirection: "row", margin: 10 }}>
            <MaterialCommunityIcons
              style={styles.icons}
              name="table-plus"
              size={20}
            />
            <Text style={{ fontSize: 14 }}>Tables Booking</Text>
          </View>

          <View
            //Couple Section

            style={[
              styles.cardView,
              {
                backgroundColor: this.props.backgroundColor,
                marginTop: this.props.marginTop,
                width: this.props.width,
                height: 250,
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
               <WebView
              useWebKit={true}
              //style={{ height: 200 }}
              ////http://199.180.133.121/imagemap/layouthtml/1000000-21Mar2019.html
              source={{ uri: "http://199.180.133.121/imagemap/layouthtml/1000000-21Mar2019.html" }}
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

          {/* <View style={{ height: 250 }}>
            
          </View> */}
        </View>
        
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
    //borderRadius: 30,
    //borderWidth: 2,
    borderColor: "rgb(170, 207, 202)"
  },
  
});
