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
			<Router>
  <div>
    <Nav />
    <Switch>
      <Route exact path="/matches" component={Matches} />
      <Route path="/user_profile/" component={Dogs} />
      <Route exact path="/messages" component={Messages}/>
      <Route exact path="/calendar" component={Calendar}/>
      <Route exact path="/" component={Matches}/>
    <Route component={NoMatch} />

    {/* <Books /> */}
 			</Switch>

			

			</div>
			  </Router>
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
			user: null
		}
		this._logout = this._logout.bind(this)
		this._login = this._login.bind(this)
	}
	componentDidMount() {
		axios.get('/auth/user').then(response => {
			console.log(response.data)
			if (!!response.data.user) {
				console.log('THERE IS A USER')
				this.setState({
					loggedIn: true,
					user: response.data.user
				})
			} else {
				this.setState({
					loggedIn: false,
					user: null
				})
			}
		})
	}

	_logout(event) {
		event.preventDefault()
		console.log('logging out')
		axios.post('/auth/logout').then(response => {
			console.log(response.data)
			if (response.status === 200) {
				this.setState({
					loggedIn: false,
					user: null
				})
			}
		})
	}

	_login(username, password) {
		axios
			.post('/auth/login', {
				username,
				password
			})
			.then(response => {
				console.log(response)
				if (response.status === 200) {
					// update the state
					this.setState({
						loggedIn: true,
						user: response.data.user
					})
				}
			})
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
								_login={this._login}
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
					<DisplayLinks _logout={this._logout} loggedIn={this.state.loggedIn} />
					{/*  ROUTES */}
					<Route exact path="/" render={() =>
							<LoginForm
								_login={this._login}
								_googleSignin={this._googleSignin}
							/>} />
					<Route
						exact
						path="/login"
						render={() =>
							<LoginForm
								_login={this._login}
								_googleSignin={this._googleSignin}
							/>}
					/>
					<Route
						exact
						path="/signup"
						render={() =>
							<SignupForm
								_login={this._login}
								_googleSignin={this._googleSignin}
							/>}
					/>

				</div>
				)

		}
		
		
	}
}

export default App
