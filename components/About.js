import React from 'react'
import { View, Text, Image, Button } from 'react-native'

import style from '../Style'

export default class About extends React.Component {

    static navigationOptions = {
        tabBarIcon: () => {
            <Image source={require('../images/about.png')}> </Image>
        }
    }

    search() {
        this.props.navigation.navigate('Search')
    }

    render() {
        return (
            <View style={style.container}>
                <Text>
                    Je suis le composant About
                </Text>
                <Button
                    color={style.color}
                    onPress={() => this.search()}
                    title='Rechercher une ville'
                />
            </View>
        )
    }
}