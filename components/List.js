import React from 'react'
import style from '../Style'
import { Text, ActivityIndicator, ListView } from 'react-native'
import axios from 'axios'
import Row from './weather/Row'

export default class List extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            city: this.props.navigation.state.params.city,
            // city: 'Paris',
            report: null
        }
        this.fetchWeather()
        console.log(this.state.city)
        console.log( 'bonjour ' + this.props.navigation.state.params.city)
    }

    // static navigationOptions = ({ navigation }) => {
    //     title: `Météo / ${navigation.state.params.city}`
    //     // title: 'Météo / Paris '
    // }

    fetchWeather() {
        axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=${this.state.city}&APPID=c054e572e539272999b9e011e63ae762`)
            .then((response) => {
                // console.log('REPONSE DE LA REQUETE ICI')
                // console.log(response.data.list)
                this.setState({
                    report: response.data
                })
            })
    }

    render() {
        // return <Text> Salut les gens de {this.state.city} </Text>

        if (this.state.report === null) {
            return (
                <ActivityIndicator color={style.color} size="large" />
            )
        }
        else {
            const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

            return (
                <ListView
                    dataSource={ds.cloneWithRows(this.state.report.list)}
                    renderRow={(row, j, k) => <Row day={row} index={parseInt(k, 10)} />}
                />
            )
        }

    }
}