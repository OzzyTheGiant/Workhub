import React, { Component } from 'react';
import 'css/main-styles.css';
import Header from 'components/Header';
import LoginView from 'components/LoginView';
import ModuleContainer from 'components/ModuleContainer';
import DocumentModule from 'components/DocumentModule';
import services from 'api/services';
 
class App extends Component {
	constructor() {
		super();
		this.state = {
			isLoggedIn:false,
			currentModule:null,
            clients:[]
		};
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
        const title = this.state.currentModule;
 		const view = this.state.isLoggedIn ? (
			<ModuleContainer title={title[0].toUpperCase() + title.slice(1)}>
			{ this.state.currentModule === "documents" ? <DocumentModule clients={this.state.clients}/> : null }
			</ModuleContainer>
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