import React, { Component } from 'react';
import {
  StatusBar,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator
} from 'react-native';

import TicketRowItem from './TicketRowItem';
import { AsyncStorage } from "react-native";

export default class TicketsListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: null,
      isLoading:true,

    }
  }

  componentDidMount() {
    var userid =  AsyncStorage.getItem("customerId");
    console.log('userid: '+JSON.stringify(userid));
    // if(userid == null){
    //   this.props.navigation.navigate("LoginScreen"); // move to login page
    //   return;
    // } 

    return fetch(
      "http://192.168.43.64:6000/bookingDetails?userid=10216445950197935"// +userid 
    )
      .then(response => response.json()) 
      .then(response => {

        Object.keys(response).map((keyName, keyIndex) =>{ 
          this.setState({ dataSource: response });
        })
        this.setState({ isLoading: false });
        
      })
      .catch(error => {
        console.error(error);
      });
  }

  goToTicketDisplay = (item) => { 
    // const {navigate} = this.props.navigation;
    // navigate('GuestListScreen'); 
    // console.log("date ; " + eventDate);
    // console.log("clubid ; " + clubid);
    if(item.tablenumber == null){
      this.props.navigation.navigate('TicketDisplayFromBooking', {bookingData:item});  
    }else{
      this.props.navigation.navigate('TicketDisplayFromTableBooking', {bookingData:item});  
    }
    
}

  _renderItem = ({item}) => (
    <TouchableOpacity onPress={() => this.goToTicketDisplay(item)} >
    <TicketRowItem bookedTicketDetailsData={item} />
    </TouchableOpacity>
  );

  _keyExtractor = (item, index) => index.toString();

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator size="large" />
        </View>
      );
    }

    if(this.state.dataSource == null){
      return (
      <View style={{flex: 1, justifyContent:'center'}}>
        <Text style={{color:'#000000', textAlign:'center'}}> No ticket booked yet</Text>
      </View>
      
      );
      
    } else{
      console.log('I am in else') 
      return (
        <View style={styles.container}>
          <StatusBar
            barStyle="light-content"
          /> 
          <FlatList
            data={this.state.dataSource}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
          />
        </View>
      );
    }

   
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  }
});