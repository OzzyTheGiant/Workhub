import React, { Component } from 'react';
import 'css/main-styles.css';
import Header from 'components/Header';
import LoginView from 'components/LoginView';
import ModuleContainer from 'components/ModuleContainer';
import DocumentModule from 'components/DocumentModule';
import axios from 'axios';

class App extends Component {
//	constructor() {
//		super();
//		this.state = {
//			currentModule:{
//				title:"Documents",
//				component:<DocumentModule/>,
//			},
//			moduleData:{
//				clientsList: null,
//				currentDocument: null
//			}
//		};
//	}

//	componentDidMount() {
//		axios.get("/clients")
//		.then((response) => {
//			this.setState({
//				currentModule:this.state.currentModule,
//				moduleData:{
//					clientsList:response,
//					currentDocument:null
//				}
//			});
//		});
//	}

 	render() {
 		return (
 			<div className="App">
 				<LoginView />
 				<footer>&copy; 2018 Salinas, Allen & Schmitt, LLP. All Rights Reserved</footer>
 			</div>
 		);
//		return (
//			<div className="App">
//				<Header/>
//				<ModuleContainer title={this.state.currentModule.title} >
//				{this.state.currentModule.component}
//				</ModuleContainer>
//			</div>
//		);
  	}
}

export default App;