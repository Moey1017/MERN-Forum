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
                    name: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                    accessLevel: 2,
                    lastLoggedIn: "",
                    createdDate: "",
                    registered: false
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
        let date = new Date();
//        let date = new Date().getDate(); //Current Date
//        let month = new Date().getMonth() + 1; //Current Month
//        let year = new Date().getFullYear(); //Current Year
//        let hours = new Date().getHours(); //Current Hours
//        let min = new Date().getMinutes(); //Current Minutes
//        let sec = new Date().getSeconds(); //Current Seconds
        this.setState({
            //Setting the value of the date time
            createdDate: date
        });
    }

    handleSubmit(e)
    {

        this.setState({wasSubmittedAtLeastOnce: true});
        const formInputsState = this.validate();

        if (Object.keys(formInputsState).every(index => formInputsState[index]))
        {

            const userObject = {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                accessLevel: this.state.accessLevel,
                createdDate: this.state.createdDate,
                lastLoggedIn: this.state.lastLoggedIn
            };

            setTimeout(() => {
                axios.post('http://localhost:4000/users/add_user', userObject)
                        .then(res => {
                            if (res.data)
                            {
                                if (res.data.errorMessage)
                                {
                                    alert(res.data.errorMessage);
                                } else
                                {
                                    console.log(`User Registered`);
                                    alert(`You have been successfully registered`);
                                }
                            } else
                            {
                                console.log(`Record not added`);
                                alert(`Something went wrong`);
                            }
                        })
            }, 200);

            e.preventDefault();
            this.setState({registered: true});
            //const {email, password, accessLevel} = this.state;
        } else // invalid inputs in form
        {
            alert('Invalid Value found.');
            e.preventDefault();
            return;
        }
    }

    validateName()
    {
        return this.state.name.length >= 3;
    }

    validateEmail()
    {
        // valid email pattern
        const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(String(this.state.email).toLowerCase());
    }

    validatePassword()
    {
        const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/;
        return pattern.test(String(this.state.password));
    }

    validateConfirmPassword()
    {
        return (this.state.password === this.state.confirmPassword);
    }

    validate()
    {
        const name = this.state.name;
        const email = this.state.email;
        const password = this.state.password;
        return {
            name: this.validateName(),
            email: this.validateEmail(),
            password: this.validatePassword(),
            confirmPassword: this.validateConfirmPassword()
        };
    }

    render()
    {
        const formInputsState = this.validate();
        const inputsAreAllValid = Object.keys(formInputsState).every(index => formInputsState[index]);
        
        let passwordRequirements = [];
        passwordRequirements.push("Notes");
        passwordRequirements.push("Password Length must more than 8.");
         passwordRequirements.push("Must contain lowercase letter.");
         passwordRequirements.push("Must contain uppercase letter.");
         passwordRequirements.push("Must contain number.");
        let displayRequirements =  <div className="notes"><ul>{passwordRequirements.map(passwordRequirements => <li>{passwordRequirements}</li>)}</ul></div>;

        let invalidName = "";
        let emailPatternNotMatch = "";
        let passwordPatternNotMatch = "";
        let passwordNotMatch = "";
        if (!this.validateName() && this.state.name.length != 0)
        {
            invalidName = "Length has be to more than 2";
        }
        if (!this.validateEmail() && this.state.email.length != 0)
        {
            emailPatternNotMatch = <div> Email doesnt not meet requirement</div>
        }

        if (this.state.password !== this.state.confirmPassword)
        {
            passwordNotMatch = <div>Password doesnt match</div>
        }

        let header = <h2 className="registrationForm_header" >Registration form</h2>
        let content = <form id="loginForm" className="registrationForm" onSubmit = {this.handleSubmit}>
            <div id="NameContainer">
                <input
                    name = "name"
                    className = {this.validateName() ? "error" : ""}
                    type = "text"
                    placeholder = "Name"
                    value = {this.state.name}
                    onChange = {this.handleChange}
                    ref = {(input) => {
                                    this.inputToFocus = input
                    }}
                    />
            </div>
            {invalidName}
            <div id="emailContainer">
                <input
                    name = "email"
                    className = {this.state.email.length > 0 && !(formInputsState.email) ? "error" : ""}
                    type = "text"
                    placeholder = "Email"
                    value = {this.state.email}
                    onChange = {this.handleChange}
                    />
            </div>
            {emailPatternNotMatch}
        
            <div id="passwordContainer">
                <input
                    name = "password"
                    className = {this.state.password.length > 0 && !(formInputsState.password) ? "error" : ""}
                    type = "password"
                    placeholder = "Password"
                    value = {this.state.password}
                    onChange = {this.handleChange}
                    />
            </div>

            <div id="passwordContainer">
                <input
                    name = "confirmPassword"
                    className = {this.state.password.length > 0 && !(formInputsState.confirmPassword) ? "error" : ""}
                    type = "password"
                    placeholder = "Confirm password"
                    value = {this.state.confirmPassword}
                    onChange = {this.handleChange}
                    />
            </div>
            {passwordNotMatch}
            {displayRequirements}
        
        
            <input 
            className="grn_btn"
                type = "submit" 
                value = "Register" 

                />
            <Link className="red_btn" to={"/DisplayAllPosts"}>
            Cancel
            </Link>
        </form>


            if (this.state.registered === true)
            {
                content = <Redirect to='/Login' />
        }

        return (
                <div className="form-container">    
                    {header}
                    {content}
                </div>
                );
    }
}