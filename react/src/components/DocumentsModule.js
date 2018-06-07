import React from 'react';
import PropTypes from 'prop-types';
import Module from 'components/Module';
import Breadcrumbs from 'components/Breadcrumbs';
import IconLinkList from 'components/IconLinkList';
import DocumentHistory from 'components/DocumentHistory';

class DocumentsModule extends React.Component  {
    constructor() {
        super();
        this.state = {
            displayType:"grid-view",
            currClient:null,
            currProject:null,
            currDoc:null,
            filePath:null,
            clickSelection:null
        };
    }

    toggleDisplayType = function toggleDisplayType() { 
        // toggle between "list" and "grid" views for icons; uses old function syntax with bind(this) to provide function name
        this.setState({
            displayType:this.state.displayType === "grid-view" ? "list-view" : "grid-view"
        });
    }.bind(this);


    setCurrentSelections = (currClient, currProject, currDoc) => {
        // set the current selected entity (client, project, or document) based on which link or breadcrumb was clicked
        let newState = {};
        if (currClient !== false) newState.currClient = currClient;
        if (currProject !== false) newState.currProject = currProject;
        if (currDoc !== false) newState.currDoc = currDoc;
        newState.clickSelection = null;
        newState.currDocHistory = null;
        this.setState(newState);
    }

    iconClickHandler = (event) => {
        let id = event.currentTarget.dataset.id;
        this.setState({clickSelection:id});
    }

    renderProjectList = function renderProjectList(event) {
        /* fetch projects from either app state or server if not in state, while marking client as currently viewed */
        let clientID = event.currentTarget.dataset.id;
        this.props.getProjects(clientID);
        this.setCurrentSelections(clientID, null, null);
    }.bind(this);

    renderDocumentList = function renderDocumentList(event) {
        /* fetch documents from either app state or server if not in state, while marking project as currently viewed */
        let projectID = event.currentTarget.dataset.id
        this.props.getDocuments(this.state.currClient, projectID);
        this.setCurrentSelections(false, projectID, null);
    }.bind(this);

    openDocument = (event) => { 
        /* get file path for file to be rendered or downloaded, while marking current document as viewing */
        let id = event.currentTarget.dataset.id;
        this.props.openDocument(id, (filePath) => this.setState({filePath, currDoc:id}), this.props.ajaxErrorHandler);
        if (this.props.clients[this.state.currClient].projects[this.state.currProject].documents[id].fileType !== "TXT") {
            this.setState({textFile:null});
        }
    };

    viewDocumentHistory = function viewDocumentHistory() {
        /* fetch document action history for a particular document */
        this.props.getDocumentHistory(this.state.clickSelection, (history) => {
            this.setState({currDocHistory:history})
        }, this.props.ajaxErrorHandler);
    }.bind(this);

	render() {
        let client = this.props.clients[this.state.currClient];
        let project = this.state.currProject ? client.projects[this.state.currProject] : null;
        let doc = this.state.currDoc ? project.documents[this.state.currDoc] : null;
        let list, listType, dblClickHandler, nameLabel;
        // get list based on currently selected client or project and set up props for IconLinkList component
        if (!this.state.currClient) {
            list = this.props.clients; 
            listType = "clients";
            dblClickHandler = this.renderProjectList;
            nameLabel = "clientName";
        } else {
            if (!this.state.currProject) {
                list = this.props.clients[this.state.currClient].projects;
                listType = "projects";
                dblClickHandler = this.renderDocumentList;
                nameLabel = "name";
            } else {
                list = this.props.clients[this.state.currClient].projects[this.state.currProject].documents;
                listType = "documents";
                dblClickHandler = this.openDocument;
                nameLabel = "description";
            }
        }
        // download text file for display if that's the document to be opened
        if (this.state.currDoc && doc.fileType === "TXT") {
            this.props.downloadFile(this.state.filePath, (textFile) => this.setState({textFile}), this.props.ajaxErrorHandler);   
        }
		return (
            <Module title="Documents" buttonActions={[
                this.toggleDisplayType, 
                this.state.clickSelection && this.state.currProject ? this.viewDocumentHistory : null
            ]} displayType={this.state.displayType}>
                <Breadcrumbs breadcrumbs={
                    [
                        client ? {text:"Home", clickHandler:() => this.setCurrentSelections(null, null, null)} : null, 
                        client ? {text:client.clientName, clickHandler:() => this.setCurrentSelections(false, null, null)} : null, 
                        project ? {text:project.name, clickHandler:() => this.setCurrentSelections(false, false, null)} : null,
                        doc ? {text:doc.description, clickHandler:null} : null,
                        this.state.currDocHistory ? {text:"History", clickHandler:null} : null
                    ]
                }/>
                {!this.state.currDoc && !this.state.currDocHistory ? (
                    <IconLinkList 
                    list={list} 
                    type={listType}
                    nameLabel={nameLabel}
                    selection={this.state.clickSelection}
                    displayType={this.state.displayType}
                    iconClickHandler={this.iconClickHandler}
                    dblClickHandler={dblClickHandler}/>
                ) : null }
                {this.state.currDoc && !this.state.currDocHistory ? (
                    // Object element for rendering PDFs, otherwise, will display a link to download the non-PDF file
                    <object
                    className="frame"
                    data={"/document-files" + this.state.filePath} 
                    type={doc.fileType === "PDF" ? "application/pdf" : "application/octet-stream"}
                    title={"Current Document: " + doc.description + "." + doc.fileType.toLowerCase()}>
                        {doc.fileType === "TXT" ? (
                            <div id="text-file">
                                {this.state.textFile}
                            </div>
                         ) : (
                            <div id="download-prompt">
                                This file could not be loaded or cannot be previewed online, click below to download and open locally.
                                <button className="color-button button-ok" onClick={() => this.props.downloadFile(this.state.filePath, null, this.props.ajaxErrorHandler)}>Download</button>
                            </div>
                         )}
                    </object>
                ) : null}
                {(this.state.currDoc || (this.state.currProject && this.state.clickSelection)) && this.state.currDocHistory ? (
                    <DocumentHistory actionList={this.state.currDocHistory}/>
                ) : null}
            </Module>
        );
	}
}

DocumentsModule.propTypes = {
    clients:PropTypes.objectOf(PropTypes.object),
    ajaxErrorHandler:PropTypes.func,
    getProjects:PropTypes.func.isRequired,
    getDocuments:PropTypes.func.isRequired,
    openDocument:PropTypes.func.isRequired,
    downloadFile:PropTypes.func.isRequired,
    getDocumentHistory:PropTypes.func.isRequired
    //checkCacheTime:PropTypes.func.isRequired
}

export default DocumentsModule;