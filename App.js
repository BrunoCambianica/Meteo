import React from 'react'
import { StyleSheet, Text, View, StatusBar, Button } from 'react-native'
import { TabNavigator, StackNavigator, StackNavigatorConfig, createStackNavigator } from 'react-navigation'

import About from './components/About'
import Search from './components/Search'
import Geolocation from './components/Geolocation'

// const Tabs = TabNavigator({
//   Search: { screen: Search },
//   About: { screen: About },
// },
//   {
//     tabBarPosition: 'bottom',
//     swipeEnabled: true,
//     animationEnabled: true,
//     backgroundColor: '#4d4dff',
//     tabBarOptions: {

//       showIcon: false,
//       showLabel: true,
//       indicatorStyle: {
//         backgroundColor: 'white',
//         height: 3
//       }

//     }

//   })

const Tabs = createStackNavigator({
  Search: { screen: Search },
  Geolocation: { screen: Geolocation}
  // About: { screen: About },
},
  {
    header: null,
    headerMode: 'none',
    // navigationOptions: {
    //   title: 'Bonjourrr',
    //   headerTintColor: 'blue',
      // headerMode: 'none',
      // headerVisible: false,
    // }
  }
  // {
  // header: null,
  // headerMode: 'none',
  // navigationOptions: {
  //   headerMode: 'none',
  //   headerVisible: false,
  // }

  // }
)

const navigationOptions = {
  headerMode: 'none',
  headerVisible: false,
}

export default class App extends React.Component {


  goToGeolocation(){
    this.props.navigation.navigate('Geolocation')

  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar hidden={true} />
        <Tabs />
      </View>

    );
  }
}