import React from 'react';
import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import DocumentsModule from 'components/DocumentsModule';

describe("DocumentsModule", () => {
    /* ==== MOCKS ==== */
    const getProjects = jest.fn();
    const getDocuments = jest.fn();
    const openDocument = jest.fn((id) => this.setState(
        {filePath:"/Users/Ozzy/Desktop/sas/[100000] Ozzy Perez/[Tax Return] 2017 Form 1040/[ASDFHOWEOUH][Notes][2017] notes.txt"}
    ));
    const downloadFile = jest.fn();
    const ajaxErrorHandler = jest.fn();
    const documents = {
        "AAAAAAAAAAA":{
            accessLevel:"PUBLIC",
            action:[],
            category:{description:"Workpapers", id:3},
            description:"file2",
            fileType:"PDF",
            id:"AAAAAAAAAAA",
            year:2017
        },
        "ASDFHOWEOUH":{
            accessLevel:"PUBLIC",
            action:[],
            category:{description:"Notes", id:4},
            description:"notes",
            fileType:"TXT",
            id:"ASDFHOWEOUH",
            year:2017
        },
        "BBBBBBBBBBB":{
            accessLevel:"PUBLIC",
            action:[],
            category:{description:"Workpapers", id:3},
            description:"file2",
            fileType:"EXCEL",
            id:"BBBBBBBBBBB",
            year:2017
        },
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
    const documentsModule = 
    <DocumentsModule 
    clients={clients} 
    getProjects={getProjects} 
    getDocuments={getDocuments} 
    openDocument={openDocument} 
    downloadFile={downloadFile}
    ajaxErrorHandler={ajaxErrorHandler}/>;

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

    it("Should render file path correctly after double-clicking an icon", () => {
        expect(componentWrapper.find("#breadcrumb-slider").children().length).toBe(0);
        componentWrapper.find("li").at(0).simulate("doubleClick");
        expect(componentWrapper.find("#breadcrumb-slider").children().at(0).text()).toBe("Home");
        expect(componentWrapper.find("#breadcrumb-slider").children().at(1).text()).toBe("Alondra Perez");
        componentWrapper.find("li").at(0).simulate("doubleClick");
        expect(componentWrapper.find("#breadcrumb-slider").children().at(2).text()).toBe("2017 Form 1040");
    });

    it ("Should render download button if file is not PDF and call downloadFile() when button is clicked", () => {
        componentWrapper.setState({
            currClient:"100000", 
            currProject:1, 
            currDoc:"BBBBBBBBBBB", 
            filePath:"path/to/file.xlsx"
        });
        componentWrapper.find("#download-prompt .color-button").at(0).simulate("click");
        expect(downloadFile).toBeCalledWith("path/to/file.xlsx", null, ajaxErrorHandler);
    });

    it("Should display text from a text file once it has been received", () => {
        componentWrapper.setState({currClient:"100000", currProject:1, currDoc:"ASDFHOWEOUH", textFile:"Testing!"})
        expect(componentWrapper.find("#text-file").text()).toBe("Testing!");
    });

    it("Should go to previous level in list hierarchy when clicking on a breadcrumb", () => {
        componentWrapper.find("li").at(0).simulate("doubleClick");
        componentWrapper.find("#breadcrumb-slider > div").at(0).simulate("click");
        expect(componentWrapper.find("li").at(0).text()).toBe("Alondra Perez");
    });
});