import React from 'react'
import { StyleSheet, Text, View, StatusBar } from 'react-native'
import { TabNavigator, StackNavigator, StackNavigatorConfig, createStackNavigator } from 'react-navigation'
// import { Easing } from 'react-vr'

import About from './components/About'
import Search from './components/Search'

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
  About: { screen: About },
},
  {
    header: null,
    headerMode: 'none',
    navigationOptions: {
      headerMode: 'none',
      headerVisible: false,
    }

  }
)

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