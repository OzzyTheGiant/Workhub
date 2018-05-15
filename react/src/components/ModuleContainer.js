import React from "react";
import PropTypes from "prop-types";

const ModuleContainer = (props) => {
	return (
		<div id="ModuleContainer">
			<div id="title-bar"><h1>{props.title}</h1></div>
			{props.children}
		</div>
	);
};

ModuleContainer.propTypes = {
	title:PropTypes.string.isRequired
};

export default ModuleContainer;