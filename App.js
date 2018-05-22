import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { TabNavigator } from 'react-navigation';

import About from './components/About'
import Search from './components/Search'

const Tabs = TabNavigator({
  Search: { screen: Search },
  About: { screen: About },
},
  {
    tabBarPosition: 'bottom',
    swipeEnabled: true,
    animationEnabled: true,
    backgroundColor: '#4d4dff',
    tabBarOptions: {
      showIcon: false,
      showLabel: true,
      indicatorStyle: {
        backgroundColor: 'white',
        height: 3
      }

    }

  })

export default class App extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar hidden={true} />
        <Tabs />
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
