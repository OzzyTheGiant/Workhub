const services = { // all services must successHandler(an object literal that will update the state
	login:jest.fn().mockImplementation(({data, successHandler, errorHandler}) => {
		if (data.username === "OzzyTheGiant" && data.password === "1234567") {
			successHandler({
				isLoggedIn:true,
				currentModule:{
					name:"documents",
					listType:"clients",
					filePath:null,
					textFileData:null,
					parentId:null
				}
			});
		} else {
			errorHandler({response:{status:401}});
		}
	}),

    logout:jest.fn().mockImplementation(({successHandler, errorHandler}) => successHandler({isLoggedIn:false})),

    getClients:jest.fn().mockImplementation(({successHandler, errorHandler}) => {
		successHandler({
			clients:{
				"100000":{id:"100000", clientName: "Ozzy Perez"},
				"100001":{id:"100001", clientName: "Alondra Perez"}
			}
		});
	}),

    getProjects:jest.fn().mockImplementation(({successHandler, errorHandler}) => {
		successHandler({
			projects: {
				1:{
					category:{description:"Tax Return", id:1},
					dateCreated:"2018-04-26T19:58:20.000+0000",
					dateDue:"2017-04-15",
					id:1,
					name:"2017 Form 1040",
					client:"100000"
				}
			}
		});
	}),
	
	getDocuments:jest.fn().mockImplementation(({successHandler, errorHandler}) => {
		successHandler({
			documents:{
				"AAAAAAAAAAA":{
					accessLevel:"PUBLIC",
					category:{description:"Workpapers", id:3},
					description:"file2",
					fileType:"PDF",
					id:"AAAAAAAAAAA",
					year:2017,
					project:1
				},
				"ASDFHOWEOUH":{
					accessLevel:"PUBLIC",
					category:{description:"Notes", id:4},
					description:"notes",
					fileType:"TXT",
					id:"ASDFHOWEOUH",
					year:2017,
					project:1,
					client:"100000"
				},
				"BBBBBBBBBBB":{
					accessLevel:"PUBLIC",
					category:{description:"Workpapers", id:3},
					description:"file3",
					fileType:"EXCEL",
					id:"BBBBBBBBBBB",
					year:2017,
					project:1,
					client:"100000"
				}
			}
		});
    }),
    
	openDocument:jest.fn().mockImplementation(({data:docID, successHandler, errorHandler}) => {
		let filePath;
		switch(docID) {
			case "AAAAAAAAAAA": successHandler("/[100000] Ozzy Perez/[Tax Return] 2017 Form 1040/[AAAAAAAAAAA][Work Papers][2017] file2.pdf"); break;
			case "ASDFHOWEOUH": 
				filePath = "/[100000] Ozzy Perez/[Tax Return] 2017 Form 1040/[ASDFHOWEOUH][Notes][2017] notes.txt";
				services.downloadFile({data:filePath, successHandler, errorHandler});
				successHandler((prevState, props) => {
					return { currentModule:{...prevState.currentModule, filePath} };
				}); break;
			case "BBBBBBBBBBB":
				filePath = "/[100000] Ozzy Perez/[Tax Return] 2017 Form 1040/[BBBBBBBBBBB][Work Papers][2017] file3.xlsx"
				services.downloadFile({data:filePath, successHandler, errorHandler});
				successHandler((prevState, props) => {
					return { currentModule:{...prevState.currentModule, filePath} };
				}); break;
			default: successHandler(null); break;
		}
	}),

    downloadFile:jest.fn().mockImplementation(({data:filePath, successHandler, errorHandler}) => { 
		if (filePath && filePath.split(".").pop() === "txt") successHandler((prevState, props) => {
			return { currentModule:{...prevState.currentModule, textFileData:"Testing!"} };
		});
	}),

	getDocumentHistory:jest.fn().mockImplementation(({data:docId, successHandler, errorHandler}) => {
		successHandler({
			documentHistory:[
				{
					actionType:"OPEN",
					id:1,
					employee:{
						firstName:"John",
						middleName:null,
						lastName:"Doe",
						role:"STAFF",
						id:2
					}
				}
			]
		});
	})
};

export default services;