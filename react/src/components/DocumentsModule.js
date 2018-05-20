import React from 'react';
import PropTypes from 'prop-types';
import Module from 'components/Module';
import IconLink from 'components/IconLink';

class DocumentsModule extends React.Component  {
    constructor() {
        super();
        this.state = {
            displayType:"grid-view",
            currClient:null,
            currProject:null,
            currDoc:null
        };
    }

    toggleDisplayType = function toggleDisplayType() {
        this.setState({
            displayType:this.state.displayType === "grid-view" ? "list-view" : "grid-view"
        });
    }.bind(this);

    openDocument = () => { /* TODO: set open document handler here */}

	render() {
        let list;
        if (this.state.currClient) {
            if (this.state.currProject) {
                list = Object.keys(this.props.clients[this.state.currClient].projects[this.state.currProject].documents || {}).map((id) => {
                    let document = this.props.clients[this.state.currClient].projects[this.state.currProject].documents[id];
                    return ( // documents list
                        <IconLink 
                        key={id}
                        details={{
                            category:document.category.description,
                            year:document.year
                        }}
                        fileType={document.fileType}
                        dblClickHandler={() => {this.setState({currDoc:id}); this.props.openDocument();}} 
                        name={this.props.clients[this.state.currClient].projects[this.state.currProject].documents[id].description}
                        view={this.state.displayType}/>
                    );
                });
            } else {
                list = Object.keys(this.props.clients[this.state.currClient].projects || {}).map((id) => {
                    let project = this.props.clients[this.state.currClient].projects[id];
                    return ( // projects list
                        <IconLink 
                        key={id} 
                        details={{category:project.category.description}}
                        dblClickHandler={() => {this.props.getDocuments(this.state.currClient, id); this.setState({currProject:id});}} 
                        name={project.name} 
                        view={this.state.displayType}/>
                    );
                });
            }
        } else {
            list = Object.keys(this.props.clients).map((id) => {
                return ( // Default clients list
                    <IconLink 
                    key={id}
                    details={{id:id}}
                    dblClickHandler={() => {this.props.getProjects(id); this.setState({currClient:id});}} 
                    name={this.props.clients[id].clientName} 
                    view={this.state.displayType}/>
                );
            });
        }
        list.sort((a, b) => {
            if (a.props.name < b.props.name) return -1;
            if (b.props.name < a.props.name) return 1;
            return 0;
        });
		return (
            <Module title="Documents" buttonActions={[this.toggleDisplayType]} displayType={this.state.displayType}>
                <ul className={this.state.displayType}>{list}</ul>
            </Module>
        );
	}
}

DocumentsModule.propTypes = {
    clients:PropTypes.objectOf(PropTypes.object),
    getProjects:PropTypes.func.isRequired,
    getDocuments:PropTypes.func.isRequired
}

export default DocumentsModule;