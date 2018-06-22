import React from "react";
import PropTypes from "prop-types";
import Module from "components/Module";
import Breadcrumbs from "components/Breadcrumbs";
import IconLinkList from "components/IconLinkList";
import DocumentHistory from "components/DocumentHistory";
import Document from "components/Document";

class DocumentsModule extends React.Component {
	componentDidMount() { 
		/* ajax request clients, projects, and documents as soon as module loads on app startup */
		if (!this.props.clients) this.props.serviceCaller("getClients");
		if (!this.props.projects) this.props.serviceCaller("getProjects");
		if (!this.props.documents) this.props.serviceCaller("getDocuments"); 
	}

    iconClickHandler = (event) => { // hold the id of the entity on global state for usage
    	this.props.updateGlobalState({clickSelection:event.currentTarget.dataset.id});
	};

	navigationHandler = function navigationHandler(event, id) { 
		let depth, listType; // depth determines how many breadcrumbs there will be, listType will be the next list to be rendered after event handling
		if (event.target.tagName === "BUTTON") { // check to see if this was part of the viewDocumentHistory button event handler
			depth = 5;
		} else if (event.target.parentNode.id === "breadcrumb-slider") { // check if function was called from a breadcrumb
			let level = parseInt(event.target.dataset.level, 10); // all data from DOM objects is in strings
			if (level === this.props.breadCrumbs.length) return; // cancel event if breadcrumb clicked is for the same level in the folder traversal
			depth = level === 1 ? 0 : level // if the first breadcrumb was clicked, all breadcrumbs should be removed, hence depth of 0
		} else {
			switch (this.props.currentModule.listType) { // if function called from icon double click, then an additional crumb will be added
				case "documents": depth = 4; break;
				case "projects": depth = 3; break;
				case "clients": default: depth = 2; break;
			}
		}
		switch(depth) { // determine the next list to be rendered based on depth
			case 2: listType = "projects"; break;
			case 3: listType = "documents"; break;
			case 4: listType = null; this.props.serviceCaller("openDocument", this.props.clickSelection || this.props.currentModule.parentId); break;
			case 5: listType = null; break;
			case 0: default: listType = "clients"; break;
		}
		this.props.updateGlobalState((prevState, props) => { // update state in App
			return { // 1st line below is CRUCIAL: clickSelection id will be provided after clicking an icon once, and if the event comes from a BreadCrumb, it will used the id passed at time of crumb creation
				breadCrumbs:this.generateBreadCrumbs(depth, prevState.clickSelection || id),
				documentHistory:[],
				clickSelection:null,
				currentModule:{
					...prevState.currentModule,
					listType,
					textFileData:listType === null ? prevState.textFileData : null,
					filePath:null,
					parentId:prevState.clickSelection || id// same as how bread crumbs are generated above, but this will determine which list to render next regardless of traversal
				}
			}
		});
	}.bind(this);

	generateBreadCrumbs = (depth, entityId) => {
		let breadCrumbs;
		if (this.props.breadCrumbs.length === depth) {
			return this.props.breadCrumbs; // basically stop the function from doing anything if on the same folder level
		} else if (this.props.breadCrumbs.length > depth && depth !== 1) {
			breadCrumbs = [...this.props.breadCrumbs].slice(0, depth); // remove crumbs if going back up a number of levels
		} else {
			breadCrumbs = [...this.props.breadCrumbs] // add more breadcrumbs if going down to the next folder level, depending on depth; entity IDs will be different for each crumb (captured by closures)
			if (depth === 2) breadCrumbs.push({text:"Home", clickHandler:(e) => this.navigationHandler(e, entityId)});
			if (depth === 2) breadCrumbs.push({text:this.props.clients[entityId].clientName, clickHandler:(e) => this.navigationHandler(e, entityId)});
			if (depth === 3) breadCrumbs.push({text:this.props.projects[entityId].name, clickHandler:(e) => this.navigationHandler(e, entityId)});
			if (depth >= 4 && this.props.breadCrumbs.length < 4) breadCrumbs.push({text:this.props.documents[entityId].description, clickHandler:(e) => this.navigationHandler(e, entityId)});
			if (depth === 5) breadCrumbs.push({text:"History", clickHandler:null});
		} return breadCrumbs;
	};

	generateButtonActions = () => [ // the functions that will be called on click for each toolbar button
		this.props.currentModule.listType ? this.toggleIconView : null, // button is only available for folder lists
		(this.props.currentModule.listType === null && this.props.documentHistory.length === 0 ) || // button available only if selecting or viewing a document
		(this.props.currentModule.listType === "documents" && this.props.clickSelection) ? 
			this.viewDocumentHistory : null
	];

	toggleIconView = function toggleIconView () { 
		this.props.updateGlobalState({
			iconDisplayType:this.props.iconDisplayType === "grid-view" ? "list-view" : "grid-view"
		});
	}.bind(this);

	displayList = (args) => { // args: data, filterId, filterKey
		/* filters a list based on the id and id label specifed */
		let filteredData = {};
		if (args.filterId) {
			for (var entityId in args.data) {
				if (args.data[entityId][args.filterKey].toString() === args.filterId) filteredData[entityId] = args.data[entityId];
			}
			return filteredData;
		}
		return args.data;
	};
	
	viewClientList = function viewClientList(event) {
		/* call displayList() to view client list (will just return the list provided) */
		return this.displayList({data:this.props.clients});
	}.bind(this);
	
    viewProjectListByClientId = id => {
		/* call displayList() to get projects by client ID passed in after a double click */
		return this.displayList({
			data:this.props.projects, 
			filterId:id, 
			filterKey:"client"
		});
    };
	
    viewDocListByProjectId = id => {
		/* call displayList() to get documents by project ID passed in after a double click */
		return this.displayList({
			data:this.props.documents,
			filterId:id, 
			filterKey:"project"
		});
    };

    viewDocumentHistory = function viewDocumentHistory(e) {
		/* fetch document action history for a particular document */
		// since the function can be called when the document is selected and when viewing, the id will be in a different place each time
		this.navigationHandler(e, this.props.clickSelection || this.props.currentModule.parentId); 
		if (this.props.documentHistory.length === 0) {
			this.props.serviceCaller("getDocumentHistory", this.props.clickSelection || this.props.currentModule.parentId);
		}
	}.bind(this);

    render() {
		let list, nameLabel;
		switch(this.props.currentModule.listType) {
			case "clients":
				list = this.props.clients; nameLabel = "clientName"; break;
			case "projects":
				list = this.viewProjectListByClientId(this.props.currentModule.parentId); nameLabel = "name"; break;
			case "documents":
				list = this.viewDocListByProjectId(this.props.currentModule.parentId); nameLabel = "description"; break;
			default: break;
		}

    	return (
    		<Module title="Documents" buttonActions={this.generateButtonActions()} iconDisplayType={this.props.iconDisplayType}>
    			<Breadcrumbs breadcrumbs={this.props.breadCrumbs}/>
    			{this.props.currentModule.listType && this.props.documentHistory.length === 0 ? (
    				<IconLinkList 
					list={list} 
					type={this.props.currentModule.listType}
					nameLabel={nameLabel}
					clickSelection={this.props.clickSelection}
					displayType={this.props.iconDisplayType}
					iconClickHandler={this.iconClickHandler}
					iconDoubleClickHandler={this.navigationHandler}/>
    			) : null }
    			{!this.props.currentModule.listType && this.props.documentHistory.length === 0 ? (
					<Document 
					fileName={this.props.documents[this.props.currentModule.parentId].description} 
					fileType={this.props.documents[this.props.currentModule.parentId].fileType} 
					filePath={this.props.currentModule.filePath} 
					textFile={this.props.currentModule.textFileData} 
					downloadDocument={() => this.props.serviceCaller("downloadFile", this.props.clickSelection)}/>
    			) : null}
    			{this.props.documentHistory.length > 0 ? (
    				<DocumentHistory historyList={this.props.documentHistory}/>
    			) : null}
    		</Module>
    	);
    }
}

DocumentsModule.propTypes = {
	clients:PropTypes.objectOf(PropTypes.object),
	projects:PropTypes.objectOf(PropTypes.object),
	documents:PropTypes.objectOf(PropTypes.object),
	documentHistory:PropTypes.arrayOf(PropTypes.object),
	clickSelection:PropTypes.any,
	currentModule:PropTypes.object.isRequired,
	serviceCaller:PropTypes.func.isRequired,
	updateGlobalState:PropTypes.func.isRequired,
	updateModuleState:PropTypes.func
};

export default DocumentsModule;