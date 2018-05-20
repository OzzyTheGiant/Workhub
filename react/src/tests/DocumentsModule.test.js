import React from 'react';
import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import DocumentsModule from 'components/DocumentsModule';

describe("DocumentsModule", () => {
    /* ==== MOCKS ==== */
    const getProjects = jest.fn();
    const getDocuments = jest.fn();
    const documents = {
        "AAAAAAAAAAA":{
            accessLevel:"PUBLIC",
            action:[],
            category:{description:"Workpapers", id:3},
            description:"file2",
            fileType:"PDF",
            id:"AAAAAAAAAAA",
            year:2017
        }
    }
    const projects = {
        1:{
            category:{description:"Tax Return", id:1},
            dateCreated:"2018-04-26T19:58:20.000+0000",
            dateDue:"2017-04-15",
            id:1,
            name:"2017 Form 1040",
            documents:{...documents}
        }
    }
    const clients = {
        "100000":{id:"100000", clientName: "Ozzy Perez", projects:{...projects}},
        "100001":{id:"100001", clientName: "Alondra Perez", projects:{...projects}}
    };

    /* ==== COMPONENT ==== */
    let componentWrapper = null;
	const documentsModule = <DocumentsModule clients={clients} getProjects={getProjects} getDocuments={getDocuments}/>

	beforeAll(() => {
		configure({adapter:new Adapter()})
    });
    
    beforeEach(() => {
        componentWrapper = mount(documentsModule);
    });

	it("Should render folder lists correctly", () => {
		expect(toJson(componentWrapper)).toMatchSnapshot();
    });

    it("Should render file lists correctly", () => {
        componentWrapper.find("li").at(0).simulate("doubleClick");
        componentWrapper.find("li").at(0).simulate("doubleClick");
        expect(toJson(componentWrapper)).toMatchSnapshot();
    })
    
    it("Should change icon view and show/hide details when clicking toggleDisplayType button", () => {
        expect(componentWrapper.find("ul").prop("className")).toBe("grid-view");
        componentWrapper.find("button").at(0).simulate('click');
        expect(componentWrapper.find("ul").prop("className")).toBe("list-view");
        expect(componentWrapper.find(".details").at(0).find("p").at(0).text()).toBe("100001");
        componentWrapper.find("button").at(0).simulate('click');
        expect(componentWrapper.find("ul").prop("className")).toBe("grid-view");
        expect(componentWrapper.find(".details").children().length).toBe(0);
    });

    it("Should render projects after double-clicking a client", () => {
        componentWrapper.find("li").at(0).simulate("doubleClick");
        expect(getProjects).toBeCalledWith("100001");
        expect(componentWrapper.state("currClient")).toBe("100001");
        expect(componentWrapper.find("li").at(0).prop("title")).toBe("2017 Form 1040");
    });

    it("Should render documents after double-clicking a project", () => {
        componentWrapper.find("li").at(0).simulate("doubleClick");
        componentWrapper.find("li").at(0).simulate("doubleClick");
        expect(getDocuments).toBeCalledWith("100001", "1");
        expect(componentWrapper.state("currProject")).toBe("1");
        expect(componentWrapper.find("li").at(0).prop("title")).toBe("file2");
    });
});