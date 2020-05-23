import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class AddComment extends Component 
{
    constructor(props) 
    {
        super(props);

        this.state = {
            title: '',
            content: '',
            author: '',
            authorId:'',
            date: '',
            comments:[]
        }
    }

componentDidMount() 
{      
    this.inputToFocus.focus();
    let authorName = sessionStorage.getItem('userName');
    let authorId = sessionStorage.getItem('authorId');
    this.setState({
      author:authorName,
      authorId:authorId
    });
    
}


handleChange = (e) => 
{
    this.setState({ [e.target.name]: e.target.value });
    let currentDate = new Date(); //Current Date

                this.setState({
                    //Setting the value of the date time
                    date:currentDate    
                });
}


handleSubmit = (e) => 
{
    e.preventDefault();

    const commentObject = {
        author: this.state.author,
        authorId:this.state.authorId,
        content: this.state.content,
        date: this.state.date
    };

    setTimeout(() => {axios.put('http://localhost:4000/posts/add_comment/' + this.props.match.params.id, commentObject)
    .then(res => {if(res.data)
                {
                    if (res.data.errorMessage)
                    {
                        console.log(res.data.errorMessage);
                        alert(res.data.errorMessage);
                    }
                    else
                    {   
                        console.log(`Comment added`);
                        this.props.history.push('/ViewPost/' + this.props.match.params.id);
                    } 
                }
                else
                {
                    console.log(`Comment not added`);
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
                <Form.Group controlId="content">
                  <Form.Label className="form_header">Content</Form.Label>
                  <textarea ref = {(input) => { this.inputToFocus = input }} className="content_div" name="content" value={this.state.content} onChange={this.handleChange}></textarea>
                </Form.Group>

                <span className="grn_btn" onClick={this.handleSubmit}>
                  Add Comment
                </span>
            
                <Link className="red_btn" to={'/ViewPost/' + this.props.match.params.id}>
                  Cancel
                </Link>
              </Form>
            </div>
           );
  }
}