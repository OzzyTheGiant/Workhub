import React from "react";
import PropTypes from 'prop-types';
import Header from "components/Header";
import LoginView from "components/LoginView";
import DocumentsModule from "components/DocumentsModule";

const AppUserInterface = props => {
	const view = props.isLoggedIn ? (
		props.currentModule === "documents" ? 
			<DocumentsModule 
				clients={this.state.clients}
				ajaxErrorHandler={this.ajaxErrorHandler}
				getProjects={this.getProjects}
				openDocument={props.services.openDocument}
				getDocuments={props.getDocuments}
				downloadFile={props.services.downloadFile}
				getDocumentHistory={props.services.getDocumentHistory}/> : null
	) : (
		<LoginView initApplication={this.initApplication} login={props.services.login} errorMessage={this.state.errorMessage}/>
	);
	return (
		<div className="App">
			{props.isLoggedIn ? <Header logout={props.logout}/> : null}
			{view}
			<footer>&copy; 2018 Salinas, Allen & Schmitt, LLP. All Rights Reserved</footer>
		</div>
	);
};

AppUserInterface.propTypes = {
	isLoggedIn:PropTypes.bool.isRequired,
	logout:PropTypes.func.isRequired,
	services:PropTypes.any,
	currentModule:PropTypes.any,
	getDocuments:PropTypes.any
};

export default AppUserInterface;