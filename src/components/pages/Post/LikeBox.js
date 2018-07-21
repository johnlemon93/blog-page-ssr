import React, { Component } from 'react';

class LikeBox extends Component {
    render() {
        const dataHref = `http://blogchanhday.com/p/${this.props.postSlug}`;
        const source = `https://www.facebook.com/plugins/like.php?href=${dataHref}&width=700&layout=standard&action=like&size=small&show_faces=true&share=true&colorscheme=light&appId=1451967558408105`

        return (
            <section className="likebox">
                <iframe className="fb-like"
                    src={source}
                    title="Facebook like box"
                    width="700"
                    height="56"
                    style={{ border: 'none', overflow: 'hidden' }}
                    scrolling="no" frameBorder="0"
                    allowtransparency="true"
                    allow="encrypted-media"></iframe>
            </section>
        );
    }
}

export default LikeBox;