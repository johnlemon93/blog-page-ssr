import React, { Component } from 'react';
import CopyRight from './Copyright';
import Comment from './Comment/index';
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

        // When the user scrolls down 40px from the top of the document, show the button
        window.onscroll = () => {
            if (document.body.scrollTop > 40 || document.documentElement.scrollTop > 40) {
                document.getElementById("go-top").style.display = "block";
            } else {
                document.getElementById("go-top").style.display = "none";
            }
        }
    }

    scrollToTop() {
        document.getElementById("container").scrollIntoView();
    }

    render() {
        const { error, isLoaded, content } = this.state;

        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div className="loading"></div>;
        } else {
            const title = content.match(/(?=>)((.|[\n\r])*)(?=<\/h1>)/);
            if (title) document.title = title[0].substr(1).trim() + " | Chanh's blog";

            this.scrollToTop();
            return (
                <article className="post-container"
                    itemScope itemType="https://schema.org/Blog">
                    <section className="content"
                        dangerouslySetInnerHTML={{ __html: content }}>
                    </section>
                    <CopyRight />
                    <Comment postSlug={this.props.match.params.slug} />
                    <button onClick={() => this.scrollToTop()} id="go-top" title="Go to top"><i className="icon-up-open"></i></button>
                </article>
            );
        }
    }
}

export default Post;