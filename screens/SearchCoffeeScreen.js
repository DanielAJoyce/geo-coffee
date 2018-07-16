import React, {Component} from 'react';


export default class SearchCoffeeScreen extends Component{
    constructor(props){
        super(props);
        state = {
            searchText:'',
            coffeePlaces:{},
        }
    }
    componentDidMount(){

        // Do API Call here.

    }
    render(){
        return(
            <View>
                <Text>SearchScreen</Text>
            </View>
        )
    }
}