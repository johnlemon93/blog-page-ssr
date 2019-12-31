import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Navigation extends Component {
    render() {
        return (
            <nav>
                <NavLink target="_blank" rel="noopener noreferrer" to="/follow-me/">Follow Me</NavLink>
                <NavLink to="/my-oln/">My Original Light Novel</NavLink>
                <NavLink to="/book-corner/">Book corner</NavLink>
                <NavLink to="/about-me/">About me</NavLink>
            </nav>
        );
    }
}

export default Navigation;