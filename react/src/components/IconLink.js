import React from 'react';
import PropTypes from 'prop-types';

const IconLink = props => {
    return (
        <li onDoubleClick={props.dblClickHandler} className={props.fileType} title={props.name}>
            <p>{props.name}</p>
            <span className="details">
                {props.view === "list-view" ? Object.keys(props.details).map((key, index) => <p key={index}>{props.details[key]}</p>) : null}
            </span>
        </li>
    );
};

IconLink.propTypes = {
    details:PropTypes.object.isRequired,
    dblClickHandler:PropTypes.func.isRequired,
    fileType:PropTypes.string,
    name:PropTypes.string.isRequired,
    view:PropTypes.string.isRequired
};

export default IconLink;