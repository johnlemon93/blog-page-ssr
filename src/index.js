import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/layout/App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import Loadable from 'react-loadable';
import postApi from './api/post-api';

var destination = document.querySelector("#root");

window.onload = async () => {
    // load data before hydrating
    const url = window && window.location && window.location.href;
    if (url.includes("/p/")) {
        // get the slug from the last query part
        const postSlug = url.split('/')[4];
        await postApi.getPostContent(postSlug);
    } else {
        await postApi.getPostLists();
    }

    Loadable.preloadReady().then(() => {
        ReactDOM.hydrate((
            <BrowserRouter>
                <App />
            </BrowserRouter>
        ), destination)
    });
};