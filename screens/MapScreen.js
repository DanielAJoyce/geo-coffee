import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions, Modal} from 'react-native';
import MapView from 'react-native-maps';
import {geoConfigOptions, apiDetails} from '../googleApiConfig/mapsConfig';
import axios from 'axios';


export default class MapScreen extends Component{

    constructor(props){
        super(props);
        this.state = {
            initalRegion:null,
            modalVisible: false,
            modalDetails: null,
            region: {
                latitude:null,
                longitude:null,
                latitudeDelta:0.02,
                longitudeDelta:0.02
            },
            results:[],
            isLoading:true
        }
    }
    setModalVisible = (visible) => {
        this.setState({modalVisible: visible});
      }

    getPosSuccess = (pos) => {
        var crd = pos.coords;
        var region = {
            latitude:crd.latitude,
            longitude:crd.longitude,
            latitudeDelta:0.02,
            longitudeDelta:0.02
        }
        if(this.state.initalRegion == null){
            this.setState({
                initialRegion:region,
                region:region
            });
        }
        this.getNearbyCoffee();
    }

    getPosFail = (error) => {
        console.log(error);
    }

    componentDidMount = () => {
        navigator.geolocation.getCurrentPosition(this.getPosSuccess, this.getPosFail, geoConfigOptions);
    }

    getNearbyCoffee = () => {
        var axiosUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${this.state.region.latitude},${this.state.region.longitude}&radius=${apiDetails.radius}&type=cafe&key=${apiDetails.key}`;
        axios.get(axiosUrl).then((response) => {
            console.log("map response:");
            console.log(response.data.results[0].geometry.location);
            let searchResults = [];
            for(var x = 0; x < response.data.results.length; x++){
                        // console.log("---LOG HERE --- RESPONSE DATA ---")
                        
                searchResults.push(response.data.results[x]);
                }
            this.setState({
                results:searchResults,
                isLoading:false
                });
                  })
                  .catch(function (error) {
                    console.log(error);
        });
    }
    onRegionChange = (region) => {
        var oldRegion = this.state.region;
        this.setState({
            region:region
        })
    }

    render(){
        let map = null;
        if(this.state.isLoading){
        return (<Text>Loading...</Text>);
        }else{
            return (
                <View>
                    <MapView
                    style={styles.map}
                    initialRegion={this.state.initialRegion}
                    region={this.state.region}
                    showsUserLocation={true}
            >
            {this.state.results.map(marker => {
           return (
           <MapView.Marker 
            key={marker.place_id}
            title={marker.name}
            coordinate={{
                 latitude:marker.geometry.location.lat,
                 longitude:marker.geometry.location.lng}}
            description={"A place that is nice."}
             onPress={() => this.setModalVisible(marker)}
            // {
            //   name:marker.name,
            //   openNow:marker.opening_hours.open_now,
            //   icon:marker.photos[0],
            //   placeId:marker.place_id,
            //   vicinity:marker.vicinity
            // })}
            />

           )})}
            </MapView>
            <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              alert('Modal has been closed.');
            }}>
            
            <Text>
                Example
            </Text>

            </Modal>


            </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    map:{
        position:'absolute',
        top:5,
        left:5,
        right:0,
        bottom:0,
        height:Dimensions.get('window').height,
        width:Dimensions.get('window').width
    }
})