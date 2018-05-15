import React from "react";
import PropTypes from "prop-types";

const Module = (props) => {
	return (
		<div id={props.title + "Module"} className="Module">
			<div id="toolbar"><h1>{props.title}</h1></div>
			{props.children}
		</div>
	);
};

Module.propTypes = {
	title:PropTypes.string.isRequired
};

export default Module;