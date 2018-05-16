import ajax from 'api/ajax-manager';
import qs from 'qs';

const services = {
	login:(data, successHandler, errorHandler) => ajax.post("login", qs.stringify(data), {
		withCredentials:false,
		headers: {'Content-Type':'application/x-www-form-urlencoded'}
    }).then(response => successHandler(response)).catch(error => errorHandler(error)),

    logout:(successHandler, errorHandler) => ajax.get("logout", {
        withCredentials:false
    }).then(response => successHandler(response)).catch(error => errorHandler(error)),

    getClients:(successHandler, errorHandler) => ajax.get("clients")
    .then(response => successHandler(response)).catch(error => errorHandler(error))
};

export default services;

