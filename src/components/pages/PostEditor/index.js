import React, { Component } from 'react';
import Generator from '../../../core/Generator';
import './index.css';

class PostEditor extends Component {
    constructor(props) {
        super(props);
        this.state = { mdText: "### start writing here!!" };
        this.handleMdTextChange = this.handleMdTextChange.bind(this);
        this.gen = new Generator();

        this.handleScroll = this.handleScroll.bind(this);
    }

    handleMdTextChange(e) {
        this.setState({ mdText: e.target.value });
    }

    handleScroll(e) {
        document.getElementById("preview").scrollTop = e.target.scrollTop * 1.5;
    }

    render() {

        return (
            <article className="editor-container">
                <div id="editor" className="editor">
                    <textarea onScroll={this.handleScroll} value={this.state.mdText} onChange={this.handleMdTextChange}></textarea>
                </div>
                <div id="preview" className="preview post-container" dangerouslySetInnerHTML={{ __html: this.gen.mdToHtml(this.state.mdText) }}>
                </div>
            </article>
        );
    }
}

export default PostEditor;