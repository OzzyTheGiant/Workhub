import React, { Component } from 'react';
import 'css/main-styles.css';
import Header from 'components/Header';
import LoginView from 'components/LoginView';
import DocumentsModule from 'components/DocumentsModule';
import services from 'api/services';
 
class App extends Component {
	constructor() {
		super();
        this.state = {isLoggedIn:false, clients:{}, errorMessage:null};
        //this.cacheInterval = 300000; // 5 minutes
	}

	initApplication = () => { 
        /* After user is logged in, app fetches clients from server via axios api and renders DocumentsModule */
        services.getClients(this.setClients, this.ajaxErrorHandler);
		this.setState({isLoggedIn:true});
    }

    logout = (errorMessage) => services.logout(() => this.setState({
        /* Logs the user out and clears the state */
        isLoggedIn:false, currentModule:null, clients:[], errorMessage: errorMessage || null
    }), () => window.location.pathname = "/");

    // checkCacheTime(dataset, cacheName) {
    //     /* Checks to see if enough time has passed before fetching data from server again */
    //     let now = (new Date()).getTime();
    //     if (now - dataset[cacheName] >= this.cacheInterval) {
    //         this.setState({cacheName:{...this.state.cacheName, docActionsCacheTime:now}})
    //     }
    // }

    setClients = (data) => this.setState({
        /* add client data to state, converted from array to object with id keys */
        currentModule:"documents",
        clients:data.reduce((accumulator, client, index, clients) => {
            accumulator[client.id] = clients[index];
            return accumulator;
        }, {})
    });

    getProjects = clientID => {
        /* get projects and save to specified client in state, converted form array to object with id keys */
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
        /* get documents and save to specified project in state, converted form array to object with id keys */
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

    ajaxErrorHandler = error => {
        /* check to see if request was unauthorized; if so, user is logged out */
        if (error.response.status === 401) this.logout("Session expired, log back in to continue!");
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
            downloadFile={services.downloadFile}
            getDocumentHistory={services.getDocumentHistory}/> : null
		) : (
			<LoginView initApplication={this.initApplication} login={services.login} errorMessage={this.state.errorMessage}/>
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