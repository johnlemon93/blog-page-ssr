import React, { Component } from 'react';
import Generator from '../../../core/Generator';

class PostEditor extends Component {
    constructor(props) {
        super(props);
        this.state = { mdText: "### start writing here!!" };
        this.handleMdTextChange = this.handleMdTextChange.bind(this);
        this.gen = new Generator();
    }

    handleMdTextChange(e) {
        this.setState({ mdText: e.target.value });
    }

    render() {

        return (
            <div className="editor">
                <div>
                    <textarea value={this.state.mdText} onChange={this.handleMdTextChange}></textarea>
                </div>
                <div dangerouslySetInnerHTML={{ __html: this.gen.mdToHtml(this.state.mdText) }}>
                </div>
            </div>
        );
    }
}

export default PostEditor;