import React from 'react';
import PropTypes from 'prop-types';
import Module from 'components/Module';
import Breadcrumbs from 'components/Breadcrumbs';
import IconLink from 'components/IconLink';

class DocumentsModule extends React.Component  {
    constructor() {
        super();
        this.state = {
            displayType:"grid-view",
            currClient:null,
            currProject:null,
            currDoc:null,
            filePath:null,
        };
    }

    toggleDisplayType = function toggleDisplayType() { // uses old function syntax with bind(this) to provide function name
        this.setState({
            displayType:this.state.displayType === "grid-view" ? "list-view" : "grid-view"
        });
    }.bind(this);

    setCurrentSelections = (currClient, currProject, currDoc) => {
        let newState = {};
        if (currClient !== false) newState.currClient = currClient;
        if (currProject !== false) newState.currProject = currProject;
        if (currDoc !== false) newState.currDoc = currDoc;
        this.setState(newState);
    }

    openDocument = (id) => {
        this.props.openDocument(id, (filePath) => this.setState({filePath, currDoc:id}), this.props.ajaxErrorHandler);
    }

	render() {
        let client = this.props.clients[this.state.currClient];
        let project = this.state.currProject ? client.projects[this.state.currProject] : null;
        let document = this.state.currDoc ? project.documents[this.state.currDoc] : null;
        let list = null;
        if (!client) {
            list = Object.keys(this.props.clients).map((clientID) => {
                return ( // Default clients list
                    <IconLink 
                    key={clientID}
                    details={{id:clientID}}
                    dblClickHandler={() => {this.props.getProjects(clientID); this.setCurrentSelections(clientID);}} 
                    name={this.props.clients[clientID].clientName} 
                    view={this.state.displayType}/>
                );
            });
        } else {
            if (!project) {
                list = Object.keys(client.projects || {}).map((projectID) => {
                    let project = client.projects[projectID];
                    return ( // projects list
                        <IconLink 
                        key={projectID} 
                        details={{category:project.category.description}}
                        dblClickHandler={() => {this.props.getDocuments(this.state.currClient, projectID); this.setCurrentSelections(false, projectID);}} 
                        name={project.name} 
                        view={this.state.displayType}/>
                    );
                });
            } else {
                list = Object.keys(project.documents || {}).map((docID) => {
                    let document = project.documents[docID];
                    return ( // documents list
                        <IconLink 
                        key={docID}
                        details={{
                            category:document.category.description,
                            year:document.year
                        }}
                        fileType={document.fileType}
                        dblClickHandler={() => this.openDocument(docID)} 
                        name={project.documents[docID].description}
                        view={this.state.displayType}/>
                    );
                });
            }
        }
        if (list.length !== 0) { 
            list.sort((a, b) => {
                if (a.props.name < b.props.name) return -1;
                if (b.props.name < a.props.name) return 1;
                return 0;
            }) 
        } else {
            list = <li className="empty">No files or folders found!</li>   
        };
		return (
            <Module title="Documents" buttonActions={[this.toggleDisplayType]} displayType={this.state.displayType}>
                <Breadcrumbs breadcrumbs={
                    [
                        client ? {text:"Home", clickHandler:() => this.setCurrentSelections(null, null, null)}: null, 
                        client ? {text:client.clientName, clickHandler:() => this.setCurrentSelections(false, null, null)} : null, 
                        project ? {text:project.name, clickHandler:() => this.setCurrentSelections(false, false, null)} : null,
                        document ? {text:document.description, clickHandler:null} : null
                    ]
                }/>
                {!this.state.currDoc ? (
                    <ul className={this.state.displayType}>{list}</ul>
                ) : (
                    <object 
                    data={"/document-files" + this.state.filePath} 
                    type="application/pdf" 
                    title={"Current Document: " + document.description + "." + document.fileType.toLowerCase()}>
                        File could not be loaded!
                    </object>
                )}
            </Module>
        );
	}
}

DocumentsModule.propTypes = {
    clients:PropTypes.objectOf(PropTypes.object),
    ajaxErrorHandler:PropTypes.func,
    getProjects:PropTypes.func.isRequired,
    getDocuments:PropTypes.func.isRequired,
    openDocument:PropTypes.func.isRequired
}

export default DocumentsModule;