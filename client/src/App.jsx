import React, { Component } from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import LoginForm from './components/Login/LoginForm'
import SignupForm from './components/SignupForm'
import ImageUpload from './components/ImageUpload'
import Header from './components/Header'
import Home from './components/Home'
import Nav from "./components/Nav"
import UserProfile from "./components/UserProfile";
import Matches from "./components/Matches";
import NoMatch from "./pages/NoMatch";
import Dogs from "./pages/Dogs";
import Messages from "./pages/Messages";
import Calendar from "./pages/Calendar";





const DisplayLinks = props => {
	if (props.loggedIn) {
		return (
  			<div>
			    <Nav />
			    <Switch>
				  <Route exact path="/" component={Matches} />
			      <Route exact path="/matches" component={Matches} />
			      <Route exact path="/user_profile" component={Dogs} />
			      <Route exact path="/messages" component={Messages}/>
			      <Route exact path="/calendar" component={Calendar}/>
			      <Route component={NoMatch} />
		 		</Switch>
				</div>
		)
	} else {
		return (
			<nav className="navbar">
				<ul className="nav">
					{/* <li className="nav-item">
						<Link to="/" className="nav-link">
							Home
						</Link>
					</li> */}
					
					<li className="nav-item">
						<Link to="/login" className="nav-link">
							Login
						</Link>
					</li>
					
					
					<li className="nav-item">
						<Link to="/signup" className="nav-link">
							Sign Up
						</Link>
					</li>
					
				</ul>
			</nav>
		)
	}
}

class App extends Component {
	constructor() {
		super()
		this.state = {
			loggedIn: false,
			user: null,
			errorMessage: "",
			username: "",
			password: "",
			confirmPassword: "",
			redirectTo: "",
			photo: null,
			allUsernames: []
		}
		this._logout = this._logout.bind(this)
		this._login = this._login.bind(this)
	}

	componentDidMount() {
		const allUsersPromise = axios.get('/auth/signup');
		const currentUserPromise = axios.get('/auth/user');

		Promise.all([allUsersPromise, currentUserPromise])
		.then(response => {
			const newState = {};

			if (!!response[1].data.user) {

				newState.loggedIn = true;
				newState.user = response[1].data.user;
			} else {
				newState.loggedIn = false;
				newState.user = null;
			}

			const allUsers = response[0].data;

	    // an array of just the usernames
	    newState.allUsernames = allUsers.map(person => person.local.username);

	    this.setState(newState);
		});
	}

	_logout(event) {
		event.preventDefault()
		console.log('logging out')
		axios.post('/auth/logout').then(response => {
			console.log(response.data)
			if (response.status === 200) {
				this.setState({
					loggedIn: false,
					user: null,
					redirectTo: "",
					username: "",
					password: "",
					confirmPassword: ""
				})
			}
		})
	}

	_login = (redirectUrl) => {
		axios
			.post('/auth/login', {
				username: this.state.username,
				password: this.state.password
			})
			.then(response => {
				console.log(response)
				const newState = {
					loggedIn: true,
					user: response.data.user,
					errorMessage: "",
					username: "",
					password: "",
					confirmPassword: "",
					redirectTo: redirectUrl
				};

				if (response.status === 200) {
					console.log("NEW STATE ON LOGIN", newState);
					// update the state
					this.setState(newState);
				}
			}).catch(error => {
						console.log("Hit Error!", error);
						this.setState({
							errorMessage: error.message,
							username: "",
							password:"",
							confirmPassword: ""
						});
			});
	}

	handleChange = (event) => {
		if (event.target.name == "photo"){
			console.log("event.target...", event.target.files[0])
			this.setState({
				photo: event.target.files[0]
			});
		}
		else{
			this.setState({
			[event.target.name]: event.target.value
		})
		}
		
	}

	render() {

		if (this.state.loggedIn){
			return (
				<div className="App">
					<Header user={this.state.user} _logout={this._logout} />
					{/* LINKS to our different 'pages' */}
					<DisplayLinks _logout={this._logout} loggedIn={this.state.loggedIn} />
					{/*  ROUTES */}
					<Route
						exact
						path="/login"
						render={() =>
							<LoginForm
								login={this._login}
								loggedIn={this.state.loggedIn}
								username={this.state.username}
								password={this.state.password}
								redirectTo={this.state.redirectTo}
								handleChange={this.handleChange}
								_googleSignin={this._googleSignin}
								errorMessage={this.state.errorMessage}
							/>}
					/>
					<Route
						exact
						path="/signup"
						render={() =>
							<SignupForm
								username={this.state.username}
								password={this.state.password}
								redirectTo={this.state.redirectTo}
								handleChange={this.handleChange}
								confirmPassword={this.state.confirmPassword}
								allUsernames={this.state.allUsernames}
								photo={this.state.photo}
								login={this._login}
								_googleSignin={this._googleSignin}

							/>}
					/>
				</div>
				)
		} else {
			return (
				<div className="App">
					<Header user={this.state.user} />
					{/* LINKS to our different 'pages' */}
				<div className="main-container">			
				<div className="subcontainer">
					<DisplayLinks _logout={this._logout} loggedIn={this.state.loggedIn} />
					{/*  ROUTES */}
					<div id="about">
					Find friends for your puppy in your area.
					<br/>
					Start by signing up and letting us know a little bit more about your pet.
					<br/>
					Swipe right if you think the dog would be a good match for yours.
					<br/>
					Once you both think it was good match, you can message each other to schedule a playdate.
					</div>
					
					<Route exact path="/" render={() =>
							<LoginForm
								login={this._login}
								loggedIn={this.state.loggedIn}
								username={this.state.username}
								password={this.state.password}
								redirectTo={this.state.redirectTo}
								handleChange={this.handleChange}
								_googleSignin={this._googleSignin}
								errorMessage={this.state.errorMessage}
							/>} />
					<Route
						exact
						path="/login"
						render={() =>
							<LoginForm
								login={this._login}
								loggedIn={this.state.loggedIn}
								username={this.state.username}
								password={this.state.password}
								redirectTo={this.state.redirectTo}
								handleChange={this.handleChange}
								_googleSignin={this._googleSignin}
								errorMessage={this.state.errorMessage}
							/>}
					/>
					<Route
						exact
						path="/signup"
						render={() =>
							<SignupForm
								username={this.state.username}
								password={this.state.password}
								redirectTo={this.state.redirectTo}
								handleChange={this.handleChange}
								confirmPassword={this.state.confirmPassword}
								allUsernames={this.state.allUsernames}
								photo={this.state.photo}
								login={this._login}
								_googleSignin={this._googleSignin}

							/>}
					/>
					</div>
					</div>
				</div>
				)

		}
		
		
	}
}

export default App
