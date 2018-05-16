import React from 'react';
import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import Module from 'components/Module';

describe("Module", () => {
    /* ==== MOCKS ==== */
    const test = jest.fn(function test() {});

    /* ==== COMPONENT ==== */
    let componentWrapper = null;
	const module = <Module title="Sample Module" buttonActions={[test]}><div></div></Module>;

	beforeAll(() => {
		configure({adapter:new Adapter()})
    });
    
    beforeEach(() => componentWrapper = shallow(module));

	it("Should render correctly", () => {	
		expect(toJson(componentWrapper)).toMatchSnapshot();
    });
    
    it("Should execute designated functions when clicking button on toolbar", () => {
        componentWrapper.find("button").at(0).simulate('click');
        expect(test).toBeCalled();
    });
});