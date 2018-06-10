import { Component } from 'react';

class WindowTitle extends Component {
    componentDidMount() {
        document.title = this.props.title;
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.title !== this.props.title && nextProps.title != null) {
            document.title = nextProps.title;
        }
    }

    render() {
        return null;
    }
}

export default WindowTitle;