import React, {Component} from 'react';
import {View, Text, Button, AsyncStorage} from 'react-native';
import {Video} from 'expo';


export default class SplashScreen extends Component{


        _signInAsync = async () => {
            console.log("hihi");
            await AsyncStorage.setItem('userToken', 'abc');
            this.props.navigation.navigate('Tabs');
    }

    render(){
        return(
            <View>
                <Video
                    source={require('../assets/video/coffee.mp4')}
                    muted={true}
                    resizeMode="cover"
                    repeat={true}
                    shouldPlay
                    style={{ width:500, height: 500 }}
                /> 

                <Button 
                title={"Sign In"}
                onPress={this._signInAsync}
                ></Button>
            </View>
        )
    }
}