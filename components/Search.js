import React from 'react'
import { TextInput, Image, View, Button } from 'react-native'
import style from '../Style'
import { StackNavigator, createStackNavigator } from 'react-navigation';
import List from './List'
import Geolocation from './Geolocation.js'

class Search extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            city: null,
            cityFromGeolocation: null,
        }
    }

    static navigationOptions = {
        title: 'Rechercher une ville'
    }

    setCity(city) {
        this.setState({ city })
    }

    submit() {
        this.props.navigation.navigate('Result', { city: this.state.city })
    }

    submitGeolocation() {
        this.props.navigation.navigate('Result', { city: this.state.cityFromGeolocation })
    }

    getCity(city) {
        this.setState({
            cityFromGeolocation: city
        })
    }

    // goToGeolocation() {
    //     this.props.navigation.navigate('Result2')
    // }


    render() {
        if (this.state.cityFromGeolocation === null) {
            return (
                <View style={style.container}>
                    <TextInput
                        underlineColorAndroid='transparent'
                        style={style.input}
                        value={this.state.city}
                        onChangeText={(text) => this.setCity(text)}
                    />
                    <Button
                        color={style.color}
                        title='Rechercher une ville'
                        onPress={() => this.submit()}
                    />
                    <Geolocation style={{ marginTop: 15 }} sendCity={this.getCity.bind(this)} />
                </View>
            )
        } else if (this.state.cityFromGeolocation !== null) {
            return (
                <View style={style.container}>
                    <TextInput
                        underlineColorAndroid='transparent'
                        style={style.input}
                        value={this.state.city}
                        onChangeText={(text) => this.setCity(text)}
                    />
                    <Button
                        color={style.color}
                        title='Rechercher une ville'
                        onPress={() => this.submit()}
                    />
                    <Geolocation style={{ marginTop: 15 }} sendCity={this.getCity.bind(this)} onPress = {() => {this.setState({city: cityFromGeolocation})}} />
                </View>
            )
        }
    }
}

// const navigationOptions = {
// headerStyle: style.header,
// headerTitleStyle: style.headerTitle,
// headerMode: 'none',
// headerVisible: false,
// headerMode: 'none',
// navigationOptions: {
//     headerVisible: false,
// }
// }

export default createStackNavigator({
    Search: { screen: Search },
    Result: { screen: List },
    Result2: { screen: Geolocation }
    // },
    //     {
    //         header: {
    //             style: {
    //                 position: 'absolute',
    //                 backgroundColor: 'transparent',
    //                 zIndex: 100,
    //                 top: 0,
    //                 left: 0,
    //                 right: 0
    //             }
    //         }
    //         // headerMode: 'none',
    //     }
})