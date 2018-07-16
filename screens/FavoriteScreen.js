import React, {Component} from 'react';
import {View, Text} from 'react-native';

export default class FavoriteScreen extends Component{
    constructor(props){
        super(props);
        state = {
            favorites:[],
        }
    }

    render(){
        return(
            <View>
                <Text>FavoriteScreen</Text>
            </View>
        )
    }

}