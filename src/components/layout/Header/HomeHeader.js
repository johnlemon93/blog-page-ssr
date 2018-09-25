import React, { Component } from 'react';
import Navigation from './Navigation';

class HomeHeader extends Component {
    render() {
        return (
            <header>
                <a href="/"><img src="images/logo.png" alt="animal" /></a>
                <h1 itemProp="name">BLOG CHANH DÂY</h1>
                <h4 itemProp="author">by John Lemon</h4>
                <p className="me-intro" itemProp="description">Nơi tôi thỏa sức tập tành viết lách,<br /> than thở chuyện đời và...<br /> nói xấu người khác</p>

                <Navigation />

                <div className="search">
                    <form action="https://www.google.com/search" method="get">
                        <input type="text" name="q" placeholder="Tìm cái giề?" />
                        <input type="hidden" name="as_sitesearch" value="blogchanhday.com" />
                    </form>
                </div>
            </header>
        );
    }
}

export default HomeHeader;