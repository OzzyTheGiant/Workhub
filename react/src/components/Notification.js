import React from "react";
import PropTypes from "prop-types";

const Notification = (props) => {
	return (
		<div className={"Notification " + (props.type ? props.type : "none")}>
			{props.message}
		</div>
	);
};

Notification.propTypes = {
	message:PropTypes.string,
	type:PropTypes.string
};

export default Notification;