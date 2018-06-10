import React, { Component } from 'react';
import StringUtil from '../../../../utils/StringUtil';
import authenService from '../../../../services/AuthenService';
import databaseService from '../../../../services/DatabaseService';

class CommentBox extends Component {
    constructor(props) {
        super(props);

        this.state = { commentContent: "", currentUser: null, display: "none" };
        this.autoSizing = this.autoSizing.bind(this);
        this.submitComment = this.submitComment.bind(this);
        this.handleCommentContentChange = this.handleCommentContentChange.bind(this);
    }

    componentDidMount() {
        this.unregisterAuthObserver = authenService.onAuthStateChanged("commentBox", (authState, user) => {
            this.setState({
                currentUser: user,
                display: authState === authenService.AuthState.Ok ? 'flex' : 'none'
            });
        });
    }

    componentWillUnmount() {
        // Un-registers the auth state observer.
        this.unregisterAuthObserver();
    }

    handleCommentContentChange(e) {
        this.setState({ commentContent: e.target.value });
    }

    autoSizing(e) {
        if (e.target.scrollHeight > 50) {
            e.target.style.height = "5px";
            e.target.style.height = (e.target.scrollHeight + 10) + "px";
        }
    }

    submitComment(e) {
        let keyCode = e.which || e.keyCode;
        let ctrlCode = e.ctrlKey || e.metaKey;
        const comment = this.state.commentContent;

        if (keyCode === 13 && ctrlCode) {
            this.saveNewComment(comment);
        }
    }

    saveNewComment(comment) {
        // state => props maybe
        const currentUser = this.state.currentUser;
        if (!currentUser) {
            return;
        }
        let commentData = {
            user: currentUser.displayName,
            avatar: currentUser.photoURL,
            time: (new Date()).getTime(),
            content: StringUtil.encodeHTML(comment)
        };
        databaseService.create(this.props.postCommentURL, commentData);
        this.setState({ commentContent: "" });
    };

    render() {
        const avatar = this.state.currentUser ? this.state.currentUser.photoURL : "";

        return (
            <div id="comment-box" className="comment-input" style={{ display: this.state.display }}>
                <div className="avatar">
                    <img id="user-avatar" src={avatar} width="32" height="32" alt="avatar" />
                </div>
                <div className="input">
                    <textarea id="comment-content" value={this.state.commentContent} onChange={this.handleCommentContentChange}
                        onKeyUp={this.autoSizing} onKeyDown={this.submitComment} placeholder="Bạn nghĩ gì về bài viết này?"></textarea>
                    <span>Gõ xong nhấn <kbd>Ctrl</kbd> + <kbd>Enter</kbd> để gửi.</span>
                </div>
            </div>
        );
    }
}

export default CommentBox;