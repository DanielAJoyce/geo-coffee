import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {geoConfigOptions} from '../googleApiConfig/mapsConfig';


export default class DetailsScreen extends Component{

    static navigationOptions ={ 
        title:'Details Page'
      }


    constructor(props){
        super(props);
        // this.state = { 
        //     lattitude:'',
        //     longitude:''
        // }
    }

    
    render(){

        const {navigation} = this.props;
        const name = navigation.getParam('name');
        const vicinity = navigation.getParam('vicinity');


        return(
            <View>
                <Text>Details! </Text>
                <Text>{name}</Text>
                <Text>{vicinity}</Text>
            </View>
        )
    }

}