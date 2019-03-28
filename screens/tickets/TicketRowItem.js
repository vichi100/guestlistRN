import React, { Component } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Text,
    Image,
    View
  } from 'react-native';

//import { Icon } from 'react-native-elements';

export default class TicketRowItem extends Component {





    render() {
        return(
          
          <View style={styles.rowContainer}>
            <Image source={{uri: this.props.thumbnail}}
            style={styles.thumbnail}
             />
            <View style={styles.rowText}>
              <Text style={styles.title} numberOfLines={2} ellipsizeMode ={'tail'}>
                {this.props.title}
              </Text>
              <Text style={styles.author} numberOfLines={1} ellipsizeMode ={'tail'}>
                {this.props.author}
              </Text>

              <Text style={styles.datetxt} numberOfLines={1} ellipsizeMode ={'tail'}>
                Sun | 29 Feb 2019
              </Text>
            </View>
          </View>
        );
    }
}

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    backgroundColor: '#263238',
    height: 100,
    //padding: 10,
    // marginRight: 5,
    // marginLeft: 5,
    marginTop: 1,
    //borderRadius: 4,
    shadowOffset:{  width: 1,  height: 1,  },
    shadowColor: '#ffffff',
    // shadowOpacity: 1.0,
    // shadowRadius: 1
  },
  title: {
    paddingLeft: 10,
    paddingTop: 5,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0091ea'
  },
  author: {
    paddingLeft: 10,
    marginTop: 5,
    fontSize: 16,
    color: '#4caf50'
  },
  datetxt: {
    paddingLeft: 10,
    marginTop: 15,
    fontSize: 14,
    color: '#ffffff'
  },
  thumbnail: {
    flex: 1,
    // height: undefined,
    // width: undefined
  },
  rowText: {
    flex: 4,
    flexDirection: 'column'
  }
  });