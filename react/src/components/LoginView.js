import React from 'react';
import PropTypes from 'prop-types';
import { services } from 'api/services';
import Notification from 'components/Notification';

class LoginView extends React.Component {
	constructor() {
		super();
		this.state = {
			username:null,
			password:null,
			errorMessage:null
		}
	};

	login = (e) => {
		e.preventDefault();
		services.login({username: this.state.username, password: this.state.password})
		.then((response) => this.props.initApplication()) // render application interface
		.catch((error) => this.setState({errorMessage: "Login Error: Username or password is incorrect!"}));
	}

	render(props) {
		return (
			<div id="LoginView">
				<form action="/login" method="post" onSubmit={this.login}>
					<img src="https://placehold.it/50x50/00638E" alt="Logo"/>
					<h1>Log in to your account</h1>
					<input type="text" name="username" placeholder="Username" onChange={(e) => this.setState({username: e.target.value})}/>
					<input type="password" name="password" placeholder="Password" onChange={(e) => this.setState({password: e.target.value})}/>
					<input type="submit" className="button button-ok" value="Log In"/>
				</form>
				<Notification type={this.state.errorMessage ? "error" : ""} message={this.state.errorMessage}/>
			</div>
		);
	}
};

LoginView.propTypes = {
	initApplication:PropTypes.func.isRequired
};

export default LoginView;