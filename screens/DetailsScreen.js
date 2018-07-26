import React, {Component} from 'react';
import {View, Text, TouchableHighlight} from 'react-native';
import {geoConfigOptions, apiDetails} from '../googleApiConfig/mapsConfig';
import axios from 'axios';

export default class DetailsScreen extends Component{

    static navigationOptions ={ 
        title:'Details'
      }


    constructor(props){
        super(props);
        this.state = { 
            placeDetails:{},
            isLoading:true
        }
    }

    componentDidMount = () => {
        const { navigation } = this.props;
        const placeId = navigation.getParam('place_id');
        const name = navigation.getParam('name');
        const vicinity = navigation.getParam('vicinity');
        this.setState({
            isLoading:false
        })
    }
    render(){
        
       let details = null;
       if(!this.state.isLoading){
           details = (
               <View>
                   <Text>{this.state.placeDetails.name}</Text>
                   <Text>{this.state.placeDetails.rating}</Text>
                   <Text>{this.state.placeDetails.website || ""}</Text>
                   <Text>{this.state.placeDetails.vicinity}</Text>
                   <Text>A lovely place for a coffee!</Text>
                   <TouchableHighlight>
                        <View style={{height:100, width:100, backgroundColor:'purple', borderRadius:5, padding:10}}>
                            <Text style={{textAlign:'center', color:'white'}}>Add to Favourites</Text>
                        </View>
                    </TouchableHighlight>
               </View>
           )
       }
        return(
            <View>
                {details}
            </View>
        )
    }

}