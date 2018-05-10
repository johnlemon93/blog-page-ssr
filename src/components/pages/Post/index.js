import React, { Component } from 'react';
import './index.css';

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            content: ""
        };
    }

    componentDidMount() {
        const postUrl = `/posts/${this.props.match.params.slug}.html`;
        fetch(postUrl)
            .then(res => res.text())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        content: result
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error: error
                    });
                }
            );
    }

    render() {
        const { error, isLoaded, content } = this.state;

        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            document.title = content.match(/(?=>)((.|[\n\r])*)(?=<\/h1>)/)[0].substr(1).trim() + " | Chanh's blog";
            document.getElementById("container").scrollIntoView();
            return <article className="post-content"
                dangerouslySetInnerHTML={{ __html: content }}
                itemScope itemType="https://schema.org/Blog"></article>;
        }
    }
}

export default Post;