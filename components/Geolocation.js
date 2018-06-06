import React, { Component } from 'react'
import { Platform, Text, View, StyleSheet, ActivityIndicator, Button } from 'react-native'
import { Constants, Location, Permissions } from 'expo'
// import Geocoder from 'react-native-geocoder'

export default class App extends Component {
    state = {
        location: null,
        errorMessage: null,
        fullAdress: null,
        city: null,
        lng: 0,
        lat: 0,
    }

    componentWillMount() {
        this._getLocationAsync()
    }

    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION)
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied',
            })
        }

        let location = await Location.getCurrentPositionAsync({})
        this.setState({ location })
        this.setState({
            lng: this.state.location.coords.longitude,
            lat: this.state.location.coords.latitude
        })
        this.getCityNameByLondLat()
    }

    // getCityNameByLondLat() {
    //     let coordinates = {
    //         lat: this.state.lat,
    //         lng: this.state.lng
    //     }
    //     console.log(coordinates)

    //     Geocoder.fallbackToGoogle('AIzaSyBKt1okBA4C9dwzqiYZMcS44VPywiT7XLU')
    //     Geocoder.geocodePosition(coordinates)
    //         .then(json => {
    //             var addressComponent = json.results[0].formatted_address
    //             var longName = json.results[0].address_components[2].long_name
    //             console.log('geocoder var : ' + longName)
    //             this.setState({
    //                 fullAdress: addressComponent,
    //                 city: longName,
    //             })
    //         })
    //         .catch(error => console.warn(error))
    // }

    getCityNameByLondLat = async() => {
        let coordinates = {
            latitude : this.state.lat,
            longitude : this.state.lng
        }

        Location.setApiKey('AIzaSyBKt1okBA4C9dwzqiYZMcS44VPywiT7XLU')
        let address = await Location.reverseGeocodeAsync(coordinates)
        
        this.setState({
            number : address[0].name,
            city : address[0].city,
            street : address[0].street,
            country : address[0].country,
            region: address[0].region,
            postalCode: address[0].postalCode,
            fullAdress: `${this.state.number} ${this.state.street} ${this.state.city} ${this.state.postalCode}`
        })
        // console.log(this.state.city)
    }

    sendCityToSearch(city) {
        this.props.sendCity(city)
        this.props.onPress()
    }

    render() {
        if (this.state.city === null) {
            return (
                <ActivityIndicator size='small' color='red' />
            )
        }
        else if (this.state.city !== null) {
            return (
                <View>
                    <Button
                        title='Me localiser'
                        onPress={() => { this.sendCityToSearch(this.state.city) }}
                    // onPress={this.props.onPress}
                    />
                    {/* <Text>{this.state.city}</Text> */}
                </View>
            )
        }

        // let text = 'ATTENDS..'
        // if (this.state.errorMessage) {
        //     text = this.state.errorMessage
        // } else if (this.state.location) {
        //     text = JSON.stringify(this.state.location)
        // }

        // if (this.state.city === null) {
        //     return (
        //         <View style={{ justifyContent: 'space-between' }}>
        //             <Text>Localisation en cours... Veuillez patienter </Text>
        //             <ActivityIndicator size='large' />
        //         </View>
        //     )
        // }
        // else if (this.state.city !== null) {
        //     return (
        //         <View>

        //             <Text>{this.state.city}</Text>
        //         </View>
        //     )
        // }
    }
}