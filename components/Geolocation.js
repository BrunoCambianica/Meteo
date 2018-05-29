import React, { Component } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import { Constants, Location, Permissions } from 'expo';
import Geocoder from 'react-native-geocoding'

export default class App extends Component {
    state = {
        location: null,
        errorMessage: null,
        city: ''
    };

    getCityNameByLondLat() {
        Geocoder.init('AIzaSyDR1izCUQNwthR7sBQtoqDL_IEggmLUug8');

        // console.log('longitude' + this.state.locationcoords.longitude)
        Geocoder.from(48.9809163, 2.186643)
            .then(json => {
                // var addressComponent = json.results[0].address_components[0];
                var addressComponent = json.results[0].formatted_address;

                alert(addressComponent);
                this.setState = {
                    city: addressComponent
                }
            })
            .catch(error => console.warn(error));

    }


    componentWillMount() {
        // if (Platform.OS === 'android' && !Constants.isDevice) {
        //     this.setState({
        //         errorMessage: "Ca ne arche que sur un portable pas d'émulateur ici!"
        //     });
        // } else {
            this._getLocationAsync();
        // }
    }


    componentDidMount(){
        
        this.getCityNameByLondLat()
    }

    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied',
            });
        }

        let location = await Location.getCurrentPositionAsync({});
        this.setState({ location });
        console.log('location' + JSON.stringify(this.state.location))

    };

    render() {
        let text = 'ATTENDS..ENCOERE';
        if (this.state.errorMessage) {
            text = this.state.errorMessage;
        } else if (this.state.location) {
            text = JSON.stringify(this.state.location);
        }

        return (
            <View>
                <Text>{text}</Text>
                <Text>La ville ici :  {this.state.city} </Text>
            </View>
        );
    }
}

// async function getLocationAsync() {
//     const { Location, Permissions } = Expo;
//     const { status } = await Permissions.askAsync(Permissions.LOCATION);
//     if (status === 'granted') {
//       return Location.getCurrentPositionAsync({enableHighAccuracy: true});
//     } else {
//       throw new Error('Location permission not granted');
//     }
//   }
