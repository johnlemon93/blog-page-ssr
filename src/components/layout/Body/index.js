import React, { Component } from 'react';

class Body extends Component {
    render() {
        return (
            <main id="container">
                {this.props.children}
            </main>
        );
    }
}

export default Body;