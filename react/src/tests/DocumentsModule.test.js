import React from 'react';
import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import DocumentsModule from 'components/DocumentsModule';
jest.mock('api/services');
import services from 'api/services';

describe("DocumentsModule", () => {
	// appState represents state in App component, which is a placeholder for props to rerender the component
	let componentWrapper = null, documentsModule = null, appState = {}, errorHandler = jest.fn();
	/* ==== MOCKS ==== */
	const updateGlobalState = jest.fn().mockImplementation((props) => {
		/* update app's state, stored in appState variable */
		if (typeof props === "function") {
			appState = {...appState, ...props(appState)};
		} else {
			appState = {...appState, ...props};
		}
	});
	const serviceCaller = jest.fn().mockImplementation(function(service, postData) {
		/* when testing componentDidMount(), instead of calling App's method, it calls this function
			* which will return fake data from mock services module. Instead of setting props directly on currentWrapper,
			* due to circular reference issues and componentWrapper being null at the time of creating the successHandler function,
			* a brand new component and wrapper will have to be instantiated but with previous component's props */
		switch(service) {
			case "getClients": services.getClients({
				successHandler:data => appState.clients = data.clients,
				errorHandler
			}); break;
			case "getProjects": services.getProjects({
				successHandler:data => appState.projects = data.projects,
				errorHandler
			}); break;
			case "getDocuments": services.getDocuments({
				successHandler:data => appState.documents = data.documents,
				errorHandler
			}); break;
			case "openDocument": services.openDocument({
				data:postData,
				successHandler:updateGlobalState,
				errorHandler
			}); break;
			case "downloadFile": services.downloadFile({
				data:postData,
				successHandler:updateGlobalState,
				errorHandler
			}); break;
			case "getDocumentHistory": services.getDocumentHistory({
				data:postData,
				successHandler:data => appState.documentHistory = data.documentHistory,
				errorHandler
			})
		} 
	});

    /* ==== COMPONENT ==== */
	let initComponent = () => {
		return (
			<DocumentsModule 
			clients={null}
			projects={null}
			documents={null}
			documentHistory={[]}
			breadCrumbs={[]}
			clickSelection={null}
			iconDisplayType={"grid-view"}
			currentModule={{
				name:"documents",
				listType:"clients",
				filePath:null,
				textFileData:null,
				parentId:null
			}}
			serviceCaller={serviceCaller}
			updateGlobalState={updateGlobalState}
			updateModuleState={jest.fn()}/> // updateModuleState is never used, so for now we will mock it
		)
	};

	beforeAll(() => {
		configure({adapter:new Adapter()});
    });
    
    beforeEach(() => {
		documentsModule = initComponent();
		appState = {...documentsModule.props};
		componentWrapper = mount(documentsModule);
		if (appState.clients) componentWrapper.setProps({clients:appState.clients});
		if (appState.projects) componentWrapper.setProps({projects:appState.projects});
		if (appState.documents) componentWrapper.setProps({documents:appState.documents});
	});
	
	afterEach(() => {
		appState.clients = appState.projects = appState.documents = componentWrapper = documentsModule =  null;
	});

	it("Should render folder lists correctly", () => {
		expect(toJson(componentWrapper)).toMatchSnapshot();
    });

	/* instance() calls used to be "doubleClick" simulators but broke because event.currentTarget doesn't work
	 * which is then followed by .setProps() to update the component */
    it("Should render file lists correctly", () => {
		componentWrapper.instance().iconClickHandler({currentTarget:{dataset:{id:"100000"}}});
		componentWrapper.find(".grid-view li").at(0).simulate("doubleClick");
		componentWrapper.setProps(appState);
		componentWrapper.instance().iconClickHandler({currentTarget:{dataset:{id:"1"}}});
        componentWrapper.find(".grid-view li").at(0).simulate("doubleClick");
		componentWrapper.setProps(appState);
        expect(toJson(componentWrapper)).toMatchSnapshot();
    })
    
    it("Should change icon view and show/hide details when clicking toggleIconView button", () => {
		expect(componentWrapper.find("ul").prop("className")).toBe("frame grid-view");
		componentWrapper.find("button").at(0).simulate('click');
		componentWrapper.setProps(appState);
		expect(componentWrapper.find("ul").prop("className")).toBe("frame list-view");
        expect(componentWrapper.find(".details p").at(0).text()).toBe("100001");
		componentWrapper.find("button").at(0).simulate('click');
		componentWrapper.setProps(appState);
        expect(componentWrapper.find("ul").prop("className")).toBe("frame grid-view");
        expect(componentWrapper.find(".details").children().length).toBe(0);
    });
	
    it("Should render projects after double-clicking a client", () => {
		componentWrapper.instance().iconClickHandler({currentTarget:{dataset:{id:"100000"}}});
		componentWrapper.find(".grid-view li").at(1).simulate("doubleClick");
		componentWrapper.setProps(appState);
		let currentModule = componentWrapper.prop("currentModule");
		expect(currentModule.listType).toBe("projects")
        expect(currentModule.parentId).toBe("100000");
        expect(componentWrapper.find("li").at(0).prop("title")).toBe("2017 Form 1040");
    });

    it("Should render documents after double-clicking a project", () => {
        componentWrapper.instance().iconClickHandler({currentTarget:{dataset:{id:"100000"}}});
		componentWrapper.find(".grid-view li").at(0).simulate("doubleClick");
		componentWrapper.setProps(appState);
		componentWrapper.instance().iconClickHandler({currentTarget:{dataset:{id:"1"}}});
        componentWrapper.find(".grid-view li").at(0).simulate("doubleClick");
		componentWrapper.setProps(appState);
		expect(appState.currentModule.listType).toBe("documents");
        expect(componentWrapper.prop("currentModule").parentId).toBe("1");
        expect(componentWrapper.find("li").at(0).prop("title")).toBe("file2");
    });

    it("Should render breadcrumbs correctly after double-clicking an icon", () => {
        expect(componentWrapper.find("#breadcrumb-slider").children().length).toBe(0);
		componentWrapper.instance().iconClickHandler({currentTarget:{dataset:{id:"100000"}}});
		componentWrapper.find(".grid-view li").at(1).simulate("doubleClick");
        componentWrapper.setProps(appState);
        expect(componentWrapper.find("#breadcrumb-slider").children().at(0).text()).toBe("Home");
        expect(componentWrapper.find("#breadcrumb-slider").children().at(1).text()).toBe("Ozzy Perez");
        componentWrapper.instance().iconClickHandler({currentTarget:{dataset:{id:1}}});
		componentWrapper.find(".grid-view li").at(0).simulate("doubleClick");
		componentWrapper.setProps(appState);
        expect(componentWrapper.find("#breadcrumb-slider").children().at(2).text()).toBe("2017 Form 1040");
    });

    it ("Should render download button if file is not PDF and call downloadFile() when button is clicked", () => {
		componentWrapper.instance().iconClickHandler({currentTarget:{dataset:{id:"100000"}}});
		componentWrapper.find(".grid-view li").at(1).simulate("doubleClick");
		componentWrapper.setProps(appState);
		componentWrapper.instance().iconClickHandler({currentTarget:{dataset:{id:"1"}}});
        componentWrapper.find(".grid-view li").at(0).simulate("doubleClick");
		componentWrapper.setProps(appState);
		componentWrapper.instance().iconClickHandler({currentTarget:{dataset:{id:"BBBBBBBBBBB"}}});
		componentWrapper.setProps(appState);
		componentWrapper.find(".grid-view li").at(2).simulate("doubleClick");
		componentWrapper.setProps(appState)
		expect(services.openDocument).toBeCalled();
		componentWrapper.find("#download-prompt .color-button").at(0).simulate("click");
		expect(services.downloadFile).toHaveBeenCalledTimes(2);
        expect(services.downloadFile).toBeCalledWith({
			data:"/[100000] Ozzy Perez/[Tax Return] 2017 Form 1040/[BBBBBBBBBBB][Work Papers][2017] file3.xlsx",
			errorHandler,
			successHandler:updateGlobalState
		});
    });

    it("Should display text from a text file once it has been received", () => {
        componentWrapper.instance().iconClickHandler({currentTarget:{dataset:{id:"100000"}}});
		componentWrapper.find(".grid-view li").at(1).simulate("doubleClick");
		componentWrapper.setProps(appState);
		componentWrapper.instance().iconClickHandler({currentTarget:{dataset:{id:"1"}}});
        componentWrapper.find(".grid-view li").at(0).simulate("doubleClick");
		componentWrapper.setProps(appState);
		componentWrapper.instance().iconClickHandler({currentTarget:{dataset:{id:"ASDFHOWEOUH"}}});
		componentWrapper.setProps(appState);
		componentWrapper.find(".grid-view li").at(1).simulate("doubleClick");
		componentWrapper.setProps(appState);
        expect(componentWrapper.find("#text-file").text()).toBe("Testing!");
    });

    it("Should go to previous level in list hierarchy when clicking on a breadcrumb", () => {
		componentWrapper.instance().iconClickHandler({currentTarget:{dataset:{id:"100001"}}});
		componentWrapper.find(".grid-view li").at(0).simulate("doubleClick");
        componentWrapper.setProps(appState);
        componentWrapper.instance().navigationHandler({target:{dataset:{level:"1"}, parentNode:{id:"breadcrumb-slider"}, tagName:"DIV"}}, )
		componentWrapper.setProps(appState);
		expect(appState.currentModule.listType).toBe("clients");
		expect(componentWrapper.find("li").at(0).text()).toBe("Alondra Perez");
    });

    it("Should render document history when clicking toolbar button", () => {
        componentWrapper.instance().iconClickHandler({currentTarget:{dataset:{id:"100000"}}});
		componentWrapper.find(".grid-view li").at(1).simulate("doubleClick");
		componentWrapper.setProps(appState);
		componentWrapper.instance().iconClickHandler({currentTarget:{dataset:{id:"1"}}});
        componentWrapper.find(".grid-view li").at(0).simulate("doubleClick");
		componentWrapper.setProps(appState);
		componentWrapper.instance().iconClickHandler({currentTarget:{dataset:{id:"ASDFHOWEOUH"}}});
		componentWrapper.setProps(appState);
		componentWrapper.find("button").at(1).simulate("click");
		componentWrapper.setProps(appState);
		expect(services.getDocumentHistory).toBeCalled();
        expect(componentWrapper.find("#DocumentHistory").type()).toBe("ol");
        expect(componentWrapper.find("#DocumentHistory > li").length).toBe(2);
    });
});