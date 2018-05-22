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
            currDoc:null,
            filePath:null,
        };
    }

    toggleDisplayType = function toggleDisplayType() {
        this.setState({
            displayType:this.state.displayType === "grid-view" ? "list-view" : "grid-view"
        });
    }.bind(this);

    openDocument = (id) => {
        this.props.openDocument(id, (filePath) => this.setState({filePath, currDoc:id}), this.props.ajaxErrorHandler);
    }

	render() {
        let list = null, doc = null;
        if (this.state.currClient) {
            if (this.state.currProject) {
                if (this.state.currDoc) {
                    let document = this.props.clients[this.state.currClient].projects[this.state.currProject].documents[this.state.currDoc]
                    doc = <object data={"/document-files" + this.state.filePath} type="application/pdf" title={"Current Document: " + document.description + "." + document.fileType.toLowerCase()}></object>;
                } else {
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
                            dblClickHandler={() => this.openDocument(id)} 
                            name={this.props.clients[this.state.currClient].projects[this.state.currProject].documents[id].description}
                            view={this.state.displayType}/>
                        );
                    });
                }
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
        if (list) list.sort((a, b) => {
            if (a.props.name < b.props.name) return -1;
            if (b.props.name < a.props.name) return 1;
            return 0;
        });
		return (
            <Module title="Documents" buttonActions={[this.toggleDisplayType]} displayType={this.state.displayType}>
                <div id="breadcrumb">
                    <div id="breadcrumb-slider">
                        {this.state.currClient ? <div onClick={() => this.setState({currClient:null, currProject:null, currDoc:null})}>Home</div> : null}
                        {this.state.currClient ? (
                            <div onClick={() => this.setState({currProject:null, currDoc:null})}>
                                {this.props.clients[this.state.currClient].clientName}
                            </div>
                        ) : null }
                        {this.state.currProject ? (
                            <div onClick={() => this.setState({currDoc:null})}>
                                {this.props.clients[this.state.currClient].projects[this.state.currProject].name}
                            </div>
                        ) : null }
                        {this.state.currDoc ? (
                            <div>
                                {this.props.clients[this.state.currClient].projects[this.state.currProject].documents[this.state.currDoc].description}
                            </div>
                        ) : null }
                    </div>
                </div>
                <ul className={this.state.displayType}>{list}</ul>
                {doc}
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