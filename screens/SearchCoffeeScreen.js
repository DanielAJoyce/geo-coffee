import React, {Component} from 'react';
import {View, Text, Button, AsyncStorage} from 'react-native';

export default class SearchCoffeeScreen extends Component{
        
        _signOutAsync = async () => {
            await AsyncStorage.clear();
            this.props.navigation.navigate('Splash');
          };

    componentDidMount(){

        // Do API Call here.

    }
    render(){
        return(
            <View>
                <Text>SearchScreen</Text>
                <Button
                title="logout"
                onPress={this._signOutAsync}>
                </Button>
            </View>
        )
    }
}