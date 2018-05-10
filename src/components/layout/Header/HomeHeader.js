import React, { Component } from 'react';
import Navigation from './Navigation';

class HomeHeader extends Component {
    render() {
        return (
            <div>
                <a href="/"><img src="images/logo.gif" alt="animal" /></a>
                <h2 itemProp="name">BLOG CHANH DÂY</h2>
                <h5 itemProp="author">by John Lemon</h5>
                <p className="me-intro" itemProp="description">Nơi tôi thỏa sức tập tành viết lách,<br /> than thở chuyện đời và...<br /> nói xấu người khác</p>

                <Navigation />

                <div className="search">
                    <form action="https://www.google.com/search" method="get">
                        <input type="text" name="q" placeholder="Tìm cái giề?" />
                        <input type="hidden" name="as_sitesearch" value="blogchanhday.com" />
                    </form>
                </div>
            </div>
        );
    }
}

export default HomeHeader;