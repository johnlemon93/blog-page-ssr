import React, { Component } from 'react';
import databaseService from '../../../../services/DatabaseService';
import CommentItem from './CommentItem';

class CommentList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: [],
            loading: true
        };
    }

    componentDidMount() {
        // init and get all comment data
        this.unregisterDbObserver = databaseService.getAll(this.props.postCommentURL, 'time',
            () => this.setState({ loading: false }),
            data => this.addNewComment(data.key, data.val().user, data.val().avatar, data.val().time, data.val().content));
    }

    componentWillUnmount() {
        // Un-register the listener on Comments database
        this.unregisterDbObserver();
    }

    addNewComment(id, user, avatar, time, content) {
        const comments = this.state.comments.slice();
        comments.push({
            id: id,
            user: user,
            avatar: avatar,
            time: time,
            content: content
        });
        this.setState({ comments: comments });
    }

    render() {
        const loadingDisplay = this.state.loading ? 'block' : 'none';

        const commentItems = this.state.comments
            .map(item => <CommentItem key={item.id}
                user={item.user}
                avatar={item.avatar}
                time={item.time}
                content={item.content} />);

        return (
            <div>
                <div id="comment-loading" className="loading" style={{ display: loadingDisplay }}></div>
                <ul id="comment-list" className="comment-list">{commentItems}</ul>
            </div>
        );
    }
}

export default CommentList;