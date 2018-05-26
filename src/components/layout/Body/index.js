import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../../pages/Home/index';
import FollowMe from '../../pages/FollowMe';
import MyOLN from '../../pages/MyOLN';
import BookCorner from '../../pages/BookCorner';
import AboutMe from '../../pages/AboutMe';
import Post from '../../pages/Post/index';

import PostEditor from '../../pages/PostEditor/index';

import './index.css';

class Body extends Component {
    render() {
        return (
            <main id="container">
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/follow-me" component={FollowMe} />
                    <Route path="/my-oln" component={MyOLN} />
                    <Route path="/book-corner" component={BookCorner} />
                    <Route path="/about-me" component={AboutMe} />
                    <Route path="/p/:slug" component={Post} />
                    <Route path="/admin/editor/:slug" component={PostEditor} />
                    <Route path="/admin/editor" component={PostEditor} />
                </Switch>
            </main>
        );
    }
}

export default Body;