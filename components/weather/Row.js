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
        const { height, width } = Dimensions.get('window')
        this.state = {
            widthScreen: width,
            heightScreen: height,
            city: this.props.city
        }
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

    icon(widthI = 50, heightI = 50) {
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

    iconFirst(widthI, heightI) {
        const type = this.props.day.weather[0].main.toLowerCase()
        let image
        switch (type) {
            case 'clear':
                image = require('../../images/png/first/sunnyfirst.png')
                break;
            case 'rain':
                image = require('../../images/png/first/rainyfirst.png')
                break;
            case 'snow':
                image = require('../../images/png/first/snowfirst.png')
                break;
            case 'clouds':
                image = require('../../images/png/first/cloudyfirst.png')
                break;

            default:
                break;
        }
        return (
            <Image source={image} style={{ width: widthI, height: heightI, justifyContent: 'space-between' }} />
        )
    }

    background() {
        const type = this.props.day.weather[0].main.toLowerCase()
        let image
        switch (type) {
            case 'clear':
                color = '#b3d9ff'
                break;
            case 'rain':
                color = 'grey'
                break;
            case 'snow':
                color = '#e6e6e6'
                break;
            case 'clouds':
                color = 'lightgrey'
                break;

            default:
                break;
        }
        return (
            { backgroundColor: color }
        )
    }

    render() {
        // Meteo instantanée ici
        if (this.props.index === 0) {
            return (
                <Effects delay={this.props.index * 50}>
                    <View style={this.background()}>
                        {this.iconFirst(widthI = this.state.widthScreen, heightI = this.state.heightScreen / 1.4)}
                        <View style={[style.first, { position: 'absolute', top: 0, left: 0, flex: 1, flexDirection: 'column' }]}>
                            <Text style={style.city}>
                                 {this.state.city}
                            </Text>
                            <Text style={[style.day]}>
                                {this.day()} {this.date()}
                            </Text>
                            <Text style={[style.temp]}>
                                {Math.round(this.props.day.main.temp - 273.15)} °
                            </Text>
                            <Text style={[style.hour]}>
                                {this.hour()}
                            </Text>
                        </View>
                        <View style={[style.bottomInfo, { position: 'absolute', bottom: 0, left: 0, flex: 1, flexDirection: 'row' }]}>
                            <Image source={require('../../images/hygrometer.png')} style={{ width: 18, height: 18, justifyContent: 'space-between' }} />
                            <Text style={[style.bottomPolice, { marginHorizontal: 20 }]}>{this.props.day.main.humidity}</Text>
                            <Image source={require('../../images/wind3.png')} style={{ width: 18, height: 18, justifyContent: 'space-between' }} />
                            <Text style={[style.bottomPolice, { marginHorizontal: 20 }]}>{this.props.day.wind.speed}</Text>
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
                            <View style={[{ justifyContent: 'space-between' }, style.icon]}>
                                {this.icon()}
                            </View>
                            <Text style={style.temp2}>
                                {Math.round(this.props.day.main.temp - 273.15)} °
                            </Text>

                        </View>


                    </View>
                </Effects>
            )
        }
    }
}

const style = StyleSheet.create({
    background: {
        backgroundColor: 'skyblue'
    },
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
        paddingVertical: 20,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    first: {
        // fontSize: 30,
        marginLeft: 50,
        borderWidth: 0,
        // borderBottomWidth: 1,
        // borderBottomColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 20,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    temp: {
        marginLeft: '28%',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 65
    },
    temp2: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 28
    },
    day: {
        marginTop: '42%',
        marginLeft: '27%',
        color: 'white',
        fontWeight: 'normal',
        fontSize: 20
    },
    hour: {
        marginLeft: '12%',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20
    },
    bottomInfo: {
        paddingHorizontal: '25%',
        paddingVertical: '5%'
    },
    bottomPolice: {
        color: 'white',
        fontSize: 18

    },
    city: {
        marginLeft: '5%',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 30
    }

})