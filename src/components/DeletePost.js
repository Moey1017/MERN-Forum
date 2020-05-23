import React, { Component } from "react";
import axios from 'axios';

export default class DeleleUser extends Component 
{
    constructor(props) 
    {
        super(props);

        setTimeout(() => {axios.delete('http://localhost:4000/posts/delete_post/' + this.props.match.params.id)
             .then(res => this.props.history.push('/DisplayAllPosts'))
             .catch(error => console.log(error))},200);
    }
  
  
    render() 
    {
        return (<div></div>);
    }
}
