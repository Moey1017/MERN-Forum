import React, { Component } from 'react';
import UserTableRow from './UserTableRow';
export default class UserTable extends Component 
{
    constructor(props) 
    {
        super(props);
        this.state = {users: this.props.users};    
    }


    render() 
    {
        return (
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Access Level</th>
                      <th>Created Date</th>
                      <th>Last Logged In</th>
                      <th>&nbsp;</th>
                    </tr>
                  </thead>
                  
                  <tbody>
                    {this.props.users.map((user) => <UserTableRow key={user._id} user={user}/>)}
                  </tbody>
                </table>      
               );
    }
}/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


