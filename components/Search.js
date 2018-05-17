import React from 'react'
import { TextInput } from 'react-native'

export default class Search extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            city : 'Paris'
        }
    }

    setCity(city){
        this.setState({city})
    }

    render() {
        return (
            <TextInput
                underlineColorAndroid='transparent'
                style={{height: 40, borderColor: 'green', borderWidth: 1}}
                value={this.state.city}
                onChangeText={(text) => this.setCity(text)}
            />
        )
    }
}