import React, { Component } from 'react';
import Header from './Header/index';
import Body from './Body/index';
import Footer from './Footer/index';

import { HashRouter } from 'react-router-dom';
import GA from '../common/GoogleAnalytics';

class App extends Component {
    render() {
        return (
            <HashRouter>
                <div itemScope itemType="https://schema.org/Blog">
                    { GA.init() && <GA.RouteTracker /> }
                    <Header />
                    <Body />
                    <Footer />
                </div>
            </HashRouter>
        );
    }
}

export default App;