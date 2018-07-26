import React, {Component} from 'react';
import {View, Text, Button, AsyncStorage, StyleSheet, Dimensions} from 'react-native';
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

        // Uses Async storage to save username locally.
        _signInAsync = async () => {
            let username = this.state.userNameText;

            if(this.state.userNameText.length > 0){
                await AsyncStorage.setItem('username', username);
                this.props.navigation.navigate('Tabs');
            }
        }

        // video component displays in the background
        // While the form is on top. See Positioning.
    render(){
        return(
            <View style={styles.container}>
                <Video
                    source={require('../assets/video/coffee.mp4')}
                    muted={true}
                    resizeMode="cover"
                    ref={(ref) => {
                        this.player = ref
                      }}  
                    repeat
                    onEnd={()=> this.player.seek(0)}
                    shouldPlay
                    style={styles.videoStyle}
                /> 

                <View style={styles.loginForm}>
                <FormInput
                value={this.state.userNameText}
                onChangeText={(text) => this.changeText(text)}
                placeholder={"Your super cool name..."}
                
                style={{backgroundColor:'white'}}>
                </FormInput>
                <Button 
                title={"Sign In"}
                onPress={this._signInAsync}
                ></Button>
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    videoStyle:{
        position:'absolute',
        height:Dimensions.get('window').height,
        width:Dimensions.get('window').width,
    },
    loginForm:{
        height:100,
        width:Dimensions.get('window').width * 0.8,
        backgroundColor:'white',
        
    }
})