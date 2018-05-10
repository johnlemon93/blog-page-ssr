import React, { Component } from 'react';

import hoiIcon from '../../../img/hoi.png';
import tuatIcon from '../../../img/tuat.png';
import dauIcon from '../../../img/dau.png';

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
            "2019": hoiIcon,
            "2018": tuatIcon,
            "2017": dauIcon
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