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
            author: '',
            content: '',
            date: '',
            currentPostId:''
        }
    }

componentDidMount() 
{      
    this.inputToFocus.focus();
  
    setTimeout(() => {axios.get('http://localhost:4000/posts/get_comment/' + this.props.match.params.id)
         .then(res => {
              this.setState({
                  content: res.data.content,
                  author: res.data.author,
                  date: res.data.date,
                  currentPostId: sessionStorage.getItem('currentPostId')
              });
           })
         .catch(error => console.log(error))},200);

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

    const postObject = {
        content: this.state.content,
        author: this.state.author,
        date: this.state.date
    };

    setTimeout(() => {axios.put('http://localhost:4000/posts/update_comment/' + this.props.match.params.id, postObject)
    .then(res => {if(res.data)
                {
                    if (res.data.errorMessage)
                    {
                        console.log(res.data.errorMessage);
                        alert(res.data.errorMessage);
                    }
                    else
                    {   
                        console.log(`Comment edited`);
                        this.props.history.push('/ViewPost/' + this.state.currentPostId);
                    } 
                }
                else
                {
                    console.log(`Comment not edited`);
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
                  Update
                </span>
            
                <Link className="red_btn" to={"/ViewPost/" + this.state.currentPostId}>
                  Cancel
                </Link>
              </Form>
            </div>
           );
  }
}