const titlePostfix = "| blog Chanh Dây";
const postTitlePostfix = "| Chanh's blog";

let exportPathMap = {
    '/': { path: '/', title: `Nơi tôi tập tành viết lách ${titlePostfix}` },
    '/about-me': { path: '/about-me', title: `Nơi tôi tập tành viết lách ${titlePostfix}` }
}

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router';
import Loadable from 'react-loadable';
import postApi from '../src/api/post-api';

// import our main App component
import App from '../src/components/layout/App';

const path = require("path");
const fs = require("fs");
const mkdirp = require("mkdirp");

import manifest from '../build/asset-manifest.json';
import publish from '../build/publish.json';

const extractAssets = (assets, chunks) => Object.keys(assets)
    .filter(asset => chunks.indexOf(asset.replace('.js', '')) > -1)
    .map(k => assets[k]);

function exportHtml(contentTemplate, pageUrl, exportDir, title) {
    // render the app as a string
    const context = {}
    const modules = [];

    // render the app as a string
    const html = ReactDOMServer.renderToString(
        <Loadable.Capture report={m => modules.push(m)}>
            <StaticRouter
                location={pageUrl}
                context={context}>
                <App />
            </StaticRouter>
        </Loadable.Capture>
    );

    const extraChunks = extractAssets(manifest, modules)
        .map(c => `<script type="text/javascript" src="/${c}"></script>`);

    const content = contentTemplate
        .replace(
            'id="root"/>',
            `id="root">${html}</div>`
        )
        // .replace(
        //     '<script type="text/javascript" src="/static/js/main',
        //     '<script async type="text/javascript" src="/static/js/main'
        // )
        .replace(
            '</body>',
            extraChunks.join('') + '</body>'
        )
        .replace(
            '<head>',
            `<head><title>${title}</title>`
        );

    mkdirp(exportDir, (err) => {
        fs.writeFile(exportDir + '/index.html', content, (err) => { if (err) throw err; });
    });
}

export default (rootContentDir, templatePath) => new Promise(async (resolve, reject) => {

    // include all posts
    publish.published.forEach(post => exportPathMap[post.url] = {
        path: post.url,
        title: `${post.title} ${postTitlePostfix}`
    });

    // load data before rendering
    await postApi.getPostLists();
    for(let page in exportPathMap) {
        if (!page.includes("/p/")) {
            continue;
        }
        await postApi.getPostContent(page.split('/').splice(-1));
    }    

    fs.readFile(templatePath, 'utf8', (err, htmlData) => {
        if (err) {
            reject(err);
        }

        for (let k in exportPathMap) {
            let page = exportPathMap[k];
            exportHtml(htmlData, k, path.join(rootContentDir, page.path), page.title);
        };

        resolve("exported successfully!");
    });
});
