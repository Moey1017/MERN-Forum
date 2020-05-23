import React, { Component } from 'react';
import CommentTableRow from './CommentTableRow';
export default class CommentTable extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {comments: this.props.comments};
    }

    render()
    {
        return (
                <div className="post_table">{this.props.comments.map((comment) => <CommentTableRow key={comment._id} comment={comment}/>)}</div>
                );
    }
}/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


