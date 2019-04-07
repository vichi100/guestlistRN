import React from "react";
import {
  Platform,
  Button,
  Alert,
  TouchableWithoutFeedback,
  Text,
  View,
  TouchableHighlight
} from "react-native";

import {
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

//import MainTabNavigator from "./MainTabNavigator";

import GuestListScreen from "../screens/GuestListScreen";
import PassScreen from "../screens/PassScreen";
import ClubsEvents from "../screens/ClubsEvents";


import BookingScreen from "../screens/BookingScreen";
import TableScreen from "../screens/TableScreen";
import TicketDisplayFromTableBooking from "../screens/TicketDisplayFromTableBooking";


import MyProfile from "../screens/MyProfile";

////////

import TabBarIcon from "../components/TabBarIcon";
import OffersListScreen from "../screens/offers/OffersListScreen";
//import SettingsScreen from "../screens/SettingsScreen";
import TicketsListScreen from "../screens/tickets/TicketsListScreen";
import TicketDisplayScreen from "../screens/ticketDistpay/TicketDisplayScreen";
import TicketDisplayFromBooking from "../screens/ticketDistpay/TicketDisplayFromBooking";

//import Feed from "../screens/feed";
import EventsScreen from "../screens/EventsScreen";
import Icon from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";

import Profile from "../screens/profile";
import DJProfile from "../screens/DJProfile";
import Search from  "../screens/SearchScreen";
import EventsOfOneClub from '../screens/EventsOfOneClub'
import CardImageOverlayEvents from '../screens/CardImageOverlayEvents';
import Login from "../screens/login/Login";
import FBLogin from "../screens/login/FBLogin";
import SelectCity from '../screens/changeCity/SelectCity';
import chat from '../chat/Chat';
// import screen2 from "../screens/screen2";

// import MyHomeScreen from "../screens/MyHomeScreen";

import MainTopTabs from "./TopTabNavigator";

const HomeStack = createStackNavigator({ 
  Home: {
    screen: MainTopTabs,
    navigationOptions: ({ navigation }) => {
      const { navigate } = navigation
      return {
              
      headerTitle: () => ( 
        <TouchableWithoutFeedback onPress={() => navigate('SelectCity')}>
          <View
            style={{ flex: 1, alignItems: "stretch", justifyContent: "center" ,}}
          >
            <Text style = {{ color:'#eeeeee', fontSize: 16, fontWeight: '500', textAlign: "left"}} >{'Mumbai'}     </Text> 
          </View>
        </TouchableWithoutFeedback>
      ),
        headerRight: (
          <TouchableHighlight onPress={() => navigate('Search')}> 
            <View>
              <Ionicons style={{ marginRight: 10 }} name="ios-search" size={25} color='#eeeeee'/>
            </View>
          </TouchableHighlight>
        ),
       

      headerStyle: {
        backgroundColor: '#263238',
      },
      headerTintColor: '#fff',
      headerTitleStyle: { 
        fontWeight: 'bold',
        alignItems: "left",
      },
      headerTitleContainerStyle: {
        left: 10, // THIS RIGHT HERE
      },
    }
    },

  
    // navigationOptions: {
    //   //headerTitle: 'Mumbai',
    //   headerTitle: () => ( 
    //     <TouchableWithoutFeedback onPress={() => navigate()}>
    //       <View
    //         style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    //       >
    //         <Text>Mumbai</Text>
    //       </View>
    //     </TouchableWithoutFeedback>
    //   ),

      // headerRight: (
      //   <TouchableHighlight onPress={() => navigate('LinksStack')}>
      //     <View>
      //       <Ionicons style={{ marginRight: 10 }} name="ios-search" size={25} />
      //     </View>
      //   </TouchableHighlight>
      // ),
    //   headerTitleStyle: {
    //     //fontWeight: 'bold',
    //     fontFamily: "Roboto",
    //     textAlign: "center",
    //     flex: 1
    //   }
    // }
  }
});

HomeStack.navigationOptions = {
  tabBarLabel: "Clubs",
  tabBarIcon: ({ focused }) => (  
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `md-pulse`
          : "md-pulse"
      }
    />
  ),
  // tabBarOptions: {
  //   activeTintColor: 'tomato',
  //   inactiveTintColor: 'gray',
  // },
  
};

const OffersStack = createStackNavigator({
  Offers: {
    screen: OffersListScreen,
    navigationOptions: {
      headerTitle: "Offers",
      headerTitleStyle: {
        //fontWeight: 'bold',
        //fontFamily: "Roboto",
        textAlign: "left",
        flex: 1,
        color:'#fff',
      },
      
      headerStyle: {
        backgroundColor: "#263238",

        shadowOpacity: 0,
        borderBottomWidth: 0
      }
    }
  }
});

OffersStack.navigationOptions = {
  tabBarLabel: "Offers",
  safeAreaInset: {
    top: "never"
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? "ios-notifications-outline"
          : "ios-notifications-outline"
      }
    />
  ),
  // tabBarOptions: {
  //   activeTintColor: 'tomato',
  //   inactiveTintColor: 'gray',
  // },
};

const PassesStack = createStackNavigator({ 
  //Passes: TicketsListScreen
  Passes: {
    screen: TicketsListScreen,
    navigationOptions: {
      headerTitle: "Passes",
      headerTitleStyle: {
        //fontWeight: 'bold',
        //fontFamily: "Roboto",
        textAlign: "left",
        flex: 1,
        color:'#fff',
      },
      
      headerStyle: {
        backgroundColor: "#263238",

        shadowOpacity: 0,
        borderBottomWidth: 0
      }
    }
  }
});

PassesStack.navigationOptions = {
  tabBarLabel: "Passes",
  safeAreaInset: {
    top: "never"
  },
  tabBarIcon: ({ focused }) => ( 
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-pricetags" : "ios-pricetags"}
    />
  ),
  // tabBarOptions: {
  //   activeTintColor: 'tomato',
  //   inactiveTintColor: 'gray',
  // },
};


const chatStack = createStackNavigator({ 
  //Passes: TicketsListScreen
  chat: {
    screen: chat,
    navigationOptions: {
      headerTitle: "Passes",
      headerTitleStyle: {
        //fontWeight: 'bold',
        //fontFamily: "Roboto",
        textAlign: "left",
        flex: 1,
        color:'#fff',
      },
      
      headerStyle: {
        backgroundColor: "#263238",

        shadowOpacity: 0,
        borderBottomWidth: 0
      }
    }
  }
});

chatStack.navigationOptions = {
  tabBarLabel: "Chat",
  safeAreaInset: {
    top: "never"
  },
  tabBarIcon: ({ focused }) => ( 
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-text" : "ios-text"}
    />
  ),
  
};




const ProfileStack = createStackNavigator({
  Profiles: Profile 
});

ProfileStack.navigationOptions = {
  tabBarLabel: "Profile",
  safeAreaInset: {
    top: "never"
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "md-finger-print" : "md-finger-print"}
    />
  ), 
  // tabBarOptions: {
  //   activeTintColor: 'tomato',
  //   inactiveTintColor: 'gray',
  // },
};

const Bottom = createBottomTabNavigator({
  HomeStack,
  OffersStack,
  PassesStack,
  chatStack,
  ProfileStack,
},
{
  tabBarOptions: { 
    activeTintColor: 'tomato',
    inactiveTintColor: 'gray',
    labelStyle: {
      fontSize: 12,
    },
    style: {
      backgroundColor: '#263238',
    },
  }

}   

);

//////////


const AppStack = createStackNavigator({
  MainTabNavigator: {
    screen: Bottom,
    headerMode: 'none',
    headerBackTitle: null,
    headerLeft: null,
    navigationOptions: {
      header: null  
    }
  },
  SelectCity: {
    screen: SelectCity,
  },

  Search: {
    screen: Search,
  },
  
  ClubsEvents: ClubsEvents,
  DJProfile:DJProfile,
  EventsOfOneClub: EventsOfOneClub,
  CardImageOverlayEvents: CardImageOverlayEvents, 
  TicketDisplayScreen: TicketDisplayScreen,  
  TicketDisplayFromBooking : TicketDisplayFromBooking,
  TicketDisplayFromTableBooking: TicketDisplayFromTableBooking,
  BookingScreen: BookingScreen,
  LoginScreen:Login,
  FBLogin: FBLogin,
  TableScreen: TableScreen,
  GuestListScreen: GuestListScreen,
  PassScreen: PassScreen
});

export default createAppContainer( 
  createSwitchNavigator(
    {
      //AuthLoading: MainTabNavigator,
      App: AppStack
      //Auth: AuthStack,
    },
    {
      //initialRouteName: 'AuthLoading',
      initialRouteName: "App",
      headerMode: "none"
    }
  )
);
