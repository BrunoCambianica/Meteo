import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { TabNavigator } from 'react-navigation';

import Search from './components/Search'

const Tabs = TabNavigator({
  Search: {screen: Search}
})

export default class App extends React.Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar hidden={true}/>
        <Tabs/>
      </View>
      
    );
  }
}

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: '#fff',
//     flex: 1
//   },
// });
