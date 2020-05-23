import React, {Component} from "react";
import Form from 'react-bootstrap/Form';
import {Redirect} from 'react-router-dom';
import { Link } from 'react-router-dom';


export default class Logout extends Component
{
    constructor(props)
    {
        super(props)
        this.state = ({loggedIn: true});
    }

    handleSubmit = (e) =>
    {
        e.preventDefault();
        sessionStorage.clear();
        sessionStorage.loggedIn = 'false';
        this.setState({loggedIn: false});
    }

    render()
    {
        let content =
                <Form onSubmit={this.handleSubmit}>
                    <div className="logOut_button" onClick={this.handleSubmit}>
                    <p>Yes</p>
                    </div>
                </Form>


        if (this.state.loggedIn === false)
        {
            content = <Redirect to='/DisplayAllPosts' />
        }

        return (
                <div className="form-container">    
                    <div className="logOut">
                        <div className="logOut_header"><p>Do you sure you want to log out?</p></div>
                        <div className="logOut_body">
                            {content}
                            <div className="return_back"><Link to={"/DisplayAllPosts"}><p>No</p></Link></div>
                        </div>
                    </div>
                </div>
                );
    }
}