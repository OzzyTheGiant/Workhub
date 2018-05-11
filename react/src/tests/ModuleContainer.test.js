import React from 'react';
import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import ModuleContainer from 'components/ModuleContainer';

describe("ModuleContainer", () => {
	/* ==== COMPONENT ==== */
	const moduleContainer = <ModuleContainer title="Sample Module"><div></div></ModuleContainer>;

	beforeAll(() => {
		configure({adapter:new Adapter()})
	});

	it("Should render correctly", () => {
		const componentWrapper = shallow(moduleContainer);
		expect(componentWrapper.find("h1").text()).toBe("Sample Module");
		expect(componentWrapper.childAt(1).is("div")).toBe(true);
	});
});
