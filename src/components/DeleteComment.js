import React, { Component } from "react";
import axios from 'axios';

export default class DeleteComment extends Component 
{
    constructor(props) 
    {
        super(props);

        let postId = sessionStorage.getItem('currentPostId');
        setTimeout(() => {axios.delete('http://localhost:4000/posts/delete_comment/' + this.props.match.params.id)
             .then(res => this.props.history.push('/ViewPost/' + postId))
             .catch(error => console.log(error))},200);
    }
  
  
    render() 
    {
        return (<div></div>);
    }
}
