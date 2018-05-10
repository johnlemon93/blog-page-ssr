import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Home from '../../pages/Home/index';
import FollowMe from '../../pages/FollowMe';
import MyOLN from '../../pages/MyOLN';
import BookCorner from '../../pages/BookCorner';
import AboutMe from '../../pages/AboutMe';
import Post from '../../pages/Post/index';

import './index.css';

class Body extends Component {
    render() {
        return (
            <main id="container">
                <Route exact path="/" component={Home} />
                <Route path="/follow-me" component={FollowMe} />
                <Route path="/my-oln" component={MyOLN} />
                <Route path="/book-corner" component={BookCorner} />
                <Route path="/about-me" component={AboutMe} />
                <Route path="/posts/:slug" component={Post} />
            </main>
        );
    }
}

export default Body;