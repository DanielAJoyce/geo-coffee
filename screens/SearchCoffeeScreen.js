import React, {Component} from 'react';
import {View, Text, Button, AsyncStorage} from 'react-native';
import {FormInput, List} from 'react-native-elements';
import {geoConfigOptions, apiDetails} from '../googleApiConfig/mapsConfig';
import axios from 'axios';

export default class SearchCoffeeScreen extends Component{

    
    /* 
    Google Places API.

    
    Input : Whatever they type in.
    key: apiDetails.key
    inputtype:textquery
    Type : cafe
    - cafe  
    - bakery ? probably not.
    circular: circle:radius@lat,lng
    

    Call: https://maps.googleapis.com/maps/
    api/place/nearbysearch/json?
    location=55.9663382,-3.1688961&radius=1500
    &type=cafe&keyword=costa
    &key=AIzaSyCR99smLDctHmYVIRUBk8BjQfHAFe1vU3M
    */

    constructor(props){
        super(props);
        this.state = { 
            latitude:'',
            longitude:'',
            searchText:'',
            results:[],
            isLoading:false
        }
    }


    changeSearchText = (text) => {
        this.setState({
            searchText:text
        }, () => {
            if(text.length > 1){
                this.searchForCoffee();
            }
        });
        
    }
        _signOutAsync = async () => {
            await AsyncStorage.clear();
            this.props.navigation.navigate('Splash');
          };


          getPosSuccess = (pos) => {
            var crd = pos.coords;

            this.setState({
                latitude: crd.latitude,
                longitude: crd.longitude
            });

            console.log("lat: " + this.state.latitude);
            console.log("long: " + this.state.longitude);
            
        }
        getPosFail = (error) => {
            console.log(error);
        }

        componentDidMount = () => {
            navigator.geolocation.getCurrentPosition(this.getPosSuccess, this.getPosFail, geoConfigOptions);
        }

        searchForCoffee = () => {
            if(this.state.searchText.length > 1){

                /* Call: https://maps.googleapis.com/maps/
    api/place/nearbysearch/json?
    location=55.9663382,-3.1688961&radius=1500
    &type=cafe&keyword=costa
    &key=AIzaSyCR99smLDctHmYVIRUBk8BjQfHAFe1vU3M
    */

        var axiosUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${this.state.latitude},${this.state.longitude}&radius=${apiDetails.radius}&type=cafe&keyword=${this.state.searchText}&key=${apiDetails.key}`;

                axios.get(axiosUrl).then(function (response) {
                    console.log(response);
                    let searchResults = [];
                    for(var x = 0; x < response.data.length; x++){
                        searchResults.push(response.data[x]);
                    }

                    this.setState({
                        results:searchResults
                    })
                  })
                  .catch(function (error) {
                    console.log(error);
                  });

            }else{
                console.log("searchText not long enough.");
            }
        }
    render(){

        let searchResultList = null;

        // if(results.length > 0){ 
        //     //Flat List
        //     searchResultList = (
            
        //     <FlatList 
        //     data={this.state.results}
        //     keyExtractor={item=> item.id}
        //     renderItem={({item}) => (
        //         <Text>item.name</Text>
        //     )}>
            
        //     </FlatList>)

        // }
        return(
            <View>
                <Text>SearchScreen</Text>
                 <FormInput
                value={this.state.searchText}
                onChangeText={(text) => this.changeSearchText(text)}
                placeholder={"Search Coffee places..."}>
                </FormInput>
            
                <Button
                title="logout"
                onPress={this._signOutAsync}>
                </Button>
            </View>
        )
    }
}