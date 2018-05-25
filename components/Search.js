import React from 'react'
import { TextInput, Image, View, Button } from 'react-native'
import style from '../Style'
import { StackNavigator, createStackNavigator } from 'react-navigation';
import List from './List'

class Search extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            city: 'Paris'
        }
    }

    static navigationOptions = {
        title: 'Rechercher une ville',
        tabBarIcon: () => {
            <Image source={require('../images/search.png')}> </Image>
        }
    }

    setCity(city) {
        this.setState({ city })
    }

    submit() {
        this.props.navigation.navigate('Result', { city: this.state.city })
    }

    render() {
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
            </View>
        )
    }
}

const navigationOptions = {
    headerStyle: style.header,
    headerTitleStyle: style.headerTitle,
    headerMode: 'none',
    headerVisible: false,
    // headerMode: 'none',
    // navigationOptions: {
    //     headerVisible: false,
    // }
}

export default createStackNavigator({
    Search: { screen: Search, navigationOptions },
    Result: { screen: List, navigationOptions },
})