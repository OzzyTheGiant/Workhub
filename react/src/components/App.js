import React, { Component } from "react";
import "css/main-styles.css";
import services from "api/services";
import AppUserInterface from 'components/AppUserInterface';
 
class App extends Component {
	constructor() {
		super();
		this.initialState = {
			isLoggedIn:false, 
			notification:{},
			iconDisplayType:"grid-view",
			breadCrumbs:[],
			clickSelection:null,
			currentModule:{
				name:"login",
				username:null,
				password:null
			},
			clients:null,
			projects:null,
			documents:null,
			employees:null,
			documentHistory:[]
		};
		this.state = this.initialState;
	}

	/* a global function for updating the App state, passed to the rest of the UI */
	updateState = (newState) => {this.setState(newState);}

	serviceCaller = function serviceCaller(serviceName, data) {
		/* calls ajax services using the specified function name, passing in a success handler for updating state, 
		an error function for dealing with http errors and any necessary data */
		if (serviceName === "logout") this.logout();
		else {
			services[serviceName]({
				successHandler:(responseData) => this.setState(responseData), 
				errorHandler:this.ajaxErrorHandler,
				data
			});
		}
	}.bind(this);

    logout = (errorMessage) => {
		/* end session by calling ajax service and reset state to initial form */
		services.logout({
			successHandler:() => this.setState({
				...this.initialState, 
				notification:errorMessage ? {type:"error", text:errorMessage} : {}
			}), 
			errorHandler:() => window.location.pathname = "/"
		});
	};

    ajaxErrorHandler = error => {
    	/* check to see if request was unauthorized; if so, user is logged out */
    	if (error.response.status === 401) {
			if (this.state.isLoggedIn) {
				this.logout("Session expired, log back in to continue!");
			} else {
				this.setState({
					notification:{type:"error", text:"Login Error: Username or password is incorrect!"}
				});
			}
		}
	};

 	render() {
		return <AppUserInterface appState={this.state} serviceCaller={this.serviceCaller} updateState={this.updateState}/>;
  	}
}

export default App;