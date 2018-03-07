import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { Input, TextArea, FormBtn } from "../components/Form";
import ImageUpload from "./ImageUpload"
import Jumbotron from "../components/Jumbotron";

const SignupForm = (props) => {

	const handleSubmit = (event) => {
		event.preventDefault()

    const formData = new FormData();

    formData.append("photo", props.photo);
    formData.append("username", props.username);
    formData.append("password", props.password);

    const config = {
      headers: {
          'content-type': 'multipart/form-data'
      }
    };

		// TODO - validate!
		axios
			.post('/auth/signup', formData, config)
			.then(response => {
				console.log(response)
				if (!response.data.errmsg) {
					console.log('youre good')
					console.log('handleSubmit')

					props.login("/user_profile");
				} else {
					console.log('duplicate')
					console.log(response.data.error)
				}
			});
	}

	console.log("SIGNUP:", props);
	if (props.redirectTo) {
		return <Redirect to={{ pathname: props.redirectTo }} />
	}
	return (
		<div className="SignupForm">
			<center><h2>Sign Up</h2></center>
			<br/>
			<form>
			<label htmlFor="username">Username: </label>
				{((props.allUsernames.includes(props.username))) ? <p style={{color:"red"}}>Username is taken</p> : <p></p> }
			  <Input
				type="text"
				value={props.username}
				onChange={props.handleChange}
				name="username"
				placeholder="Username"
			  />
			  <label htmlFor="password">Password: </label>
			  <Input
				type="password"
				value={props.password}
				onChange={props.handleChange}
				name="password"
				placeholder="Password"
			  />
			  <label htmlFor="confirmPassword">Confirm Password: </label>
			 		{(props.password === props.confirmPassword) ? <p></p> : <p style={{color:"red"}}>Passwords don't match</p> }
			  <Input
				type="password"
				value={props.confirmPassword}
				onChange={props.handleChange}
				name="confirmPassword"
				placeholder="Confirm Password"
			  />
				{/* <ImageUpload/> */}
				<label htmlFor="photo">Link to your profile picture: </label>

				
			  
  <input type="file" 
		onChange={props.handleChange}
		name="photo"/>



  

			  <center><FormBtn

				// if either username or passwors is not filled out
			  // or if password and confirm password don't match
				disabled={( !props.username || !props.password) || (props.password !== props.confirmPassword)}
				onClick={handleSubmit}
				className="btn"
			  >
				Sign Up
			  </FormBtn></center>
			</form>
		</div>
	);
}

export default SignupForm
