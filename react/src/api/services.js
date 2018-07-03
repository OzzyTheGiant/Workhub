import ajax from 'api/ajax-manager';
import qs from 'qs';
import downloadDocument from 'utilities/document-downloader';

const services = { // all services must return an object literal that will update the state
	login:({data, successHandler, errorHandler}) => ajax.post("login", qs.stringify(data), {
		withCredentials:false,
		headers: {'Content-Type':'application/x-www-form-urlencoded'}
	}).then(response => successHandler({
		isLoggedIn:true,
		currentModule:{
			name:"documents",
			listType:"clients",
			filePath:null,
			textFileData:null,
			parentId:null
		}
	})).catch(error => errorHandler(error)),

    logout:({successHandler, errorHandler}) => ajax.get("logout", {
        withCredentials:false
    }).then(response => successHandler({isLoggedIn:false})).catch(error => errorHandler(error)),

    getClients:({successHandler, errorHandler}) => ajax.get("clients")
    .then(response => { 
		successHandler({clients:response.data.reduce(arrayToObjectConverter, {})});
	}).catch(error => errorHandler(error)),

    getProjects:({successHandler, errorHandler}) => ajax.get("projects")
    .then(response => { 
		successHandler({projects:response.data.reduce(arrayToObjectConverter, {})});
	}).catch(error => errorHandler(error)),
	
	getDocuments:({successHandler, errorHandler}) => ajax.get("documents")
    .then(response => { 
		successHandler({documents:response.data.reduce(arrayToObjectConverter, {})});
	}).catch(error => errorHandler(error)),
	
    // getProjectsByClientID:(clientID, successHandler, errorHandler) => ajax.get(`clients/${clientID}/projects`)
    // .then(response => successHandler(response.data)).catch(error => errorHandler(error)),

    // getDocumentsByProjectID:(projectID, successHandler, errorHandler) => ajax.get(`projects/${projectID}/documents`)
    // .then(response => successHandler(response.data)).catch(error => errorHandler(error)),
    
    openDocument:({data:docID, successHandler, errorHandler}) => ajax.get(`documents/${docID}/open`, {responseType:'text'}) // data is document ID
    .then(response => {
		let filePath = response.data;
		if (filePath.split(".").pop() !== ("pdf")) services.downloadFile({data:filePath, successHandler, errorHandler});
		else successHandler((prevState, props) => {
			return { currentModule:{...prevState.currentModule, filePath} };
		});
	}).catch(error => errorHandler(error)),

    downloadFile:({data:filePath, successHandler, errorHandler}) => ajax.get(`document-files${filePath}`, {
		responseType:filePath.split(".").pop() === "txt" ? 'text' : 'blob'
	}).then(response => {
        let url = response.config.url.split("/");
        if (response.config.responseType === 'text') {
			successHandler((prevState, props) => {
				return { currentModule:{...prevState.currentModule, textFileData:response.data} };
			});
		} else {
			successHandler((prevState, props) => {
				return { currentModule:{...prevState.currentModule, filePath} };
			});
			downloadDocument(url[url.length - 1], response.data, response.headers["content-type"])
		};
    }).catch(error => errorHandler(error)),

    getDocumentHistory:({data:docID, successHandler, errorHandler}) => ajax.get(`documents/${docID}/history`)
    .then(response => successHandler({documentHistory:response.data})).catch(error => errorHandler(error))
};

function arrayToObjectConverter (accumulator, entity, i, entities) {
	/* convert from array to object with id keys */
	accumulator[entity.id] = entities[i];
	return accumulator;
}

export default services;

