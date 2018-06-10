import React, { Component } from 'react';
import PostItem from './PostItem';

class PostList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isCollapsed: false
        }

        this.handleHeaderClick = this.handleHeaderClick.bind(this);
    }

    handleHeaderClick() {
        this.setState(prevState => ({
            isCollapsed: !prevState.isCollapsed
        }));
    }

    render() {
        const zodiacIconss = {
            "2019": "images/hoi.png",
            "2018": "images/tuat.png",
            "2017": "images/dau.png"
        }

        const year = this.props.year;
        const entries = this.props.entries.map(
            item => <PostItem title={item.title}
                url={item.url}
                date={item.date}
                key={item.title} />);

        return (
            <section id={year} className={"year" + (this.state.isCollapsed ? " collapse" : "")}>
                <div className="header" onClick={this.handleHeaderClick}>
                    <i className="button icon-down-open"></i>
                    <span className="line"></span>
                    <img alt="animal" src={zodiacIconss[year]}></img>
                </div>
                <div className="entries">
                    {entries}
                </div>
            </section>
        );
    }
}

export default PostList;