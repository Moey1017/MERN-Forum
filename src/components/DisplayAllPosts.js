import React, { Component } from 'react';
import "../App.css";
import Carousel from 'react-bootstrap/Carousel';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PostTable from './PostTable';


export default class Landing extends Component {
    constructor(props)
    {
        super(props)
        this.state = {
            posts: []
        };

        // timer is needed to allow the database change to take effect before getting the results
        setTimeout(() => {
            axios.get('http://localhost:4000/posts/')
                    .then(res => this.setState({posts: res.data}))
                    .catch((error) => console.log(error))
        }, 200);
        
    }
    render()
    {
        let everLoggedIn = localStorage.getItem('everLoggedIn');
        let sessionName = sessionStorage.getItem('userName');
        let addPost = "";
        let displayUserName = "";
        let logOut = "";
        let adminPage ="";
        if(sessionStorage.accessLevel === "1")
        {
            adminPage = <Navbar.Brand><Link className="logOut_button" to={"/DisplayAllUsers"}>Admin Page</Link></Navbar.Brand>;
        }
        if (sessionStorage.accessLevel === "1" || sessionStorage.accessLevel === "2")
        {
            addPost = <div className="add_new_post">
                <Link className="add_post_btn" to={"/AddPost"}><h5>Add New Post</h5></Link>
            </div>;
        } else
        {
            if(everLoggedIn == 'true')
            {
                addPost = <div className="add_new_post">
            <Link className="add_post_btn" to={"/Login"}><h5>Add New Post</h5></Link>
            </div>;
            }
            else
            {
               addPost = <div className="add_new_post">
            <Link className="add_post_btn" to={"/RegistrationForm"}><h5>Add New Post</h5></Link>
            </div>; 
            }
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
        return(
                <div className="content">
                    <div className="header"><img src="https://di.community/di_custom/images/games/icons/pubg.png" alt="header_image"/></div>
                    <Navbar bg="dark" variant="dark">
                    {displayUserName}
                        <Nav className="mr-auto">
                            <Navbar.Brand><Link className="toHome" to={"/"}>Home</Link></Navbar.Brand>
                            <Navbar.Brand href="#posts">Posts</Navbar.Brand>
                            {adminPage}
                            {logOut}
                        </Nav>
                    </Navbar>
                    <Carousel>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="https://static.techspot.com/images2/news/bigimage/2019/04/2019-04-13-image-7.jpg"
                                alt="First slide"
                                />
                            <Carousel.Caption>
                                <h3>SEASON 6 NOW</h3>
                                <p>Discover Karakin: New Map Available Now.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="https://images.wallpapersden.com/image/download/pubg-2020_68648_1920x1080.jpg"
                                alt="Third slide"
                                />
                
                            <Carousel.Caption>
                                <h3>PARTY LIKE NEVER BEFORE – CONSOLE CROSS-PARTY PLAY IS COMING!</h3>
                                <p>Hey everyone, Last year, we introduced Cross-Platform Play for PUBG on Xbox One and PlayStation 4, which allowed players from each platform to be matched into the same matchmaking pool.…</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="https://www.eneba.com/blog/wp-content/uploads/2019/10/PUBG-Season-5.jpg"
                                alt="Third slide"
                                />
                
                            <Carousel.Caption>
                                <h3>PGS AMERICAS 2020 STRUCTURE</h3>
                                <p>Join us today.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                    <div className="divider"></div>
                    <div className="discussion_header" id="posts"><h3>General Discussion</h3>{addPost}</div>
                    <div className="table_container">
                        <PostTable posts={this.state.posts} />
                    </div>
                    <div className="divider"></div>
                    <div className="content_footer">
                        <Navbar bg="dark" variant="dark">
                        <Navbar.Brand className="footer_header"><h3>PUBG</h3></Navbar.Brand>
                            <Nav className="copyright">
                                <Nav.Link>COPYRIGHT ©2019 PUBG CORPORATION. ALL RIGHTS RESERVED.
PLAYERUNKNOWN’S BATTLEGROUNDS and PUBG are registered trademarks, trademarks or service marks of PUBG CORPORATION.</Nav.Link>
                            </Nav>
                        </Navbar>
                    </div>
                </div>);
    }
}


