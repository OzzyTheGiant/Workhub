import React from "react";
import PropTypes from "prop-types";

const Module = (props) => {
    let toolbarButtons = null; 
    if (props.buttonActions) {
        toolbarButtons = props.buttonActions.map((func, index) => { // TODO: add icons to toolbarButtons
            console.log(func, func.name);
            return <button 
                key={index} 
                className={func.name + " toolbar-button button-" + props.displayType} 
                onClick={func}></button>;
        });
    }
	return (
		<div id={props.title + "Module"} className="Module">
			<div id="toolbar">
                <h1>{props.title}</h1>
                <div className="toolbarButtons">{toolbarButtons}</div>
            </div>
			{props.children}
		</div>
	);
};

Module.propTypes = {
    title:PropTypes.string.isRequired,
    displayType:PropTypes.string,
    buttonActions:PropTypes.arrayOf(PropTypes.func)
};

export default Module;