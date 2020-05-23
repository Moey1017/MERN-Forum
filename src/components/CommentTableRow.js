import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class CommentTableRow extends Component
{
    render()
    {
        let authorId = sessionStorage.getItem('authorId');
        let accessLevel = sessionStorage.getItem('accessLevel');
        let editable = '';
        let deletable ='';
        if(authorId === this.props.comment.authorId)
        {
            editable = <Link className="green-button" to={"/EditComment/" + this.props.comment._id}>
                        Edit
                        </Link>;
        }
        if(authorId === this.props.comment.authorId || accessLevel === '1')
        {
            deletable = <Link className="red-button" to={"/DeleteComment/" + this.props.comment._id}>
                        Delete
                        </Link> ;
        }
        return (
                 <div className="post_table_row">
                    <div className="commnet_table_row_content">{this.props.comment.content}</div>
                    <span className="user_icon"><img src="https://simpleicon.com/wp-content/uploads/user1-256x256.png" alt="user_icon"/></span>
                    <div className="post_table_row_footer">
                        <div className="edit_delete">{editable} {deletable}</div>
                        <ul>
                            <li>By {this.props.comment.author}</li>
                            <li>{this.props.comment.date}</li>
                        </ul>
                    </div>
                </div>

                );
    }
}