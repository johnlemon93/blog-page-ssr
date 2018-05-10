import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import HomeHeader from './HomeHeader';
import PostHeader from './PostHeader';
import './index.css';

class Header extends Component {
    render() {
        return (
            <header>
                <Route exact path="/" component={HomeHeader} />
                <Route path="/posts" component={PostHeader} />
                <Route path="/follow-me" component={HomeHeader} />
                <Route path="/my-oln" component={PostHeader} />
                <Route path="/book-corner" component={PostHeader} />
                <Route path="/about-me" component={HomeHeader} />
            </header>
        );
    }
}

export default Header;