import React, { Component } from 'react';
import 'css/main-styles.css';
import Header from 'components/Header';
import LoginView from 'components/LoginView';
import DocumentsModule from 'components/DocumentsModule';
import services from 'api/services';
 
class App extends Component {
	constructor() {
		super();
		this.state = {isLoggedIn:false, clients:[]};
	}

	initApplication = () => {
        services.getClients(this.setClients, this.ajaxErrorHandler); 
		this.setState({currentModule:"documents", isLoggedIn:true});
    }

    setClients = (ajaxResponse) => this.setState({
        clients:ajaxResponse.data
    });

    ajaxErrorHandler = () => {
        // TODO: set error message later
    }

 	render() {
 		const view = this.state.isLoggedIn ? (
			this.state.currentModule === "documents" ? 
            <DocumentsModule clients={this.state.clients} /> : null
		) : (
			<LoginView initApplication={this.initApplication} login={services.login}/>
		);
 		return (
 			<div className="App">
 				{this.state.isLoggedIn ? <Header/> : null}
 				{view}
 				<footer>&copy; 2018 Salinas, Allen & Schmitt, LLP. All Rights Reserved</footer>
 			</div>
 		);
  	}
}

export default App;