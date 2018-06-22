import React from 'react';
import PropTypes from 'prop-types';

const Document = props => { // Object element for rendering PDFs, otherwise, will display a link to download the non-PDF file
	return (
		<object
			className="frame"
			data={"/document-files" + props.filePath} 
			type={props.fileType === "PDF" ? "application/pdf" : "application/octet-stream"}
			title={"Current Document: " + props.fileName + "." + props.fileType.toLowerCase()}>
			{props.fileType === "TXT" ? (
				<div id="text-file">
					{props.textFile}
				</div>
			) : (
				<div id="download-prompt">
					This file could not be loaded or cannot be previewed online, click below to download and open locally.
					<button className="color-button button-ok" onClick={props.downloadDocument}>Download</button>
				</div>
			)}
		</object>
	);
};

Document.propTypes = {
	filePath:PropTypes.string,
	fileName:PropTypes.string.isRequired,
	fileType:PropTypes.string.isRequired,
	textFile:PropTypes.string,
	downloadDocument:PropTypes.func.isRequired,
};

export default Document;