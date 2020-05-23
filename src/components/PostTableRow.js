import React, { Component }
from 'react';
import { Link }
from 'react-router-dom';


export default class PostTableRow extends Component
{
    render()
    {
        let authorId = sessionStorage.getItem('authorId');
        let accessLevel = sessionStorage.getItem('accessLevel');
        let editable = '';
        let deletable = '';
        if (authorId === this.props.post.authorId)
        {
            editable = <Link className="green-button" to={"/EditPost/" + this.props.post._id}>
            Edit
            </Link>;
        }
        if (authorId === this.props.post.authorId || accessLevel === '1')
        {
            deletable = <Link className="red-button" to={"/DeletePost/" + this.props.post._id}>
            Delete
            </Link>;
        }

        return (
                <div className="post_table_row">
                    <div className="post_table_row_header"><span className="icon_border"><img src="https://image.flaticon.com/icons/png/512/14/14558.png" alt="chat_icon"/></span></div>
                    <div className="post_table_row_title"><Link className="post_table_row" to={"/ViewPost/" + this.props.post._id}>{this.props.post.title}</Link></div>
                    <span className="user_icon"><img src="https://simpleicon.com/wp-content/uploads/user1-256x256.png" alt="user_icon"/></span>
                    <div className="post_table_row_footer">
                        <div className="edit_delete">{editable} {deletable}</div>
                        <ul>
                            <li>By {this.props.post.author}</li>
                            <li>{this.props.post.date}</li>
                        </ul>
                    </div>
                </div>
                );
    }
}