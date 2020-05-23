import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class UserTableRow extends Component
{
    render()
    {
        return (
                <tr>
                    <td>{this.props.user.name}</td>
                    <td>{this.props.user.email}</td>
                    <td>{this.props.user.accessLevel}</td>
                    <td>{this.props.user.createdDate}</td>
                    <td>{this.props.user.lastLoggedIn}</td>
                    <td>         
                        <Link className="delete_user_button" to={"/DeleteUser/" + this.props.user._id}>
                        Delete
                        </Link>                     
                    </td>
                </tr>
                );
    }
}