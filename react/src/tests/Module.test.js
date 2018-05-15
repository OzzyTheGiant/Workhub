import React from 'react';
import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import Module from 'components/Module';

describe("Module", () => {
	/* ==== COMPONENT ==== */
	const module = <Module title="Sample Module"><div></div></Module>;

	beforeAll(() => {
		configure({adapter:new Adapter()})
	});

	it("Should render correctly", () => {
		const componentWrapper = shallow(module);
		expect(componentWrapper.find("h1").text()).toBe("Sample Module");
		expect(componentWrapper.childAt(1).is("div")).toBe(true);
	});
});
