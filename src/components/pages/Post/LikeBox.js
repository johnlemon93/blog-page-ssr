import React, { Component } from 'react';

class LikeBox extends Component {
    render() {
        const dataHref = encodeURIComponent(`http://blogchanhday.com/p/${this.props.postSlug}/index.html`);
        const source = `https://www.facebook.com/plugins/like.php?href=${dataHref}&layout=standard&action=like&size=small&show_faces=true&share=true&colorscheme=light&appId=1451967558408105`

        return (
            <section className="likebox">
                <iframe className="fb-like"
                    src={source}
                    title="Facebook like box"
                    height="56"
                    style={{ maxWidth: "700px", border: 'none', overflow: 'hidden' }}
                    scrolling="no" frameBorder="0"
                    allowtransparency="true"
                    allow="encrypted-media"></iframe>
            </section>
        );
    }
}

export default LikeBox;