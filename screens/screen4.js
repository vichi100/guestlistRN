import React, { Fragment } from 'react';
import { Text, View } from 'react-native';

const screen4 = (props) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>screen4</Text>
    
    <Text onPress={
      () => props.navigation.goBack()
    }>Go back</Text>

    <Text onPress={
      () => props.navigation.goBack(null)
    }>Go back with null</Text>

    <Text onPress={
      () => props.navigation.pop()
    }>pop screen</Text>
  </View>
);

export default screen4;