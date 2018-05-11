import React from 'react';
import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import Header from 'components/Header';

describe("Header", () => {
	/* ==== COMPONENT ==== */
	const header = <Header/>

	beforeAll(() => {
		configure({adapter:new Adapter()})
	});

	it("Should render correctly", () => {
		const componentWrapper = mount(header);
		let jsonComponent = toJson(componentWrapper);
   		expect(jsonComponent.type).toBe('Header');
   		expect(jsonComponent.children[0].type).toBe('header');
        expect(jsonComponent).toMatchSnapshot();
	});
});
