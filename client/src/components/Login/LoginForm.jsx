import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
// import googleButton from './google_signin_buttons/web/1x/btn_google_signin_dark_disabled_web.png'
import googleButton from './google_signin_buttons/web/1x/btn_google_signin_dark_normal_web.png'

const LoginForm = (props) => {	

	const handleSubmit = (event) => {
		event.preventDefault()
		props.login("/matches");
	}

		if (props.loggedIn && props.redirectTo) {
			return <Redirect to={{ pathname: props.redirectTo }} />
		} else {
			return (
				<div className="LoginForm">
					<center><h1>Login form</h1></center>
					<br/>
					<form>
						{props.errorMessage ? <p style={{color:"red"}}>Incorrect username or password info</p> :<p></p>}
						<label htmlFor="username">Username: </label>
						<input
							type="text"
							name="username"
							value={props.username}
							onChange={props.handleChange}
							className="form-control"
						/><br/>
						<label htmlFor="password">Password: </label>
						<input
							type="password"
							name="password"
							value={props.password}
							onChange={props.handleChange}
							className="form-control"
						/><br/>
						<center><button className="btn btn-primary" onClick={handleSubmit}>Login</button></center>
					</form>
				</div>
			)
		}
}

export default LoginForm
