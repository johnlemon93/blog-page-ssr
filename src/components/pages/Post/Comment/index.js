import React, { Component } from 'react';
import './index.css';

class Comment extends Component {
    constructor(props) {
        super(props);
        
    }
    
    render() {
        return (
            <section className="comments">
                <div id="comment-loading" classNameName="loading"></div>
                <div id="login-box" className="login">
                    Bạn cần <button onclick="login()">Login</button> để comment
                  </div>
                <div id="comment-box" className="comment-input">
                    <div className="avatar">
                        <img id="user-avatar" src="" width="32" height="32" />
                    </div>
                    <div className="input">
                        <textarea id="comment-content" onkeyup="autoSizing(this)" onkeydown="submitComment(event)" placeholder="Comment gõ vào đây :D"></textarea>
                        <span>Gõ xong nhấn <kbd>Ctrl</kbd> + <kbd>Enter</kbd> để gửi.</span>
                    </div>
                </div>
                <ul id="comment-list" className="comment-list"></ul>
            </section>
        );
    }
}

export default Comment;