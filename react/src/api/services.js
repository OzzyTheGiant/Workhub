import ajax from 'api/ajax-manager';
import qs from 'qs';

const services = {
	login:(data, successHandler, errorHandler) => {
		ajax.post("login", qs.stringify(data), {withCredentials:false})
		.then(response => successHandler(response))
		.catch(error => errorHandler(error));
	}
};

export default services;

