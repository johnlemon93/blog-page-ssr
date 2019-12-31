import React, { Component } from 'react';
import StringUtil from '../../../../utils/StringUtil';

class CommentItem extends Component {
    render() {
        const avatar = this.props.avatar;
        const user = this.props.user;

        const d = new Date(this.props.time);
        const commentTime = d.toLocaleTimeString() + ' ' + d.toLocaleDateString();

        let commentFiltered = StringUtil.encodeHTML(this.props.content);
        commentFiltered = StringUtil.filterURLinComment(commentFiltered);

        return (
            <li>
                <div className="avatar">
                    <img src={avatar} width="32" height="32" alt="" /> +
                </div>
                <div className="comment">
                    <div className="metadata"><b>{user}</b> lúc <span>{commentTime}</span></div>
                    <div className="content">{commentFiltered}</div>
                </div>
            </li>
        );
    }
}

export default CommentItem;