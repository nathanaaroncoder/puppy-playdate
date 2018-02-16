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
			dogName: '',
			confirmPassword: '',
			redirectTo: null
		}
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}
	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		})
	}
	handleSubmit(event) {
		event.preventDefault()
		// TODO - validate!
		axios
			.post('/auth/signup', {
				username: this.state.username,
				password: this.state.password,
				dogName: this.state.dogName
			})
			.then(response => {
				console.log(response)
				if (!response.data.errmsg) {
					console.log('youre good')
					this.setState({
						redirectTo: '/login'
					})
				} else {
					console.log('duplicate')
				}
			})
	}
	render() {
		if (this.state.redirectTo) {
			return <Redirect to={{ pathname: this.state.redirectTo }} />
		}
		return (
			<div className="SignupForm">
				<Jumbotron>
              		<h1>Sign Up</h1>
            	</Jumbotron>
				<form>
				<label htmlFor="username">Username: </label>
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
				  <Input
					type="password"
					value={this.state.confirmPassword}
					onChange={this.handleChange}
					name="confirmPassword"
					placeholder="Confirm Password"
				  />
				  <label htmlFor="dogName">Your Dog's Name: </label>
				  <Input
					type="text"
					value={this.state.dogName}
					onChange={this.handleChange}
					name="dogName"
					placeholder="Dog Name"
				  />
				  <ImageUpload/>
				  <FormBtn
					disabled={!(this.state.username && this.state.password && this.state.confirmPassword)}
					onClick={this.handleSubmit}
				  >
					Sign Up
				  </FormBtn>
				</form>
			</div>
		)
	}
}

export default SignupForm
