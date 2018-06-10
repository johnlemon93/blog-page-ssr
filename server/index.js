import express from 'express';

import exportContent from './export-content';
import Loadable from 'react-loadable'

const PORT = 3080;
const path = require('path');

// initialize the application
const app = express();

// other static resources should just be served as they are
app.use(express.static(
    path.resolve(__dirname, '..', 'build'),
    { maxAge: '30d' },
));

// point to the html file created by CRA's build tool
const rootContentDir = path.resolve(__dirname, '..', 'build');
const contentTemplatePath = path.join(rootContentDir, 'template', "index.html");

// start the app
Loadable.preloadAll().then(() => {
    app.listen(process.env.PORT || PORT, (error) => {
        if (error) {
            return console.log('something bad happened', error);
        }

        console.log("exporting content...");
        exportContent(rootContentDir, contentTemplatePath)
            .then((msg) => {
                console.log(msg);
                console.log("listening on " + PORT + "...");
            })
            .catch(err => console.log(err));
    });
});
