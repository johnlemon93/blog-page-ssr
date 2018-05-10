import React, { Component } from 'react';
import PostList from './PostList';
import './index.css';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            postLists: []
        };
    }

    componentDidMount() {
        fetch("publish.json")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        postLists: result.years.map(year => {
                            return {
                                year: year,
                                entries: result.published.filter(post => post.date.includes(year))
                            }
                        })
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        const { error, isLoaded, postLists } = this.state;

        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            document.title = "Nơi tôi tập tành viết lách | blog Chanh Dây";
            return (
                <article className="post-list">
                    {
                        postLists.map(postList => {
                            return <PostList year={postList.year}
                                entries={postList.entries}
                                key={postList.year} />;
                        })
                    }
                </article>
            );
        }
    }
}

export default Home;