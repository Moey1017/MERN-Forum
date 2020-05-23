import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import UserTable from './UserTable';
import {Redirect} from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

export default class ListAllUsers extends Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            users: []
        };

        axios.defaults.withCredentials = true;
        // timer is needed to allow the database change to take effect before getting the results
        setTimeout(() => {
            axios.get('http://localhost:4000/users/')
                    .then(res => this.setState({users: res.data}))
                    .catch((error) => console.log(error))
        }, 200); // wait 500 milliseconds
    }

    render() {
        let content = "";
        let displayUserName = "";
        let logOut = "";
        let sessionName = sessionStorage.getItem('userName');
        let adminPage = "";
        if (sessionStorage.accessLevel === "1")
        {
            content = <UserTable users={this.state.users} />
            adminPage = <Navbar.Brand><Link className="logOut_button" to={"/DisplayAllUsers"}>Admin Page</Link></Navbar.Brand>
        } else
        {
            content = <div>Only admin allow to view.</div>
        }

        if (sessionStorage.name !== "undefined" && sessionStorage.loggedIn === "true")
        {
            displayUserName = <div className="userName">Hi {sessionName}</div>
            logOut = <Navbar.Brand><Link className="logOut_button" to={"/Logout"}>Log Out</Link></Navbar.Brand>
        } else
        {
            displayUserName = <Link className="login_button" to={"/Login"}><span className="user_login_icon"><img src="https://simpleicon.com/wp-content/uploads/user1-256x256.png" alt="user_login_icon"/></span>Login</Link>
        }
        return (
                <div className="table-container">
                    <div className="divider"></div>
                    <Navbar bg="dark" variant="dark">
                        {displayUserName}
                        <Nav className="mr-auto">
                            <Navbar.Brand><Link className="toHome" to={"/"}>Home</Link></Navbar.Brand>
                            <Navbar.Brand><Link className="toHome" to={"/"}>Posts</Link></Navbar.Brand>
                            {adminPage}
                            {logOut}
                        </Nav>
                    </Navbar>
                    {content}
                </div>
                );
    }
}