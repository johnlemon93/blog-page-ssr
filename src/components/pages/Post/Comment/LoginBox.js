import React, { Component } from 'react';
import authenService from '../../../../services/AuthenService';

class LoginBox extends Component {
    constructor(props) {
        super(props);
        this.state = { display: 'none' };
        this.login = this.login.bind(this);
    }

    login() {
        authenService.loginWithGoogle();
    }

    componentDidMount() {
        this.unregisterAuthObserver = authenService.onAuthStateChanged("loginBox", authState => {
            this.setState({ display: authState === authenService.AuthState.No ? 'block' : 'none' });
        });
    }

    componentWillUnmount() {
        // Un-registers the auth state observer.
        this.unregisterAuthObserver();
    }

    render() {
        return (
            <div id="login-box" className="login" style={{ display: this.state.display }}>
                Bạn cần <button onClick={this.login}>Login</button> để comment
            </div>
        );
    }
}

export default LoginBox;