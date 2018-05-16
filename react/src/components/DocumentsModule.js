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

    toggleDisplayType = function toggleDisplayType() {
        this.setState({
            displayType:this.state.displayType === "grid-view" ? "list-view" : "grid-view"
        });
    }.bind(this);

	render() {
        const clients = this.props.clients;
		return (
            <Module title="Documents" buttonActions={[this.toggleDisplayType]} displayType={this.state.displayType}>
                <ul className={this.state.displayType}>
                { clients.map((client, index) => {
                    return <li key={client.id}>
                        {client.clientName}<br/><span className="account-number">{this.state.displayType === "list-view" ? client.id : null}</span>
                    </li>;
                })}
                </ul>
            </Module>
        );
	}
}

DocumentsModule.propTypes = {
	clients:PropTypes.array,
}

export default DocumentsModule;