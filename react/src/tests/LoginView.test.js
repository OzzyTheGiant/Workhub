import React from 'react';
import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import LoginView from 'components/LoginView';

describe('LoginView', () => {
	/* ==== MOCKs ==== */
    const initApplication = jest.fn();
    const login = jest.fn((data, successHandler, errorHandler) => {
    	if (data.username !== "OzzyTheGiant" || data.password !== "1234567") {
    		errorHandler(new Error());
    	} else {
    		successHandler();
    	}
    });

    /* ==== COMPONENT ==== */
    const loginView = <LoginView initApplication={initApplication} login={login}/>;
    let componentWrapper = null;

	beforeAll(() => {
		configure({adapter:new Adapter()})
	});

	beforeEach(() => componentWrapper = shallow(loginView));

	it("Should render correctly", () => {
		const wrapper = mount(loginView);
		let jsonComponent = toJson(wrapper);
		expect(jsonComponent.type).toBe('LoginView');
		expect(jsonComponent.children[0].type).toBe('div');
		expect(jsonComponent).toMatchSnapshot();
	});

	it("Should update state when username or password is typed in", () => {
		componentWrapper.find('input[type="text"]').simulate('change', {target:{value:"OzzyTheGiant"}});
		componentWrapper.find('input[type="password"]').simulate('change', {target:{value:"1234567"}})
		expect(componentWrapper.state('username')).toBe('OzzyTheGiant');
		expect(componentWrapper.state('password')).toBe('1234567');
	});

	it("Should call login service with credentials and handlers on form submission", () => {
		const submitSpy = jest.spyOn(componentWrapper.instance(), 'onLoginFormSubmit');
		componentWrapper.find('[type="text"]').simulate('change', {target:{value:"OzzyTheGiant"}});
       	componentWrapper.find('[type="password"]').simulate('change', {target:{value:"1234567"}});
		componentWrapper.find('form').simulate('submit');
		expect(submitSpy).toBeCalled();
		expect(login).toBeCalledWith(
			{username:"OzzyTheGiant", password: "1234567"},
			componentWrapper.instance().onSuccessfulLogin,
			componentWrapper.instance().onFailedLogin
		);
	});

	it('Should call onFailedLogin() and display Notification with error message if login failed', () => {
		const failSpy = jest.spyOn(componentWrapper.instance(), 'onFailedLogin');
		componentWrapper.find('[type="text"]').simulate('change', {target:{value:"OzzyTheGiant"}});
        componentWrapper.find('[type="password"]').simulate('change', {target:{value:"1234"}});
        componentWrapper.find('form').simulate('submit');
		expect(failSpy).toBeCalled();
		expect(componentWrapper.find('Notification').prop("message")).toBe("Login Error: Username or password is incorrect!");
		expect(componentWrapper.find('Notification').prop("type")).toBe("error");
	});

	it('Should call onSuccessfulLogin() and initApplication() when login is successful', () => {
		const successSpy = jest.spyOn(componentWrapper.instance(), 'onSuccessfulLogin');
		componentWrapper.find('[type="text"]').simulate('change', {target:{value:"OzzyTheGiant"}});
        componentWrapper.find('[type="password"]').simulate('change', {target:{value:"1234567"}});
        componentWrapper.find('form').simulate('submit');
        expect(successSpy).toBeCalled();
		expect(initApplication).toBeCalled();
	});
});

