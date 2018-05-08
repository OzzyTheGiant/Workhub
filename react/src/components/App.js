import React, { Component } from 'react';
import 'css/main-styles.css';
import Header from 'components/Header';
import ModuleContainer from 'components/ModuleContainer';
import DocumentModule from 'components/DocumentModule';

class App extends Component {
	constructor() {
		super();
		this.state = {
			currentModule:{
				title:"Documents",
				component:<DocumentModule/>,
			},
			moduleData:{
				currentDocument: null
			}
		};
	}

 	render() {
		return (
			<div className="App">
				<Header/>
				<ModuleContainer title={this.state.currentModule.title} >
				{this.state.currentModule.component}
				</ModuleContainer>
			</div>
		);
  	}
}

export default App;