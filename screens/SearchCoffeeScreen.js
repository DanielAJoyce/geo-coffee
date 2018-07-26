import React, {Component} from 'react';
import {View, Text, Button,FlatList, AsyncStorage, TouchableHighlight, Dimensions} from 'react-native';
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

    // Texthandler for searching
    changeSearchText = (text) => {
        this.setState({
            searchText:text
        }, () => {
            if(text.length > 1){
                this.searchForCoffee();
            }
        });
        
    }

    // Logout button functionality. 
    // To be changed to firebase auth.
        _signOutAsync = async () => {
            await AsyncStorage.clear();
            this.props.navigation.navigate('Splash');
          };

          // When geolocation works, will set lat&long
          getPosSuccess = (pos) => {
            var crd = pos.coords;

            this.setState({
                latitude: crd.latitude,
                longitude: crd.longitude
            });  
        }
        getPosFail = (error) => {
            console.log(error);
        }

        componentDidMount = () => {
            navigator.geolocation.getCurrentPosition(this.getPosSuccess, this.getPosFail, geoConfigOptions);
        }

        searchForCoffee = () => {

                /* Call: https://maps.googleapis.com/maps/
    api/place/nearbysearch/json?
    location=55.9663382,-3.1688961&radius=1500
    &type=cafe&keyword=costa
    &key=AIzaSyCR99smLDctHmYVIRUBk8BjQfHAFe1vU3M
    */

        var axiosUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${this.state.latitude},${this.state.longitude}&radius=${apiDetails.radius}&type=cafe&keyword=${this.state.searchText}&key=${apiDetails.key}`;

                axios.get(axiosUrl).then((response) => {
                    console.log(response);
                    let searchResults = [];
                    for(var x = 0; x < response.data.results.length; x++){
                        console.log("---LOG HERE --- RESPONSE DATA ---")
                        console.log(response.data.results[x]);
                        console.log(response.data.results[x].opening_hours.open_now);
                        searchResults.push(response.data.results[x]);
                    }
                    this.setState({
                        results:searchResults
                    },() => {
                        console.log(this.state.results);
                    });

                  })
                  .catch(function (error) {
                    console.log(error);
                  });
        }
    render(){

        let searchResultList = null;

        if(this.state.results.length > 0){ 
            //Flat List
            
            searchResultList = (            
            <FlatList 
                style={{height:Dimensions.get('window').height - 200}}
            data={this.state.results}
            keyExtractor={item => item.place_id}
            renderItem={({item}) => (
                
                <TouchableHighlight 
                style={{marginTop:5,marginBottom:10}}
                onPress={() => this.props.navigation.navigate('Details',
                {
                  name:item.name,
                  openNow:item.opening_hours.open_now,
                  place_id:item.place_id,
                  vicinity:item.vicinity
                })}>
                <View style={{height:60, borderRadius:5, width:200, backgroundColor: item.opening_hours.open_now ? "greenyellow" : "red"}}>
                    <Text>{item.name}</Text>
                    <Text style={{color:'#b7b7b7'}}>{item.vicinity}</Text>
                    <Text>{item.opening_hours.open_now ? 'Open' : 'closed'}</Text>
                </View>
                </TouchableHighlight>
            )}>
            
            </FlatList>)

        }
        return(
            <View>
                <Text>SearchScreen</Text>
                 <FormInput
                value={this.state.searchText}
                onChangeText={(text) => this.changeSearchText(text)}
                placeholder={"Search Coffee places..."}>
                </FormInput>
                    {searchResultList}
                <Button
                title="logout"
                onPress={this._signOutAsync}>
                </Button>
            </View>
        )
    }
}