import React from 'react';
import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import LoginModule from 'components/LoginModule';
jest.mock('api/services');
import services from 'api/services';

describe('LoginModule', () => {
	let appState = {}, errorHandler = jest.fn(() => appState.notification = {type:"error", text:"Login Error: Username or password is incorrect!"});
	/* ==== MOCKs ==== */
	const updateState = jest.fn().mockImplementation((newState) => {
		appState = {...appState, ...newState};
	});
	const updateModuleState = jest.fn().mockImplementation((newState) => {
		/* update app's state, stored in appState variable */
		appState.currentModule = {...appState.currentModule, ...newState};
	});
	const serviceCaller = jest.fn().mockImplementation(function(service, postData) {
		/* when testing componentDidMount(), instead of calling App's method, it calls this function
			* which will return fake data from mock services module. Instead of setting props directly on currentWrapper,
			* due to circular reference issues and componentWrapper being null at the time of creating the successHandler function,
			* a brand new component and wrapper will have to be instantiated but with previous component's props */
		switch(service) {
			case "login": services.login({
				data:{username:appState.currentModule.username, password:appState.currentModule.password},
				successHandler:updateState,
				errorHandler
			}); break;
		} 
	});

    /* ==== COMPONENT ==== */
	const initComponent = () => {
		return (
			<LoginModule
			notification={{}}
			serviceCaller={serviceCaller}
			updateModuleState={updateModuleState} 
			currentModule={{
				name:"login",
				username:null,
				password:null
			}}/>
		);
	};
    let componentWrapper = null, loginModule = null;

	beforeAll(() => {
		configure({adapter:new Adapter()})
	});

	beforeEach(() => {
		loginModule = initComponent()
		componentWrapper = shallow(loginModule)
		appState = {...loginModule.props, isLoggedIn:false};
	});

	afterEach(() => {
		appState.username = appState.password = componentWrapper =  null;
	});

	it("Should render correctly", () => {
		const wrapper = mount(initComponent());
		let jsonComponent = toJson(wrapper);
		expect(jsonComponent.type).toBe('LoginModule');
		expect(jsonComponent.children[0].type).toBe('div');
		expect(jsonComponent).toMatchSnapshot();
	});

	it("Should update state when username or password is typed in", () => {
		componentWrapper.find('input[type="text"]').simulate('change', {target:{value:"OzzyTheGiant"}});
		componentWrapper.find('input[type="password"]').simulate('change', {target:{value:"1234567"}});
		componentWrapper.setProps(appState);
		expect(componentWrapper.instance().props.currentModule.username).toBe('OzzyTheGiant');
		expect(componentWrapper.instance().props.currentModule.password).toBe('1234567');
	});

	it("Should call login service with credentials and handlers on form submission", () => {
		componentWrapper.find('[type="text"]').simulate('change', {target:{value:"OzzyTheGiant"}});
       	componentWrapper.find('[type="password"]').simulate('change', {target:{value:"1234567"}});
		componentWrapper.find('form').simulate('submit');
		expect(services.login).toBeCalledWith({data:{username:"OzzyTheGiant", password:"1234567"}, successHandler:updateState, errorHandler});
		expect(appState.isLoggedIn).toBe(true);
		expect(appState.currentModule).toEqual({
			name:"documents",
			listType:"clients",
			filePath:null,
			textFileData:null,
			parentId:null
		});
	});

	it('Should call onFailedLogin() and display Notification with error message if login failed', () => {
		componentWrapper.find('[type="text"]').simulate('change', {target:{value:"OzzyTheGiant"}});
        componentWrapper.find('[type="password"]').simulate('change', {target:{value:"1234"}});
		componentWrapper.find('form').simulate('submit');
		componentWrapper.setProps(appState);
		expect(componentWrapper.find('Notification').prop("text")).toBe("Login Error: Username or password is incorrect!");
		expect(componentWrapper.find('Notification').prop("type")).toBe("error");
	});
});

