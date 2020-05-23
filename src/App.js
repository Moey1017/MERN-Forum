import React from "react";
import {Component} from 'react';
import { BrowserRouter } from "react-router-dom";
import { Switch, Route } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

//Login
import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/RegistrationForm";
import Logout from "./components/Logout";

//Post 
import AddPost from "./components/AddPost";
import EditPost from "./components/EditPost";
import DeletePost from "./components/DeletePost";
import DisplayAllPosts from "./components/DisplayAllPosts";
import ViewPost from "./components/ViewPost";
import AddComment from "./components/AddComment";
import DeleteComment from "./components/DeleteComment";
import EditComment from "./components/EditComment";

//User
import DisplayAllUsers from "./components/DisplayAllUsers";
import DeleteUser from "./components/DeleteUser";

//Private Route 
import PrivateRoute from "./components/PrivateRoute";

if (typeof sessionStorage.loggedIn === 'undefined')
{
    sessionStorage.loggedIn = 'false';
}

export default class App extends Component 
{
    render() 
    {
        return (
                <BrowserRouter>
                  <div className="App">
                    <Container>
                      <Row>
                        <Col md={12}>
                          <div className="container">
                            <Switch>
                              <Route exact path='/' component={DisplayAllPosts} />
                              <Route exact path="/AddPost" component={AddPost} />
                              <Route exact path="/EditPost/:id" component={EditPost} />
                              <Route exact path="/DeletePost/:id" component={DeletePost} />
                              <Route exact path="/ViewPost/:id" component={ViewPost} />
                              <Route exact path="/AddComment/:id" component={AddComment} />
                              <Route exact path="/DeleteComment/:id" component={DeleteComment} />
                              <Route exact path="/EditComment/:id" component={EditComment} />
                              
                              <Route exact path="/Login" component={LoginForm} />
                              <Route exact path="/Logout" component={Logout} />
                              <Route exact path="/RegistrationForm" component={RegistrationForm} />
                                      
                              <PrivateRoute exact path="/DisplayAllUsers" component={DisplayAllUsers} />
                              <PrivateRoute exact path="/DeleteUser/:id" component={DeleteUser} />
                              <Route path="*" component={DisplayAllPosts}/> 
                            </Switch>
                          </div>
                        </Col>
                      </Row>
                    </Container>
                  </div>
                </BrowserRouter>);
    }
}