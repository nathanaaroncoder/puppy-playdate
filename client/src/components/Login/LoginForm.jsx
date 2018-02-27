import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
// import googleButton from './google_signin_buttons/web/1x/btn_google_signin_dark_disabled_web.png'
import googleButton from './google_signin_buttons/web/1x/btn_google_signin_dark_normal_web.png'

const LoginForm = (props) => {


	

	// handleSubmit(event) {
	// 	event.preventDefault()
	// 	console.log('handleSubmit')
	// 	const username = this.state.username
	// 	const password = this.state.password
	// 	this.props._login(username, password)
	// 	this.setState({
	// 		redirectTo: '/',
	// 		username: "",
	// 		password: ""

	// 	})
	// }

		if (props.loggedIn && props.redirectTo) {
			return <Redirect to={{ pathname: props.redirectTo }} />
		} else {
			return (
				<div className="LoginForm">
					<h1>Login form</h1>
					<form>
						{props.errorMessage ? <p style={{color:"red"}}>Incorrect username or password info</p> :<p></p>}
						<label htmlFor="username">Username: </label>
						<input
							type="text"
							name="username"
							value={props.username}
							onChange={props.handleChange}
						/>
						<label htmlFor="password">Password: </label>
						<input
							type="password"
							name="password"
							value={props.password}
							onChange={props.handleChange}
						/>
						<button onClick={props.login}>Login</button>
					</form>
				</div>
			)
		}
}

export default LoginForm
