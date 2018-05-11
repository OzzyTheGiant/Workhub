import React from 'react';
import { configure, mount, shallow, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import App from 'components/App';
import LoginView from 'components/LoginView';
import Header from 'components/Header';
import ModuleContainer from 'components/ModuleContainer';
import DocumentModule from 'components/DocumentModule';

describe("App", () => {
	/* ==== COMPONENT ==== */
	const app = <App/>;
	let componentWrapper = null;

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
		console.log(jsonComponent);
		expect(jsonComponent).toMatchSnapshot();
	});
});

