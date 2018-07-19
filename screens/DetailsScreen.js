import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {geoConfigOptions} from '../googleApiConfig/mapsConfig';


export default class DetailsScreen extends Component{

    constructor(props){
        super(props);
        this.state = { 
            lattitude:'',
            longitude:''
        }
    }
    componentDidMount = () => {
        navigator.geolocation.getCurrentPosition(success, error, geoConfigOptions);
        function success(pos){
            var crd = pos.coords;

            this.setState({
                lattitude:crd.lattitude,
                longitude: crd.longitude
            });
        }

        console.log(this.state.longitude);
        console.log(this.state.lattitude);
    }
    render(){
        return(
            <View>
                <Text>DetailsScreen</Text>
                <Text></Text>
            </View>
        )
    }

}