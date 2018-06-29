import React from 'react';
import { configure, mount, shallow, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import App from 'components/App';
/* ==== MOCKS ====*/
jest.mock('api/services');
import services from 'api/services';

describe("App", () => {
	/* ==== COMPONENT ==== */
	let app, componentWrapper = null;

	beforeAll(() => {
		configure({adapter:new Adapter()});
		app = <App services={services}/>;
	})

	beforeEach(() => {
		componentWrapper = mount(app);
	});

	it('Should fully render html without crashing', () => {
		render(app);
	});

	it('Should render LoginModule on start up', () => {
		let jsonComponent = toJson(componentWrapper);
		expect(jsonComponent.type).toBe('App');
		expect(jsonComponent.children[0].type).toBe('AppUserInterface');
		expect(jsonComponent.children[0].children[0].children[0].type).toBe('LoginModule');
		expect(jsonComponent).toMatchSnapshot();
	});

	it('Should render DocumentsModule after logging in', () => {
		componentWrapper.instance().serviceCaller("login", {username:"OzzyTheGiant", password:"1234567"});
		componentWrapper.update();
		expect(componentWrapper.find("DocumentsModule").length).toBe(1);
		expect(services.login).toBeCalled();
		expect(componentWrapper.state("isLoggedIn")).toBe(true);
    });
    
    it("Should log out the user when 'Log Out' button is clicked", () => {
		componentWrapper.instance().serviceCaller("login", {username:"ozzy", password:"12345678"});
		componentWrapper.update();
        componentWrapper.instance().serviceCaller("logout");
		componentWrapper.update();
		expect(services.logout).toBeCalled();
        expect(componentWrapper.find("LoginModule").length).toBe(1);
        expect(componentWrapper.find("DocumentsModule").length).toBe(0);
		expect(componentWrapper.state("isLoggedIn")).toBe(false);
	});
	
	it("Should update state to add clients, projects, and documents when requesting for them", () => {
		componentWrapper.instance().serviceCaller("getClients");
		componentWrapper.update();
		componentWrapper.instance().serviceCaller("getProjects");
		componentWrapper.update();
		componentWrapper.instance().serviceCaller("getDocuments");
		componentWrapper.update();
		expect(services.getClients).toBeCalled();
		expect(services.getProjects).toBeCalled();
		expect(services.getDocuments).toBeCalled();
		expect(Object.keys(componentWrapper.state("clients")).length).toBe(2);
		expect(Object.keys(componentWrapper.state("projects")).length).toBe(1);
		expect(Object.keys(componentWrapper.state("documents")).length).toBe(3);
	});
});

