import React, { Component } from 'react';

class Footer extends Component {
    render() {
        return (
            <footer>
                <a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/4.0/"><img alt="Creative Commons License" src="https://i.creativecommons.org/l/by-nc-nd/4.0/80x15.png" /></a>
                <p>Created based on <a href="http://github.com/huytd/azeroth-js">azeroth.js</a></p>
                <div className="social">
                    <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/blogchanhday"><i className="icon-facebook-squared"></i></a>
                    <a target="_blank" rel="noopener noreferrer" href="https://github.com/johnlemon93"><i className="icon-github-squared"></i></a>
                    <a target="_blank" rel="noopener noreferrer" href="https://blogchanhday.com"><i className="icon-emo-coffee"></i></a>
                </div>
            </footer>
        );
    }
}

export default Footer;