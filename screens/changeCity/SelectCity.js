import React from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions, Image } from 'react-native';
import Card from '../Card'


// const data = [
//   { key: 'A' }, { key: 'B' }, { key: 'C' }, { key: 'D' }, { key: 'E' }, { key: 'F' }, { key: 'G' }, { key: 'H' }, { key: 'I' }, { key: 'J' },
//   // { key: 'K' },
//   // { key: 'L' },
// ];


const data = [{id:"Mumbai", src: require('../../assets/images/mumbai.png')},
                {id:"Delhi", src: require('../../assets/images/delhi.png')},
                {id:"Bangloore", src: require('../../assets/images/bangloore.png')},
                {id:'Pune', src: require('../../assets/images/pune.png')},
                ]

const formatData = (data, numColumns) => {
  const numberOfFullRows = Math.floor(data.length / numColumns);

  let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
  while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
    data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
    numberOfElementsLastRow++;
  }

  return data;
};

const numColumns = 2;
export default class App extends React.Component {

  renderItem = ({ item, index }) => {
      console.log(item.src) 
    if (item.empty === true) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    }
    return (
      <View
        style={styles.item}
      >
        {/* <Text style={styles.itemText}>{item.id}</Text> */}
        <Card>
        <Image
          resizeMode = "stretch"
          style = {{ flex: 1 , height:259, width:200}}
          source = {item.src}
          //source={require('/react-native/img/favicon.png')}
        />
        </Card> 
        
      </View>
    );
  };

  render() {
    return (
      <FlatList
        data={formatData(data, numColumns)}
        style={styles.container}
        renderItem={this.renderItem}
        numColumns={numColumns}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
  },
  item: {
    //backgroundColor: '#4D243D',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 1,
    height: Dimensions.get('window').width / numColumns, // approximate a square
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
  itemText: {
    color: '#fff',
  },
});