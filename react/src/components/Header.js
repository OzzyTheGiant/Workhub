import React from 'react';
import PropTypes from 'prop-types';

const Header = (props) => {
    return (
        <header id="Header">
            <img src="http://placehold.it/120x35" alt="Workhub Logo"/>
            <nav>
                <ul>
                    <li onClick={props.logout}>Log Out</li>
                </ul>
            </nav>
        </header>
    );
};

Header.propTypes = {
    logout:PropTypes.func.isRequired
}

export default Header;