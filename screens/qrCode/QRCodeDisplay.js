'use strict';

import React, { Component } from 'react'
import QRCode from 'react-native-qrcode';
import moment from "moment";
import {
    AppRegistry,
    StyleSheet,
    View,
    Text,
} from 'react-native';

class QRCodeDisplay extends Component {
  state = {
    qrtext: '',
  };

  render() {
    var qrCodeData = this.props.qrCodeData;
    //console.log("qrCodeStr : " + qrCodeStr);
    var weekDayName = moment(qrCodeData.eventdate, "DD/MMM/YYYY HH:mm:ssZZ")
        .format("ddd")
        .toUpperCase();
      var date = qrCodeData.eventdate.split("/");
    return (
      <View style={styles.container}>
        <View style={{ flexDirection:"row"}}>
          <QRCode
            value={qrCodeData.qrcode} 
            size={150}
            //bgColor='purple'
            fgColor='white'/>
          <View style={{ justifyContent: 'flex-end', backgroundColor: 'rgba(0, 0, 0, 0.7)',   marginLeft:5,  hight:150, }}>
            <Text style={{ color: '#ef6c00', fontSize: 14,  marginLeft:5, marginRight:5}}>{weekDayName}</Text>
            <Text style={{ color: '#ffeb3b',  marginLeft:5, marginRight:5}}>{date[0]}</Text>
            <Text style={{ color: '#ea80fc',  marginLeft:5, marginRight:5, }}>{date[1]}</Text>
          </View>
      </View>
      </View> 
    );
  }; 
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },

    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        margin: 10,
        borderRadius: 5,
        padding: 5,
    }
});

//AppRegistry.registerComponent('HelloWorld', () => HelloWorld);

module.exports = QRCodeDisplay; 