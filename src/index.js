import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/layout/App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import Loadable from 'react-loadable';

var destination = document.querySelector("#root");

window.onload = () => {
    Loadable.preloadReady().then(() => {
        ReactDOM.hydrate((
            <BrowserRouter>
                <App />
            </BrowserRouter>
        ), destination)
    });
};