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
			photo: '',
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
				photo: this.state.photo
			})
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
				}
			})
	}
	render() {
		if (this.state.redirectTo) {
			return <Redirect to={{ pathname: this.state.redirectTo }} />
		}
		return (
			<div className="SignupForm">
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
					{/* <ImageUpload/> */}
					<label htmlFor="photo">Link to your profile picture: </label>
					<Input
					type="text"
					value={this.state.photo}
					onChange={this.handleChange}
					name="photo"
					placeholder="Photo URL"
				  />
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
