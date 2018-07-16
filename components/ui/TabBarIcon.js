import React, {Component} from 'react';
import {Icon} from 'expo'

export default class TabBarIcon extends Component{
    render(){
        return (
            <Icon.Ionicons
            name={this.props.name}
            size={this.props.size || 26}
            style={{marginBottom:-3}}
            color={this.props.focused ? 'red' : 'blue'}
            />
        )
    }
}