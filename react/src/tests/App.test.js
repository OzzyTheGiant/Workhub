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

	beforeAll(() => configure({adapter:new Adapter()}))
	beforeEach(() => componentWrapper = shallow(app))

	it('Should fully render html without crashing', () => {
		render(app);
	});

	it('Should render LoginView on start up', () => {
		const wrapper = mount(app)
		let jsonComponent = toJson(wrapper);
		expect(jsonComponent.type).toBe('App');
		expect(jsonComponent.children[0].type).toBe('div');
		expect(jsonComponent.children[0].children[0].type).toBe('LoginView');
		expect(jsonComponent).toMatchSnapshot();
	});

	it('Should render DocumentsModule when initApplication() is called', () => {
		componentWrapper.instance().initApplication();
		componentWrapper.update();
		expect(componentWrapper.find("DocumentsModule").length).toBe(1);
		expect(componentWrapper.state("currentModule")).toBe("documents");
	});
});

