import React, { Component, Fragment } from 'react';
import GA from '../common/GoogleAnalytics';
import Loadable from 'react-loadable';
import {Switch, Route} from 'react-router-dom';

// pages
import AboutMe from '../pages/AboutMe';
import BookCorner from '../pages/BookCorner';
import FollowMe from '../pages/FollowMe';
import MyOLN from '../pages/MyOLN';
import PostEditor from '../pages/PostEditor/index';

const createAsyncComponent = (loader, modules) => Loadable({
    loader: loader,
    loading: () => <div className="loading"></div>,
    modules: modules
});

const AsyncHomeComponent = createAsyncComponent(
    () => import(/* webpackChunkName: "homeChunk" */ "../pages/Home/index"),
    ['homeChunk']
);
const AsyncPostComponent = createAsyncComponent(
    () => import(/* webpackChunkName: "postChunk" */ "../pages/Post/index"),
    ['postChunk']
);

class App extends Component {
    render() {
        return (
            <Fragment>
                {GA.init() && <GA.RouteTracker />}
                <Switch>
                    <Route exact path="/" component={AsyncHomeComponent} />
                    <Route path="/follow-me" component={FollowMe} />
                    <Route path="/my-oln" component={MyOLN} />
                    <Route path="/book-corner" component={BookCorner} />
                    <Route path="/about-me" component={AboutMe} />
                    <Route path="/p/:slug" component={AsyncPostComponent} />
                    <Route path="/admin/editor/:slug" component={PostEditor} />
                    <Route path="/admin/editor" component={PostEditor} />
                </Switch>
            </Fragment>
        );
    }
}

export default App;