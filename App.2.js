import React from 'react';
import { Platform, StatusBar, StyleSheet, View , Text} from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import AppNavigator from './navigation/AppNavigator';
import ErrorBoundary from "./ErrorBoundary"
import AppIntroSlider from 'react-native-app-intro-slider';

import { SafeAreaView } from "react-navigation"; 
import { Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

if (Platform.OS === "android") {
  // removes extra space at top of header on android
  SafeAreaView.setStatusBarHeight(0);
}



export default class App extends React.Component {

  
  state = {
    isLoadingComplete: false,
    showRealApp: false,
  };

  _onDone = () => {
    // After user finished the intro slides. Show real app through
    // navigation or simply by controlling state
    this.setState({ showRealApp: true });
  };
  _onSkip = () => {
    // After user skip the intro slides. Show real app through 
    // navigation or simply by controlling state
    this.setState({ showRealApp: true });
  };

  render() {
    if(this.state.showRealApp){

      if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
        return (
          <AppLoading
            startAsync={this._loadResourcesAsync}
            onError={this._handleLoadingError}
            onFinish={this._handleFinishLoading}
          />
        );
      } else {
  
        if(Platform.OS === 'ios'){
          return (
            <ErrorBoundary>
            <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}} forceInset={{'top': 'never'}}>
            <View style={styles.container}>
              {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
              <AppNavigator />
            </View>
            </SafeAreaView>
            </ErrorBoundary>
          );
        }else{
  
          return ( 
            <ErrorBoundary>
            <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}} forceInset={{'top': 'never'}}>
            <View style={{flex: 1,
       marginTop: 25,
       backgroundColor: '#ffffff',}}>
              {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
              <AppNavigator />
            </View>
            </SafeAreaView>
            </ErrorBoundary>
          );
  
        }
      
      }

    }else{

      return (
        <AppIntroSlider
          slides={slides}
          //comming from the JsonArray below
          onDone={this._onDone}
          //Handler for the done On last slide
          showSkipButton={true}
          onSkip={this._onSkip}
        />
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'), 
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  }; 

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
     //marginTop: 25, 
     backgroundColor: '#ffffff',
  },
  image: {
    resizeMode:"contain",
    width: width,
    height: 300,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: 'transparent',
    textAlign: 'center',
    marginTop: 16,
  },
});

const slides = [
  {
    key: 's1',
    text: 'GUESTLIST   |    PASS    |    TABLE \nClick on to book ticket',
    title: ' PARTY LIKE VIP',
    titleStyle: styles.title,
    textStyle: styles.text,
    image: require('./assets/images/introimg1.png'),
    imageStyle: styles.image,
    backgroundColor: '#f6437b',
  },
  {
    key: 's2',
    text: 'FREE ENTRY | HAPPY HOURS  ',
    title: ' BEST DEALS ',
    titleStyle: styles.title,
    textStyle: styles.text,
    image: require('./assets/images/discount.png'),
    imageStyle: styles.image,
    backgroundColor: '#22bcb5',
  },
  {
    key: 's3',
    title: 'BYE BYE Q ',
    titleStyle: styles.title,
    text: 'ENTER LIKE CELEB', 
    textStyle: styles.text,
    image: require('./assets/images/plane.png'),
    imageStyle: styles.image,
    backgroundColor: '#3395ff',
  },
  {
    key: 's4',
    title: 'BEST CLUBS ',
    titleStyle: styles.title,
    text: 'CRAZY WILD PARTIES ',
    textStyle: styles.text,
    image: require('./assets/images/location.png'),
    imageStyle: styles.image,
    backgroundColor: '#febe29',
  },
  // {
  //   key: 's5',
  //   title: 'Bus Booking',
  //   titleStyle: styles.title,
  //   text: 'Enjoy Travelling on Bus with flat 100% off',
  //   image: {
  //     uri:
  //       'http://aboutreact.com/wp-content/uploads/2018/08/bus_ticket_booking.png',
  //   },
  //   imageStyle: styles.image,
  //   backgroundColor: '#f6437b',
  // },
  // {
  //   key: 's6',
  //   title: 'Train Booking',
  //   titleStyle: styles.title,
  //   text: ' 10% off on first Train booking',
  //   image: {
  //     uri:
  //       'http://aboutreact.com/wp-content/uploads/2018/08/train_ticket_booking.png',
  //   },
  //   imageStyle: styles.image,
  //   backgroundColor: '#febe29',
  // },
];
