import React, { Component } from 'react';
import {
  StatusBar,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import TicketRowItem from './TicketRowItem';

export default class TicketsListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [
        {
          id: 1,
          title: 'Harry Potter and the Goblet of Fire',
          author: 'J. K. Rowling',
          thumbnail: 'http://199.180.133.121:3030/images/club/barrelmansionandherieast/event/friday.jpg'
        },
        {
          id: 2,
          title: 'The Hobbit',
          author: 'J. R. R. Tolkien',
          thumbnail: 'https://covers.openlibrary.org/w/id/6979861-M.jpg'
        },
        {
          id: 3,
          title: '1984',
          author: 'George Orwell',
          thumbnail: 'https://covers.openlibrary.org/w/id/7222246-M.jpg'
        }
      ]
    }
  }

  goToGuestListScreen = (clubid, eventDate) => { 
    // const {navigate} = this.props.navigation;
    // navigate('GuestListScreen'); 
    console.log("date ; " + eventDate);
    console.log("clubid ; " + clubid);
    this.props.navigation.navigate('TicketDisplayScreen', {eventDate:eventDate, clubid: clubid});  
}

  _renderItem = ({item}) => (
    <TouchableOpacity onPress={() => this.goToGuestListScreen('999999', '22/Mar/2019')} >
    <TicketRowItem
      id={item.id}
      title={item.title}
      author={item.author}
      thumbnail={item.thumbnail}
    />
    </TouchableOpacity>
  );

  _keyExtractor = (item, index) => index.toString();

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="light-content"
        />
        <FlatList
          data={this.state.books}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  }
});