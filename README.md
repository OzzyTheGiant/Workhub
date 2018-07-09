Workhub - Document and Project Management Web Application

INTRODUCTION
This application is built using React for the front end, Java Spring Boot for the backend and MySQL for the database. The back end of the app exposes a REST API to access client, project, and document data, which is organized in the front end using folders, similar to a file explorer on the OS.

BACK END
Using Java's Spring Boot, app data is organized in entites: Clients, Projects, Documents, Document Actions, and Employees. Clients can have multiple Projects and/or Documents, and Projects can have multiple Documents. Documents can have multiple Document actions, such as open, merge, delete, etc. At the time of this README, only 'open' is available. This data can be fetched using respective controllers, which call on respective services, which in turn call respective Data Access Objects (DAO). 

Clients, Projects and Documents can be fetched all at once or via id. Projects and documents can be fetched via client id. Documents can also be fetched via project id.

FRONT END

-- Services --
To access API endpoints, Axios is used as the ajax library. A service object lists out all available API endpoints, which can be imported into the app. Each endpoint can receive a success handler call back as well as an error handler callback. Some api endpoints may require data to be sent to server. All API endpoints require 'withCredentials' option to be enabled (except 'login' and 'logout'), which means that a session must be established after logging in. 

In this application, the service object is imported at the top of the application and passed as a prop to be used. To use the service object, a serviceCaller method is added to the App component, which is passed to the rest of the application to make ajax calls. This makes ajax calls much easier to code. Also, all services, except downloadFile, will return an object literal to merge with the app's state.

-- State --
All state is handled in the App component, similar to Redux. An updateState method is provided for the rest of the app to update state data. In the state, a currentModule property is avaiblable to handle the current module's specific state data, rather than storing it in the module component directly. Updating the module state is allowed using updateModuleState function, which is crated in the AppUserInterface component

-- Login Module --
The LoginModule component simply adds username and password to state and calls the login service when form is submitted.

-- Documents Module --
After logging in, the Documents Module should render and call for clients, projects, and documents services on mounting, fetching from the database. These lists will be stored in the app state as individual properties. The first list to render should be the clients list, showing a list of folders with each folder containing a client name. Upon double clicking an icon, the navigationHandler method should be called, updating the state to reflect the new list that should be rendered. 

To determine which projects to render, a clickSelection property will stored in the state,which is placed there when iconClickHandler is called, after a single click of the icon. The same will apply when double clicking a project to view a list of documents in that project. It is the same procedure.

Every time a list is rendered in this module, the displayList method should be called, filtering the list based on the id of the parent (ex: filtering the projects list based on a client id).

-- Breadcrumbs --
While rendering lists, Breadcrumbs will be generated as well, allowing you to click back to a previous list in the hierarchy. These breadcrumbs also make use of the navigationHandler method, determining which list to render based on the depth of the hierarchy in which you are in, which is calculated based on the number order of the breadcrumb (ex: if you are viewing documents in a project and wish to click back to the clients list by clicking the first breadcrumb, the depth will be 1, which is the top level. In this particular case though, since no breadcrumbs are displayed at the top, the depth will actually be 0).

-- Documents --
When double clicking a document, one of three things will happen. The serviceCaller prop function will be called to perform the 'openDocument' service, which is an ajax call to get the file path of the document. After getting said file path, it will be added to the currentModule state, which will be used in the Document component. If the file is a PDF, an object tag will be rendered and the browser will automatically fetch the PDF itself from the API. If it's not a PDF and not a TXT file either, it will automatically download the file for you as well as display a manual download link.

Back in the ajax call, if the file was TXT, after openDocument, the downloadFile service will be used to send the text data to the state for display. Otherwise, it will start downloading the file using a helper function, which will be used to turn the response data into a Blob (a file object).

-- Document History --
When viewing documents, single clicking a document will update clickSelection as well as display a button in the module's toolbar to display the document's history. Clicking the button will always fetch the history for that document via getDocumentHistory service. This button will also be available when viewing a document. The button calls viewDocumentHistory method in the DocumentsModule component, where the service will be called.