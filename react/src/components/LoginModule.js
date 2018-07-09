import React from "react";
import PropTypes from "prop-types";
import Notification from "components/Notification";

class LoginModule extends React.Component {
	onLoginFormSubmit = (e) => {
		if (e) e.preventDefault();
		this.props.serviceCaller("login", {
			username:this.props.currentModule.username,
			password:this.props.currentModule.password
		});
	}

	render() {
		return (
			<div id="LoginModule">
				<form action="/login" method="post" onSubmit={this.onLoginFormSubmit}>
					<img src="/workhub-icon-blue.svg" alt="Workhub Logo"/>
					<h1>Log in to your account</h1>
					<input type="text" name="username" placeholder="Username" onChange={(e) => this.props.updateModuleState({username: e.target.value})}/>
					<input type="password" name="password" placeholder="Password" onChange={(e) => this.props.updateModuleState({password: e.target.value})}/>
					<input type="submit" className="color-button button-ok" value="Log In"/>
				</form>
				<Notification type={this.props.notification.type ? "error" : ""} text={this.props.notification.text}/>
			</div>
		);
	}
}

LoginModule.propTypes = {
	currentModule:PropTypes.objectOf(PropTypes.string).isRequired,
	notification:PropTypes.objectOf(PropTypes.string),
	serviceCaller:PropTypes.func.isRequired,
	updateModuleState:PropTypes.func.isRequired
};

export default LoginModule;