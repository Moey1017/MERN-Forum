import React, { Component } from 'react';
import PostTableRow from './PostTableRow';
export default class PostTable extends Component 
{
    constructor(props) 
    {
        super(props);
        this.state = {posts: this.props.posts};    
    }


    render() 
    {
        return (
                <div className="post_table">{this.props.posts.map((post) => <PostTableRow key={post._id} post={post}/>)}</div>
               );
    }
}/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


