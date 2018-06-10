import React, { Component, Fragment } from 'react';
import { PostHeader } from './Header/index';
import Body from './Body/index';
import Footer from './Footer/index';
import WindowTitle from './WindowTitle';

class PostLayout extends Component {
    render() {
        const { children, windowTitle } = this.props;
        return (
            <Fragment>
                <WindowTitle title={windowTitle && `${windowTitle} | blog Chanh Dây`} />
                <PostHeader />
                <Body>
                    {children}
                </Body>
                <Footer />
            </Fragment>
        );
    }
}

export default PostLayout;