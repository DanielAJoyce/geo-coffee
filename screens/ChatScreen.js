import React, {Component} from 'react';
import {AsyncStorage, FlatList, Dimensions, View, Text, StyleSheet, TouchableHighlight} from 'react-native';
import {FormInput} from 'react-native-elements';

export default class ChatScreen extends Component{
    constructor(props){
        super(props);
        this.state ={ 
            text:' ',
            messages:[],
            isLoading:false,
            author:''
        }
    }

    componentDidMount = () => {
        console.log(Dimensions.get('window').width - 100);
        this.grabMessages();

        this._retrieveData();
    }


    _retrieveData = async() => {
        try{
            const username = await AsyncStorage.getItem("username");
            if(username !== null){
                console.log(username);
                this.setState({
                    author:username
                });
            }
        }catch(error){
            console.log(error);
        }
        
    }
    grabMessages = () => { 
        let messages = require("../fakeChat.json");
        messages = messages.chat;

        let messageArray = [];
        messages.forEach(function(message){
            messageArray.push(message);
        });

        this.setState({
            messages:messageArray
        })
        console.log(messages);
        console.log("grabbed messages");
    }

    changeText = (text) => {
        this.setState({
            text:text
        })
    };



    sendMessage = () => {
        if(this.state.text.length > 0){
            let idArray = [];
            
        for(let x = 0; x<12;x++){
            idArray.push(Math.floor((Math.random() * 10) + 1));
        }

        let messageId = idArray.join('');

        let message = {
            id:messageId,
            messageText:this.state.text,
            author:this.state.author
        };

        let messageArray = this.state.messages;
        messageArray.push(message);

        console.log(messageArray);

        this.setState({
            messages:messageArray,
            text:''
        })
        }
    }

    render(){

        let list = null;

        if(this.state.messages.length > 0){
            list = <FlatList
                    extraData={this.state.messages.length}
                    data={this.state.messages}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => (
                        <View>
                            <Text>{item.messageText} by {item.author}</Text>
                            </View>
                    )}>
                    </FlatList>
        }

        return(
            <View style={styles.screenStyle}>
                <View style={styles.chatWindow}>
                    {list}
                </View>
                <View style={styles.inputArea}>
                <FormInput
                containerStyle={styles.formInput}
                onChangeText={(text) => this.changeText(text)}
                value={this.state.text}
                placeholder={"Something funny..."}/>
                <TouchableHighlight onPress={this.sendMessage}>
                <View style={styles.sendButton}>
                        <Text style={{color:'white', textAlign:'center', textAlignVertical:'center'}}>Send</Text>
                </View>
                </TouchableHighlight>
                    
                </View>
                
            </View>
        )
    }
}

const styles = StyleSheet.create({

     screenStyle:{
         flex:1,
         flexDirection:'column'
     },
    chatWindow:{
        height:Dimensions.get('window').height - 200,
        width:Dimensions.get('window').width,
        backgroundColor:'green',
        marginBottom:10

    },
    formInput:{
        width:Dimensions.get('window').width - 100
    },
    sendButton:{
        height:50,
        width:50,
        backgroundColor:'blue'
    },

    inputArea:{
        flex:1,
        flexDirection:'row'
    }
})
