import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MapView from 'react-native-maps';


export default class MapScreen extends Component{
    // Will need to fix this...

    // Seems like I forgot to make some changes...
    
    constructor(props){
        super(props);
        this.state({
            latitude:'',
            longitude:'',
            results:[]
        })
    }
   
    getPosSuccess = (pos) => {
        var crd = pos.coords;

        this.setState({
            latitude: crd.latitude,
            longitude: crd.longitude
        },
    () => this.getNearbyCoffee());

        console.log("lat: " + this.state.latitude);
        console.log("long: " + this.state.longitude);
        
    }


    getPosFail = (error) => {
        console.log(error);
    }

    componentDidMount = () => {
        navigator.geolocation.getCurrentPosition(this.getPosSuccess, this.getPosFail, geoConfigOptions);
    }

    getNearbyCoffee = () => {
        var axiosUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${this.state.latitude},${this.state.longitude}&radius=${apiDetails.radius}&type=cafe&key=${apiDetails.key}`;
        axios.get(axiosUrl).then((response) => {
            console.log(response);
            let searchResults = [];
            for(var x = 0; x < response.data.results.length; x++){
                        // console.log("---LOG HERE --- RESPONSE DATA ---")
                        
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
        return(
            <View>
                <Text>MapScreen</Text>
                <MapView
                style={styles.map}
                 initialRegion={{
                    latitude: this.state.latitude,
                    longitude: this.state.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  }}>
                    </MapView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    map:{
        position:'absolute',
        top:5,
        left:5,
        right:0,
        bottom:0
    }
})