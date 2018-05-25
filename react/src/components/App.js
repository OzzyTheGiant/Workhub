import React, { Component } from 'react';
import 'css/main-styles.css';
import Header from 'components/Header';
import LoginView from 'components/LoginView';
import DocumentsModule from 'components/DocumentsModule';
import services from 'api/services';
 
class App extends Component {
	constructor() {
		super();
		this.state = {isLoggedIn:false, clients:{}};
	}

	initApplication = () => {
        services.getClients(this.setClients, this.ajaxErrorHandler);
		this.setState({isLoggedIn:true});
    }

    logout = () => services.logout(() => this.setState({
        isLoggedIn:false, currentModule:null, clients:[]
    }), this.ajaxErrorHandler);

    setClients = (data) => this.setState({
        currentModule:"documents",
        clients:data.reduce((accumulator, client, index, clients) => {
            accumulator[client.id] = clients[index];
            return accumulator;
        }, {})
    });

    getProjects = clientID => {
        if (!this.state.clients[clientID].projects) {
            services.getProjectsByClientID(clientID, (data) => {
                let newState = {clients:{...this.state.clients}};
                newState.clients[clientID].projects = data.reduce((accumulator, project, i, projects) => {
                    accumulator[project.id] = projects[i];
                    return accumulator;
                }, {});
                this.setState(newState);
            }, this.ajaxErrorHandler);
            return false;
        } return true;
    };
    
    getDocuments = (clientID, projectID) => {
        if (!this.state.clients[clientID].projects[projectID].documents) {
            services.getDocumentsByProjectID(projectID, (data) => {
                let newState = {clients:{...this.state.clients}};
                newState.clients[clientID].projects[projectID].documents = data.reduce((accumulator, doc, i, docs) => {
                    accumulator[doc.id] = docs[i];
                    return accumulator;  
                }, {});
                this.setState(newState);
            }, this.ajaxErrorHandler);
        }
    };

    ajaxErrorHandler = () => {
        // TODO: set error message later
    };

 	render() {
 		const view = this.state.isLoggedIn ? (
			this.state.currentModule === "documents" ? 
            <DocumentsModule 
            clients={this.state.clients}
            ajaxErrorHandler={this.ajaxErrorHandler}
            getProjects={this.getProjects}
            openDocument={services.openDocument}
            getDocuments={this.getDocuments}
            downloadFile={services.downloadFile}/> : null
		) : (
			<LoginView initApplication={this.initApplication} login={services.login}/>
		);
 		return (
 			<div className="App">
 				{this.state.isLoggedIn ? <Header logout={this.logout}/> : null}
 				{view}
 				<footer>&copy; 2018 Salinas, Allen & Schmitt, LLP. All Rights Reserved</footer>
 			</div>
 		);
  	}
}

export default App;