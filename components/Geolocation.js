import React, { Component } from 'react'
import { Platform, Text, View, StyleSheet, ActivityIndicator, Button } from 'react-native'
import { Constants, Location, Permissions } from 'expo'
import Geocoder from 'react-native-geocoding'

export default class App extends Component {
    state = {
        location: null,
        errorMessage: null,
        fullAdress: null,
        city: null,
        longitude: 0,
        latitude: 0,
    }

    getCityNameByLondLat() {
        Geocoder.init('AIzaSyDR1izCUQNwthR7sBQtoqDL_IEggmLUug8')
        Geocoder.from(this.state.latitude, this.state.longitude)
            .then(json => {
                var addressComponent = json.results[0].formatted_address
                var longName = json.results[0].address_components[2].long_name
                this.setState({
                    fullAdress: addressComponent,
                    city: longName,
                })
            })
            .catch(error => console.warn(error))
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
            longitude: this.state.location.coords.longitude,
            latitude: this.state.location.coords.latitude
        })
        this.getCityNameByLondLat()
    }

    sendCityToSearch(city) {
        this.props.sendCity(city)
    }

    render() {
        if (this.state.city === null) {
            return (
                <ActivityIndicator size='small' color='red' />
            )
        }
        else if (this.state.city !== null) {
            return (
                <Button
                    title = 'Localise moi stp'
                    onPress={() => { this.sendCityToSearch(this.state.city) }}
                />
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