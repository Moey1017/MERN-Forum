import React, { Component } from "react";
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class AddPost extends Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            title: '',
            content: '',
            author: '',
            authorId: '',
            date: ''
        }
    }

    componentDidMount()
    {
        this.inputToFocus.focus();
        let authorName = sessionStorage.getItem('userName');
        let authorId = sessionStorage.getItem('authorId');
        this.setState({
            author: authorName,
            authorId: authorId
        });
    }

    handleChange = (e) =>
    {
        this.setState({[e.target.name]: e.target.value})
        let currentDate = new Date(); //Current Date

        this.setState({
            //Setting the value of the date time
            date: currentDate
        });

    }

    handleSubmit = (e) =>
    {
        e.preventDefault();

        const postObject = {
            title: this.state.title,
            content: this.state.content,
            author: this.state.author,
            authorId: this.state.authorId,
            date: this.state.date
        };

        setTimeout(() => {
            axios.post('http://localhost:4000/posts/add_post', postObject)
                    .then(res => {
                        if (res.data)
                        {
                            if (res.data.errorMessage)
                            {
                                console.log(res.data.errorMessage);
                                alert(res.data.errorMessage);
                            } else
                            {
                                console.log(`Post added`);
                                this.props.history.push('/DisplayAllPosts');
                            }
                        } else
                        {
                            console.log(`Record not added`);
                            alert(`Something went wrong`);
                        }
                    })
        }, 200);
    }

    render()
    {
        return (
                <div className="form_container">
                    <div className="divider"></div>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group controlId="model">
                            <Form.Label className="form_header">Title</Form.Label>
                            <Form.Control ref = {(input) => {
                        this.inputToFocus = input
                                          }} type="text" name="title" value={this.state.title} onChange={this.handleChange} />
                        </Form.Group>
                
                        <Form.Group controlId="colour">
                            <Form.Label className="form_header">Content</Form.Label>
                            <textarea className="content_div" name="content" value={this.state.content} onChange={this.handleChange}></textarea>
                        </Form.Group>
                
                        <span className="grn_btn" onClick={this.handleSubmit}>
                            Add
                        </span>
                
                        <Link className="red_btn" to={"/DisplayAllPosts"}>
                        Cancel
                        </Link>
                    </Form>
                </div>
                    );
    }
}
