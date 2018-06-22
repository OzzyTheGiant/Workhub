import React from "react";
import PropTypes from "prop-types";
import Header from "components/Header";
import LoginModule from "components/LoginModule";
import DocumentsModule from "components/DocumentsModule";

const AppUserInterface = props => {
	/* function for determining with module component should be displayed at any point */
	let view, commonProps = { // props that are passed to every module
		currentModule:props.appState.currentModule,
		serviceCaller:props.serviceCaller,
		updateGlobalState:props.updateState,
		updateModuleState:(newState) => {
		props.updateState({
				currentModule:{
					...props.appState.currentModule,
					...newState
				}
			});
		}
	}
	switch(props.appState.currentModule.name) {
		case "documents":
			view = ( 
				<DocumentsModule 
				clients={props.appState.clients}
				projects={props.appState.projects}
				documents={props.appState.documents}
				documentHistory={props.appState.documentHistory}
				breadCrumbs={props.appState.breadCrumbs}
				clickSelection={props.appState.clickSelection}
				iconDisplayType={props.appState.iconDisplayType}
				{...commonProps}/>
			); break;
		case "login":
		default:
			view = <LoginModule notification={props.appState.notification} {...commonProps}/>; break;
	}
	return (
		<div className="App">
			{props.appState.currentModule.name !== "login" ? <Header logout={() => props.serviceCaller("logout")}/> : null}
			{view}
			<footer>&copy; 2018 Salinas, Allen & Schmitt, LLP. All Rights Reserved</footer>
		</div>
	);
};

AppUserInterface.propTypes = {
	appState:PropTypes.object.isRequired,
	serviceCaller:PropTypes.func.isRequired,
	updateState:PropTypes.func.isRequired
};

export default AppUserInterface;