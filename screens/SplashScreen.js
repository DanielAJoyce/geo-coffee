import React, {Component} from 'react';
import {View, Text, Button, AsyncStorage} from 'react-native';
import {Video} from 'expo';
import {FormInput} from 'react-native-elements';

export default class SplashScreen extends Component{
constructor(props){
    super(props);
    this.state ={ 
        userNameText:''
    }
}

changeText = (text) => {
    this.setState({
        userNameText:text
    });
}
        _signInAsync = async () => {
            console.log("hihi");

            let username = this.state.userNameText;

            if(this.state.userNameText.length > 0){
                await AsyncStorage.setItem('username', username);
                this.props.navigation.navigate('Tabs');
            }
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
                <FormInput
                value={this.state.userNameText}
                onChangeText={(text) => this.changeText(text)}
                placeholder={"Your super cool name..."}>

                </FormInput>
                <Button 
                title={"Sign In"}
                onPress={this._signInAsync}
                ></Button>
            </View>
        )
    }
}