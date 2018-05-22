import React from 'react'

import { View, Text, StyleSheet, Image, Dimensions } from 'react-native'
import Effects from '../Effects'
import moment from 'moment'
import 'moment/locale/fr'
import globalStyle from '../../Style'
moment.locale('fr')
export default class Row extends React.Component {

    constructor(props) {
        super(props)
        let { width } = Dimensions.get('window')
        this.state = {
            widthScreen: width
        }
        console.log(this.state.widthScreen)
    }

    static propTypes = {
        // day: React.propTypes.object,
        // index: React.propTypes.number

    }

    day() {
        let day = moment(this.props.day.dt * 1000).format('ddd')
        return (
            <Text style={[style.white, style.bold]}>
                {day.toUpperCase()}
            </Text>
        )
    }

    date() {
        let day = moment(this.props.day.dt * 1000).format('DD/MM')
        return (
            <Text style={style.white}>
                {day}
            </Text>
        )
    }

    hour() {
        let hour = moment(this.props.day.dt * 1000).format('LT')
        return (
            <Text style={[style.white, style.hour]}>
                {hour}
            </Text>
        )
    }

    icon(widthI = 60, heightI = 60) {
        const type = this.props.day.weather[0].main.toLowerCase()
        let image
        switch (type) {
            case 'clear':
                image = require('../../images/png/sunny.png')
                break;
            case 'rain':
                image = require('../../images/png/rain.png')
                break;
            case 'snow':
                image = require('../../images/png/snow.png')
                break;
            case 'clouds':
                image = require('../../images/png/cloudy.png')
                break;

            default:
                break;
        }
        return (
            <Image source={image} style={{ width: widthI, height: heightI, justifyContent: 'space-between' }} />
        )
    }

    render() {
        if (this.props.index === 0) {
            return (
                <Effects delay={this.props.index * 50}>
                    <View style={[style.view]}>
                        {this.icon(widthI = this.state.widthScreen)}
                        <View style={[style.first, { position: 'absolute', top: 0, left: 0 }]}>
                            <Text style={style.first}>
                                {this.day()} {this.date()} {this.hour()}
                            </Text>
                            <Text style={[style.temp, style.first]}>
                                {Math.round(this.props.day.main.temp - 273.15)}  °C
                            </Text>
                        </View>

                    </View>
                </Effects>
            )
        }
        else {
            return (
                <Effects delay={this.props.index * 50}>
                    <View style={[style.view]}>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <View style={{ flex: 1, flexDirection: 'column' }}>
                                <Text>
                                    {this.day()} {this.date()}
                                </Text>
                                <Text>
                                    {this.hour()}
                                </Text>
                            </View>
                            {this.icon()}
                            <Text style={style.temp}>
                                {Math.round(this.props.day.main.temp - 273.15)}  °C
                            </Text>

                        </View>


                    </View>
                </Effects>
            )
        }
    }
}

const style = StyleSheet.create({
    hour: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    white: {
        color: 'white'
    },
    bold: {
        fontWeight: 'bold'
    },
    view: {
        backgroundColor: '#999999',
        borderWidth: 0,
        borderBottomWidth: 1,
        borderBottomColor: 'lightblue',
        paddingHorizontal: 20,
        paddingVertical: 10,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    first: {
        fontSize: 30,
        marginLeft: 50
    },
    temp: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 22
    }

})