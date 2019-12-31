import React, { Component } from 'react';

import LoginBox from './LoginBox';
import CommentBox from './CommentBox';
import CommentList from './CommentList';

class Comment extends Component {

  render() {
    const postCommentURL = `/posts/${this.props.postSlug}/comments`;

    return (
      <section className="comments">
        <LoginBox />
        <CommentBox postCommentURL={postCommentURL} />
        <CommentList postCommentURL={postCommentURL} />
      </section>
    );
  }
}

export default Comment;