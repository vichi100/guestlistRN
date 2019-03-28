import React, { Fragment } from 'react';
import { Text } from 'react-native';
import { NavigationActions } from 'react-navigation';

const screen2 = (props) => (
  <Fragment>
    <Text>screen2</Text>
    
    <Text onPress={
      () => props.navigation.navigate('screen4')
    }>go to screen4</Text>

    <Text onPress={  
      () => {
        props.navigation.dispatch(
          NavigationActions.navigate({
            routeName: 'stack2',
            action: NavigationActions.navigate({
              routeName: 'screen4',
            })
          })
        )
      }
    }>go to screen4 differently</Text>
    
    <Text onPress={
      () => props.navigation.goBack()
    }>Go back</Text>
  </Fragment>
);

export default screen2;
