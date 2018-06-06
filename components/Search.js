import React from 'react'
import { TextInput, Image, View, Button, AsyncStorage, Text, ListView } from 'react-native'
import style from '../Style'
import { StackNavigator, createStackNavigator } from 'react-navigation';
import List from './List'
import Geolocation from './Geolocation'
import Favorites from './Favorites'

class Search extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            city: null,
            cityFromGeolocation: null,
            values: null,
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

    // submitGeolocation() {
    //     this.props.navigation.navigate('Result', { city: this.state.cityFromGeolocation })
    // }

    getCity(city) {
        this.setState({
            cityFromGeolocation: city
        })
        // console.log('getCity cfg ' + this.state.cityFromGeolocation)
        // console.log('getCity c ' + this.state.city)
    }

    // goToGeolocation() {
    //     this.props.navigation.navigate('Result2')
    // }

    removeFavorites() {
        console.log('clearing favorites')
        AsyncStorage.clear()
    }


    
    // async renderFavorites() {
    //     const value = await AsyncStorage.getAllKeys()
    //     if (value !== null) {
    //         return (
    //             <View>
    //                 {
    //                     this.state.value.map((city, key) => (
    //                         <View key={key}>
    //                             <Text style={style.favorites}>
    //                                 {city}
    //                             </Text>
    //                         </View>
    //                     ))}
    //             </View>
    //         )
    //     } else {
    //         return (
    //             <View>
    //                 <Text>
    //                     Vous n'avez pas de favoris
    //                 </Text>


    //             </View>
    //         )
    //     }
    // }

    componentDidMount() {
        // this.getFavorites()
    }

    

    // componentWillMount() {
    //     this.getFavorites()
    // }

    // componentDidUpdate() {
    //     this.getFavorites()
    // }

    render() {
        return (
            <View style={style.container}>
                <View>
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
                    <Geolocation
                        sendCity={this.getCity.bind(this)}
                        onPress={() => { this.setState({ city: this.state.cityFromGeolocation }) }}
                    />
                </View>
                <Button
                    title='Supprimer mes favoris'
                    onPress={() => { this.removeFavorites() }}
                />
                {/* <Button
                    title='actualiser'
                    // onPress={() => { this.getFavorites() }}
                /> */}
                <Favorites />
            </View>
        )
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
    // Result2: { screen: Geolocation }
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