import React from 'react'
import { TextInput, Image, View, Button, AsyncStorage, Text } from 'react-native'
import style from '../Style'
import { StackNavigator, createStackNavigator } from 'react-navigation';
import List from './List'
import Geolocation from './Geolocation'

class Search extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            city: null,
            cityFromGeolocation: null,
            cities: [
                { key: 0, name: 'Paris' },
                { key: 1, name: 'Londres' },
                { key: 2, name: 'Berlin' },
                { key: 3, name: 'Nanterre' }
            ],
            values: null
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
        // console.log('getCity cfg ' + this.state.cityFromGeolocation)
        // console.log('getCity c ' + this.state.city)
    }

    // goToGeolocation() {
    //     this.props.navigation.navigate('Result2')
    // }

    async getFavorites() {
        console.log('getting favorites')
        try {
            const value = await AsyncStorage.getItem('faoritesCities');
            if (value !== null) {
                console.log(value);
                this.setState({
                    values: value
                })
            }
        } catch (error) {
            // Error retrieving data
            console.log('rien ici');
            return (error + 'err')
        }

    }

    componentWillMount() {
        this.getFavorites()
    }
    componentDidUpdate(){
        this.getFavorites()
    }
    
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
                        onPress={() => { this.setState({ city: this.state.cityFromGeolocation }) + {/*+ console.log('cfg ' + this.state.cityFromGeolocation) + console.log('c' + this.state.city) */ } }}
                    />
                </View>
                <View>
                    {
                        this.state.cities.map(c => <Text key={c.key}> {c.name} </Text>)
                    }
                </View>
                <View>
                    <Text>
                        {this.state.values}
                    </Text>
                </View>

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