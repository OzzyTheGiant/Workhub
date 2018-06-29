import React from "react";
import PropTypes from "prop-types";

const Notification = (props) => {
	return (
		<div className={"Notification " + (props.type ? props.type : "none")}>
			{props.text}
		</div>
	);
};

Notification.propTypes = {
	text:PropTypes.string,
	type:PropTypes.string
};

export default Notification;