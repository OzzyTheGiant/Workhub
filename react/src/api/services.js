import ajax from 'api/ajax-manager';
import qs from 'qs';

const services = {
	login:(data, successHandler, errorHandler) => ajax.post("login", qs.stringify(data), {
		withCredentials:false,
		headers: {'Content-Type':'application/x-www-form-urlencoded'}
    }).then(response => successHandler()).catch(error => errorHandler(error)),

    logout:(successHandler, errorHandler) => ajax.get("logout", {
        withCredentials:false
    }).then(response => successHandler()).catch(error => errorHandler(error)),

    getClients:(successHandler, errorHandler) => ajax.get("clients")
    .then(response => successHandler(response.data)).catch(error => errorHandler(error)),
    
    getProjectsByClientID:(clientID, successHandler, errorHandler) => ajax.get(`clients/${clientID}/projects`)
    .then(response => successHandler(response.data)).catch(error => errorHandler(error)),

    getDocumentsByProjectID:(projectID, successHandler, errorHandler) => ajax.get(`projects/${projectID}/documents`)
    .then(response => successHandler(response.data)).catch(error => errorHandler(error)),
    
    openDocument:(docID, successHandler, errorHandler) => ajax.get(`documents/${docID}/open`, {responseType:'text'})
    .then(response => successHandler(response.data)).catch(error => errorHandler(error))
};

export default services;

