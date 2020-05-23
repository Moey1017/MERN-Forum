import React, { Component } from "react";
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class LoginForm extends Component
{
    constructor()
    {
        super();
        this.state =
                {
                    email: "",
                    password: "",
                    loggedIn: false,
                    accessLevel: ""
                };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount()
    {
        this.inputToFocus.focus();
    }

    handleChange(e)
    {
        this.setState({[e.target.name]: e.target.value});
    }

    handleSubmit(e)
    {
        this.setState({wasSubmittedAtLeastOnce: true});
        const formInputsState = this.validate();

        setTimeout(() => {axios.put('http://localhost:4000/users/get_user_login', {email: this.state.email, password: this.state.password})
                .then(res => {
                    if(res.data)
                    {
                        if (res.data.valid === 'true')
                            {
                                sessionStorage.loggedIn = 'true';
                                this.setState({loggedIn: true}); 
                                sessionStorage.accessLevel = res.data.accessLevel;
                                sessionStorage.userName = res.data.name;
                                sessionStorage.email = res.data.email;
                                sessionStorage.authorId = res.data.authorId;
                                localStorage.setItem('everLoggedIn', true);
                            }
                            else
                            {
                                alert(`Credentitial Incorrect.`);
                                this.props.history.push('/Login');
                            }
                    }
                    else
                    {
                        alert(`Credentitial Incorrect.`);
                        this.props.history.push('/Login');
                    }   
                }, ((error) => console.log(error)))},200);
        e.preventDefault();
    }

    validateEmail()
    {
        // valid email pattern
        const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(String(this.state.email).toLowerCase());
    }

    validate()
    {
        const email = this.state.email;
        const password = this.state.password;
        return {
            email: this.validateEmail()
        };
    }

    render()
    {
        const formInputsState = this.validate();
        const inputsAreAllValid = Object.keys(formInputsState).every(index => formInputsState[index]);

        let emailPatternNotMatch = "";
        if (!this.validateEmail() && this.state.email.length != 0)
        {
            emailPatternNotMatch = <div> Email doesnt not meet requirement</div>
        }
        

        let header = <h2 className="login_form_header">Login Form</h2>
        let content =
                <form id="loginForm" className="loginForm_container" onSubmit = {this.handleSubmit} required>
                    <div id="emailContainer">
                        <input
                            name = "email"
                            className = {this.state.email.length > 0 && !(formInputsState.email) ? "error" : ""}
                            type = "text"
                            placeholder = "Email"
                            value = {this.state.email}
                            onChange = {this.handleChange}
                            ref = {(input) => {
                                    this.inputToFocus = input
                            }}
                            />
                    </div>
                    {emailPatternNotMatch}
                
                    <div id="passwordContainer" required>
                        <input
                            name = "password"
                            className = ""
                            type = "password"
                            placeholder = "Password"
                            value = {this.state.password}
                            onChange = {this.handleChange}
                            />
                    </div>
                    
                <div><Link className="register_account" to={"/RegistrationForm"}>Register Account</Link></div>
                
                    <input 
                        className="grn_btn"
                        type = "submit" 
                        value = "Login" 
                        disabled = {!inputsAreAllValid}
                        />
                        <Link className="red_btn" to={"/DisplayAllPosts"}>Cancel</Link>
                </form>

            if (this.state.loggedIn === true)
            {
                content = <Redirect to='/DisplayAllPosts' />
        }

        return (
                <div className="form-container">       
                    {header}
                    {content}
                </div>
                );
    }
}