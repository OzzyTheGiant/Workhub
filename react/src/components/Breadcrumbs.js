import React from 'react';
import PropTypes from 'prop-types';

const Breadcrumbs = props => {
    return (
        <div id="breadcrumbs">
            <div id="breadcrumb-slider">
                {props.breadcrumbs.map((crumb, index) => crumb ? <div key={index} onClick={crumb.clickHandler}>{crumb.text}</div> : null)}
            </div>
        </div>
    );
};

Breadcrumbs.propTypes = {
    breadcrumbs:PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Breadcrumbs;