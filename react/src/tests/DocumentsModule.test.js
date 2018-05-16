import React from 'react';
import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import DocumentsModule from 'components/DocumentsModule';

describe("DocumentsModule", () => {
    /* ==== MOCKS ==== */
    const test = jest.fn(function test() {});
    const clients = [
        {id:"100000", clientName: "Ozzy Perez"},
        {id:"100001", clientName: "Alondra Perez"}
    ];

    /* ==== COMPONENT ==== */
    let componentWrapper = null;
	const documentsModule = <DocumentsModule clients={clients} />

	beforeAll(() => {
		configure({adapter:new Adapter()})
    });
    
    beforeEach(() => {
        componentWrapper = mount(documentsModule);
    });

	it("Should render correctly", () => {
		expect(toJson(componentWrapper)).toMatchSnapshot();
    });
    
    it("Should change icon view when clicking toggleDisplayType button", () => {
        expect(componentWrapper.find("ul").prop("className")).toBe("grid-view");
        componentWrapper.find("button").at(0).simulate('click');
        expect(componentWrapper.find("ul").prop("className")).toBe("list-view");
        componentWrapper.find("button").at(0).simulate('click');
        expect(componentWrapper.find("ul").prop("className")).toBe("grid-view");
    });
});