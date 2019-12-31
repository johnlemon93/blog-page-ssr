import React, { Component } from 'react';
import HomeLayout from '../../layout/HomeLayout';
import PostList from './PostList';
import postApi from '../../../api/post-api';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount() {
        postApi.getPostLists().then(ret => {
            this.setState({ ...ret });
        });
    }

    render() {
        const { error, postLists } = this.state;
        let htmlContent = null;

        if (error) {
            htmlContent = <div>Error: {error.message}</div>;
        } else if (!postLists){
            htmlContent = <div className="loading"></div>;
        } else {
            htmlContent = (
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

        const wTitle = "Nơi tôi tập tành viết lách";

        return (
            <HomeLayout windowTitle={wTitle}>
                {htmlContent}
            </HomeLayout>
        );
    }
}

export default Home;