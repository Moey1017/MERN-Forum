import React, { Component } from "react";
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import axios from 'axios';
import CommentTable from './CommentTable';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

export default class ViewPost extends Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            title: '',
            content: '',
            author: '',
            date: '',
            authorId: '',
            comments: []
        }
        setTimeout(() => {
            axios.get('http://localhost:4000/posts/get_post/' + this.props.match.params.id, )
                    .then(res => {
                        this.setState({
                            title: res.data.title,
                            content: res.data.content,
                            author: res.data.author,
                            date: res.data.date,
                            authorId: res.data.authorId,
                            comments: res.data.comments
                        });
                    })
                    .catch(error => console.log(error))
        }, 200);

        // for redirecting to this current post from editting or adding comment 
        sessionStorage.currentPostId = this.props.match.params.id;
    }

    render()
    {
        let authorId = sessionStorage.getItem('authorId');
        let accessLevel = sessionStorage.getItem('accessLevel');
        let postId = sessionStorage.getItem('currentPostId');
        let sessionName = sessionStorage.getItem('userName');
        let addComment = "";
        let editable = '';
        let deletable = '';
        let displayUserName = '';
        let logOut = '';
        let adminPage = '';
        if(sessionStorage.accessLevel === "1")
        {
            adminPage = <Navbar.Brand><Link className="logOut_button" to={"/DisplayAllUsers"}>Admin Page</Link></Navbar.Brand>
        }
        if (sessionStorage.accessLevel === "1" || sessionStorage.accessLevel === "2")
        {
            addComment = <div className="add-new-car">
                <Link className="blue-button" to={"/AddComment/" + this.props.match.params.id}>Add New Comment</Link>
            </div>;
        } else
        {
            addComment = <div className="add-new-car">
                <Link className="blue-button" to={"/Login"}>Add New Comment</Link>
            </div>;
        }

        if (authorId === this.state.authorId)
        {
            editable = <Link className="green-button" to={"/EditPost/" + postId}>
            Edit
            </Link>;
        }
        if (authorId === this.state.authorId || accessLevel === '1')
        {
            deletable = <Link className="red-button" to={"/DeletePost/" + postId}>
            Delete
            </Link>;
        }
        
        if(sessionStorage.name !== "undefined" && sessionStorage.loggedIn === "true")
        {
            displayUserName = <div className="userName">Hi {sessionName}</div>
            logOut = <Navbar.Brand><Link className="logOut_button" to={"/Logout"}>Log Out</Link></Navbar.Brand> 
        }
        else
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
                            <Navbar.Brand><Link className="toHome" to={"/"}>Post</Link></Navbar.Brand>
                            {adminPage}
                            {logOut}
                        </Nav>
                    </Navbar>
                    <div className="comment_header">
                        <div className="post_table_row">
                            <div className="post_table_row_header"><span className="icon_border"><img src="https://image.flaticon.com/icons/png/512/14/14558.png" alt="chat_icon"/></span></div>
                            <div className="post_table_row_title"><Link className="post_table_row" to={"/ViewPost/" + postId}>{this.state.title}</Link></div>
                            <span className="user_icon"><img src="https://simpleicon.com/wp-content/uploads/user1-256x256.png" alt="user_icon"/></span>
                            <div className="post_table_row_footer">
                                <div className="edit_delete">{editable} {deletable}</div>
                                <ul>
                                    <li>By {this.state.author}</li>
                                    <li>{this.state.date}</li>
                                </ul>
                            </div>
                        </div>
                        <div className="post_content">{this.state.content}</div>
                    </div>    
                    <div className="comment_contents">
                        <CommentTable comments={this.state.comments} />
                    </div>
                                    {addComment}
                </div>
                );
    }
}