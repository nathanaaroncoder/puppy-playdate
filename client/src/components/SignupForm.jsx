import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { Input, TextArea, FormBtn } from "../components/Form";
import ImageUpload from "./ImageUpload"
import Jumbotron from "../components/Jumbotron";

class SignupForm extends Component {
	constructor() {
		super()
		this.state = {
			username: '',
			password: '',
			confirmPassword: '',
			photo: null,
			redirectTo: null,
			allUsernames: []
		}
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}

		findAllUsers = () => {

		// get all the users
	 	axios.get('/auth/signup').then(res => {
	    console.log(res.data);
	    const allUsers = res.data;

	    // an array of just the usernames
	    const usernames = allUsers.map(person => person.local.username);
	    console.log("usernames", usernames);
	    
	    this.setState({
	    	allUsernames: usernames
	    })
	    console.log("this.state.allUsernames", this.state.allUsernames)
    
    })

	}

	componentDidMount(){
    this.findAllUsers();
  }

	handleChange(event) {
		if (event.target.name == "photo"){
			console.log("event.target...", event.target.files[0])
			this.setState({
				photo: event.target.files[0]
			});
  

		}



  else {
  	this.setState({
			[event.target.name]: event.target.value
		})
	}
}



	handleSubmit(event) {
		event.preventDefault()
			
    // console.log(event);

    // console.log(event.target.children)

    // let input = event.target.children[0];

    const formData = new FormData();

    formData.append("photo", this.state.photo);
    formData.append("username", this.state.username);
    formData.append("password", this.state.password);

    const config = {
      headers: {
          'content-type': 'multipart/form-data'
      }
    };

    // console.log("formData ", formData)

    // axios.post("/upload/image", formData, config)
    // .then((response) => {
    //   console.log("===============================");
    //   console.log("RESPONSE: ", response);
    // }).catch(error => {
    //   console.log("ERROR: ", error);
    // })
  


		// TODO - validate!
		axios
			.post('/auth/signup', formData, config)
			.then(response => {
				console.log(response)
				if (!response.data.errmsg) {
					console.log('youre good')
					console.log('handleSubmit')
					this.props._login(this.state.username, this.state.password)
					this.setState({
			redirectTo: '/user_profile'
		})
				} else {
					console.log('duplicate')
					console.log(response.data.error)
				}
			})
	}

	render() {
		if (this.state.redirectTo) {
			return <Redirect to={{ pathname: this.state.redirectTo }} />
		}
		return (
			<div className="SignupForm">
				<center><h1>Sign Up</h1></center>
				<br/>
				<form>
				<label htmlFor="username">Username: </label>
					{((this.state.allUsernames.includes(this.state.username))) ? <p style={{color:"red"}}>Username is taken</p> : <p></p> }
				  <Input
					type="text"
					value={this.state.username}
					onChange={this.handleChange}
					name="username"
					placeholder="Username"
				  />
				  <label htmlFor="password">Password: </label>
				  <Input
					type="password"
					value={this.state.password}
					onChange={this.handleChange}
					name="password"
					placeholder="Password"
				  />
				  <label htmlFor="confirmPassword">Confirm Password: </label>
				 		{(this.state.password === this.state.confirmPassword) ? <p></p> : <p style={{color:"red"}}>Passwords don't match</p> }
				  <Input
					type="password"
					value={this.state.confirmPassword}
					onChange={this.handleChange}
					name="confirmPassword"
					placeholder="Confirm Password"
				  />
					{/* <ImageUpload/> */}
					<label htmlFor="photo">Link to your profile picture: </label>

					
				  
    <Input type="file" 
			onChange={this.handleChange}
			name="photo"/>
  
  
  
    

				  <FormBtn

					// if either username or passwors is not filled out
				  // or if password and confirm password don't match
					disabled={( !this.state.username || !this.state.password) || (this.state.password !== this.state.confirmPassword)}
					onClick={this.handleSubmit}
					className="btn"
				  >
					Sign Up
				  </FormBtn></center>
				</form>
			</div>
		)
	}
}

export default SignupForm
