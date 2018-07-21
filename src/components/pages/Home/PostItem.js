import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import moment from 'moment';

class PostItem extends Component {
    render() {
        const url = this.props.url;
        const title = this.props.title;

        const date = moment(this.props.date).toDate();
        const dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        
        const dateStrs = date.toDateString().split(' ');
        const publishedDateString = `${dateStrs[0]}, ${dateStrs[1]} ${dateStrs[2]}, ${dateStrs[3]}` 

        
        return (
            <div className="entry" itemScope itemProp="blogPost" 
                itemType="https://schema.org/BlogPosting">
                <NavLink to={url} title="Go to post detail" itemProp="url">
                    <h4 className="entry-title" itemProp="name">{title}</h4>
                    <time className="entry-date" itemProp="datePublished" dateTime={dateString}>Published {publishedDateString}</time>
                </NavLink>
            </div>
        );
    }
}

export default PostItem;