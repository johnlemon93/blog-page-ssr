import React, { Component } from 'react';
import Generator from '../../../core/Generator';
import './index.css';

class PostEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mdText: "### start writing here!!",
            loading: true
        };
        this.handleMdTextChange = this.handleMdTextChange.bind(this);
        this.gen = new Generator();

        this.handleScroll = this.handleScroll.bind(this);
        this.handleSavePost = this.handleSavePost.bind(this);
        this.handleLeavingEditor = this.handleLeavingEditor.bind(this);
    }

    componentDidMount() {
        const slug = this.getPostSlug();
        fetch("http://localhost:3030/get-md/" + slug)
            .then(res => res.text())
            .then(res => this.setState({
                mdText: res,
                loading: false
            }))
            .catch(error => {
                this.setState({
                    mdText: "## Error: " + error.message,
                    loading: false
                });
                console.error(error);
            });
        window.addEventListener("beforeunload", this.handleLeavingEditor);
    }

    componentWillUnmount() {
        let r = window.confirm("Do you want to save the change ?");
        if (r) {
            this.handleSavePost();
        }
        window.removeEventListener("beforeunload", this.handleLeavingEditor);
    }

    handleLeavingEditor(e) {
        e.returnValue = "Are you sure?";
        return e.returnValue;
    }

    handleMdTextChange(e) {
        this.setState({ mdText: e.target.value });
    }

    handleScroll(e) {
        document.getElementById("preview").scrollTop = e.target.scrollTop * 1.5;
    }

    handleSavePost() {
        this.setState({ loading: true });

        const slug = this.getPostSlug();
        const data = { mdText: this.state.mdText, slug: slug };

        fetch("http://localhost:3030/save-post", {
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
            method: "POST",
            mode: "cors"
        })
            .then(response => response.json())
            .then(res => {
                alert(res);
                this.setState({ loading: false });
            })
            .catch(error => {
                this.setState({
                    mdText: "## Error: " + error.message,
                    loading: false
                });
                console.error(error);
            });
    }

    getPostSlug() {
        let slug = this.props.match.params.slug;
        
        if (!slug) {
            const previewDom = document.getElementById("preview");
            const h1Tag = previewDom.getElementsByTagName("h1")[0];
            if (h1Tag) {
                slug = h1Tag.getAttribute("id");

                let location = window.location.href;
                if (location.endsWith("/")) {
                    location = location.slice(0, -1);
                }
                window.location = location + "/" + slug;

            } else {
                slug = "test-pad";
            }
        }

        return slug;
    }

    render() {
        const saving = this.state.loading;
        const loadingDisplay = saving ? 'block' : 'none';

        return (
            <article className="editor-container">
                <div id="editor" className="editor">
                    <section className="save">
                        <button disabled={saving} id="save-post" onClick={this.handleSavePost}>Save</button>
                        <div id="saving" className="loading"
                            style={{ display: loadingDisplay }}></div>
                    </section>
                    <textarea disabled={saving} onScroll={this.handleScroll} value={this.state.mdText} onChange={this.handleMdTextChange}></textarea>
                </div>
                <div id="preview" className="preview post-container" dangerouslySetInnerHTML={{ __html: this.gen.mdToHtml(this.state.mdText) }}>
                </div>
            </article>
        );
    }
}

export default PostEditor;