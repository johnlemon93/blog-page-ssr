import React, { Component } from 'react';

class PostHeader extends Component {
    render() {
        return (
            <header className="header2">
                <a className="head" href="/"><span className="avatar"></span><span className="header-link">Chanh's Blog</span></a>
                <a className="subscribe" href="/" rel="noopener noreferrer" target="blank">Follow me</a>
            </header>
        );
    }
}

export default PostHeader;