import React, { Component } from "react";
import axios from 'axios';

export default class DeleteUser extends Component 
{
    constructor(props) 
    {
        super(props);
        axios.defaults.withCredentials = true;
        setTimeout(() => {axios.delete('http://localhost:4000/users/delete_user/' + this.props.match.params.id)
             .then(res => this.props.history.push('/DisplayAllUsers'))
             .catch(error => console.log(error))},200);
    }
  
  
    render() 
    {
        return (<div></div>);
    }
}
