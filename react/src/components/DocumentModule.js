import React from 'react';
import PropTypes from 'prop-types';

class DocumentModule extends React.Component  {
    // {
    //     clients:[
    //         {
    //             clientId:1,
    //             projects:[
    //                 {
    //                     projectId:1,
    //                     documents:[
    //                         {
    //                             documentId:1
    //                         }
    //                     ]
    //                 }
    //             ]
    //         }
    //     ]
    // }

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

	render() {
        const clients = this.props.clients;
		return (
            <div id="DocumentModule">
                <ul className="list-view">
                { clients.map((client, index) => <li key={client.id}>{client.clientName}</li>) }
                </ul>
            </div>
        );
	}
}

DocumentModule.propTypes = {
	clients:PropTypes.array,
}

export default DocumentModule;