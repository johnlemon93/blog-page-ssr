import React, { Fragment, Component } from 'react';
import PostLayout from '../../layout/PostLayout';
import CopyRight from './Copyright';
import Comment from './Comment/index';
import hljs from 'highlightjs/highlight.pack.min';
import postApi from '../../../api/post-api';
import LikeBox from './LikeBox';

class Post extends Component {
    constructor(props) {
        super(props);
        this.handleOnScroll = this.handleOnScroll.bind(this);
        this.state = {};
    }

    componentWillMount() {
        postApi.getPostContent(this.props.match.params.slug).then(ret => {
            this.setState({ ...ret });
        });
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleOnScroll);
    }

    componentDidUpdate() {
        this.initHlJs();
    }

    componentDidMount() {
        this.initHlJs();
        
        // When the user scrolls down 40px from the top of the document, show the button
        window.addEventListener('scroll', this.handleOnScroll);
    }

    initHlJs() {
        hljs.initHighlighting.called = false;
        hljs.initHighlighting();
    }

    handleOnScroll() {
        if (document.body.scrollTop > 40 || document.documentElement.scrollTop > 40) {
            document.getElementById("go-top").style.display = "block";
        } else {
            document.getElementById("go-top").style.display = "none";
        }
    }

    scrollToTop() {
        document.getElementById("container").scrollIntoView();
    }

    render() {
        const { error, content } = this.state;
        let htmlContent = null;

        if (error) {
            htmlContent = <div>Error: {error.message}</div>;
        } else if (!content){
            htmlContent = <div className="loading"></div>;
        } else {
            htmlContent = (
                <Fragment>
                    <section className="content"
                        dangerouslySetInnerHTML={{ __html: content }}>
                    </section>
                    <CopyRight />
                    <LikeBox postSlug={this.props.match.params.slug} />
                    <Comment postSlug={this.props.match.params.slug} />
                </Fragment>
            );
        }

        const titleElem = content && content.match(/(?=>)((.|[\n\r])*)(?=<\/h1>)/);
        const wTitle = titleElem && titleElem[0].substr(1).trim();

        return (
            <PostLayout windowTitle={wTitle}>
                <article itemScope itemType="https://schema.org/BlogPosting"
                    className="post-container">
                    {htmlContent}
                    <button onClick={() => this.scrollToTop()} id="go-top" title="Go to top"><i className="icon-up-open"></i></button>
                </article>
            </PostLayout>
        );
    }
}

export default Post;