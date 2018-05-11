import React, { Component } from 'react';
import 'css/main-styles.css';
import Header from 'components/Header';
import LoginView from 'components/LoginView';
import ModuleContainer from 'components/ModuleContainer';
import DocumentModule from 'components/DocumentModule';
import services from 'api/services';

class App extends Component {
	constructor() {
		super();
		this.state = {
			isLoggedIn:false,
			currentModule:{
				title:null,
				component:null
			},
			moduleData:null
		};
	}

	initApplication = () => {
		this.setState({
			isLoggedIn:true,
			currentModule:{
				title:"Documents",
				component:<DocumentModule/>
			},
			moduleData:null
		});
	}

 	render() {
 		const view = this.state.isLoggedIn ? (
			<ModuleContainer title={this.state.currentModule.title}>
			{this.state.currentModule.component}
			</ModuleContainer>
		) : (
			<LoginView initApplication={this.initApplication} login={services.login}/>
		);
 		return (
 			<div className="App">
 				{this.state.isLoggedIn ? <Header/> : null}
 				{view}
 				<footer>&copy; 2018 Salinas, Allen & Schmitt, LLP. All Rights Reserved</footer>
 			</div>
 		);
  	}
}

export default App;