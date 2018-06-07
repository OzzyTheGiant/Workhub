import React from 'react';
import { configure, mount, shallow, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import App from 'components/App';
import LoginView from 'components/LoginView';
import Header from 'components/Header';
import Module from 'components/Module';
import DocumentsModule from 'components/DocumentsModule';

describe("App", () => {
	/* ==== COMPONENT ==== */
	const app = <App/>;
	let componentWrapper = null;

	/* ==== MOCKS ====*/
    const services = {login: jest.fn()};
    const response = [
        {id:"100000", clientName: "Ozzy Perez"},
        {id:"100001", clientName: "Alondra Perez"}
    ];

	beforeAll(() => configure({adapter:new Adapter()}))
	beforeEach(() => componentWrapper = shallow(app))

	it('Should fully render html without crashing', () => {
		render(app);
	});

	it('Should render LoginView on start up', () => {
		const wrapper = mount(app);
		let jsonComponent = toJson(wrapper);
		expect(jsonComponent.type).toBe('App');
		expect(jsonComponent.children[0].type).toBe('div');
		expect(jsonComponent.children[0].children[0].type).toBe('LoginView');
		expect(jsonComponent).toMatchSnapshot();
	});

	it('Should render DocumentsModule when setClients() is called', () => {
        componentWrapper.setState({isLoggedIn:true});
		componentWrapper.instance().setClients(response);
        componentWrapper.update();
		expect(componentWrapper.find("DocumentsModule").length).toBe(1);
        expect(componentWrapper.state("currentModule")).toBe("documents");
        expect(componentWrapper.state("clients")).toEqual({
            "100000":{id:"100000", clientName: "Ozzy Perez"},
            "100001":{id:"100001", clientName: "Alondra Perez"}
        });
    });
    
    it("Should log out the user when 'Log Out' button is clicked", () => {
        componentWrapper.setState({isLoggedIn:true});
        componentWrapper.instance().setClients(response);
        componentWrapper.update();
        expect(componentWrapper.find("DocumentsModule").length).toBe(1);
        componentWrapper.setState({isLoggedIn:false, currentModule:null, clients:[]});
        componentWrapper.update();
        expect(componentWrapper.find("LoginView").length).toBe(1);
        expect(componentWrapper.find("DocumentsModule").length).toBe(0);
    });
});

