import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
        import { Link } from 'react-router-dom';
import axios from 'axios';

export default class EditPost extends Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            title: '',
            content: '',
            author: '',
            date: ''
        }
    }

    componentDidMount()
    {
        this.inputToFocus.focus();

        setTimeout(() => {axios.get('http://localhost:4000/posts/get_post/' + this.props.match.params.id)
                .then(res => {
                    this.setState({
                        title: res.data.title,
                        content: res.data.content,
                        author: res.data.author,
                        date: res.data.date
                    });
                })
                .catch(error => console.log(error))},200);
    }

    handleChange = (e) =>
            {
                this.setState({[e.target.name]: e.target.value});
                let currentDate = new Date(); //Current Date

                this.setState({
                    //Setting the value of the date time
                    date:currentDate    
                });
            }

    handleSubmit = (e) =>
            {
                e.preventDefault();

                const postObject = {
                    title: this.state.title,
                    content: this.state.content,
                    author: this.state.author,
                    date: this.state.date
                };

                setTimeout(() => {axios.put('http://localhost:4000/posts/update_post/' + this.props.match.params.id, postObject)
                .then(res => {if(res.data)
                {
                    if (res.data.errorMessage)
                    {
                        console.log(res.data.errorMessage);
                        alert(res.data.errorMessage);
                    }
                    else
                    {   
                        console.log(`Post edited`);
                        this.props.history.push('/DisplayAllPosts');
                    } 
                }
                else
                {
                    console.log(`Post not edited`);
                    alert(`Something went wrong`);
                }})
                },200);
            }

    render()
    {
        return (
                <div className="form-container">
        <div className="divider"></div>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group controlId="title">
                            <Form.Label className="form_header">Title</Form.Label>
                            <Form.Control ref = {(input) => {this.inputToFocus = input}} type="text" name="title" value={this.state.title} onChange={this.handleChange} />
                        </Form.Group>
                
                        <Form.Group controlId="content">
                                <Form.Label className="form_header">Content</Form.Label>
                            <textarea className="content_div" name="content" value={this.state.content} onChange={this.handleChange}></textarea>
                        </Form.Group>
                
                        <span className="grn_btn" onClick={this.handleSubmit}>
                            Update
                        </span>
                
                        <Link className="red_btn" to={'/DisplayAllPosts'}>
                        Cancel
                        </Link>
                    </Form>
                </div>
                    );
    }
}