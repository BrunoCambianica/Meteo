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
    }

    static navigationOptions = ({ navigation }) => {
        title: `Météo / ${navigation.state.params.city}`
    }

    static navigationOptions = {
        headerTitleStyle: {
            color: 'white',
        },
        headerStyle:{ 
            position: 'absolute', 
            backgroundColor: 'transparent', 
            zIndex: 100, 
            top: 0, 
            left: 0, 
            right: 0 
        } 
    };

    // static navigationOptions = {
    //     title: `Météo / ${navigation.state.params.city}`
    //     // tabBarIcon: () => {
    //     //     <Image source={require('../images/search.png')}> </Image>
    //     // }
    // }

    // static navigationOptions = ({ navigation }) => {
    //     title: `Météo / ${navigation.state.params.city}`
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
        // à ajouter : si code 404 alors message d'erreur (recherche ville)
        // return <Text> Salut les gens de {this.state.city} </Text>
        if (this.state.report === null) {
            return (
                <ActivityIndicator size="large"  color={style.color}/>
            )
        }
        else {
            const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

            return (
                <ListView
                    dataSource={ds.cloneWithRows(this.state.report.list)}
                    renderRow={(row, j, k) => <Row day={row} index={parseInt(k, 10)} city={this.state.city} report={this.state.report} />}

                />
            )
        }

    }
}

const navigationOptions = {
    headerStyle: style.listHeader,
    headerTitleStyle: style.listHeader,
    // headerMode: 'none',
    // navigationOptions: {
    //     header: { visible: false }
    // }
}