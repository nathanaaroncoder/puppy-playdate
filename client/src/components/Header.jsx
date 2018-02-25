import React from 'react'
// TODO - add proptypes

const Header = props => {
	let Greeting
	if (props.user === null) {
		Greeting = <p>Hello guest</p>
	} else if (props.user.firstName) {
		Greeting = (
			<span id="greeting">
				Welcome back, <strong>{props.user.firstName}</strong>
			</span>
		)
	} else if (props.user.local.username) {
		Greeting = (
			<span id="greeting">
				Welcome back, <strong>{props.user.local.username} </strong>
			</span>
		)
	}
	return (
		<div className="Logo">
			<div className="Header">
				{Greeting}
				{ props.user ?
				(<span id="logout">
					<a href="#" className="nav-link" onClick={props._logout}>
						Logout &nbsp;
					</a>
				</span>) : (<div></div>)
			}
			</div>
		</div>
	)
}

export default Header
