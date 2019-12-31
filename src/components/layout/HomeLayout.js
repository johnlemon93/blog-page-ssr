import React, { Component, Fragment } from 'react';
import { HomeHeader } from './Header/index';
import Body from './Body/index';
import Footer from './Footer/index';
import WindowTitle from './WindowTitle';

class HomeLayout extends Component {
    render() {
        const { children, windowTitle } = this.props;
        return (
            <Fragment>
                <WindowTitle title={windowTitle && `${windowTitle} | Chanh's blog`} />
                <HomeHeader />
                <Body>
                    {children}
                </Body>
                <Footer />
            </Fragment>
        );
    }
}

export default HomeLayout;