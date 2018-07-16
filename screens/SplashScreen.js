import React, {Component} from 'react';
import {View, Text, Button} from 'react-native';
import {Video} from 'expo';


export default class SplashScreen extends Component{


    doSomething = () => {
        console.log("button pressed");
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
                onPress={() => this.doSomething}
                ></Button>
            </View>
        )
    }
}