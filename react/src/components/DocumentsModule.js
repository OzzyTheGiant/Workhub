import React from 'react';
import PropTypes from 'prop-types';
import Module from 'components/Module';

class DocumentsModule extends React.Component  {
    constructor() {
        super();
        this.state = {displayType:"grid-view"}
    }

    createList = (clientID, projectID) => {
        let data = this.props.clients;
        // let projects;
        if (clientID) { // get list of projects
            data = data.filter(client => client.id === clientID)[0];
            //if (!data.projects) projects = this.props.getProjects(clientID);
            if (projectID) { // get list of documents
                data = data.filter(project => project.id === projectID);
            }
        }
        this.setState(data)
    }

    toggleDisplayType = () => {
        this.setState({
            dipslayType:this.state.displayType === "grid-view" ? "list-view" : "grid-view"
        });
    }

	render() {
        const clients = this.props.clients;
		return (
            <Module title="Documents">
                <ul className={this.state.displayType}>
                { clients.map((client, index) => <li key={client.id}>{client.clientName}</li>) }
                </ul>
            </Module>
        );
	}
}

DocumentsModule.propTypes = {
	clients:PropTypes.array,
}

export default DocumentsModule;