import fs from 'fs';
const path = require('path');

import Generator from '../src/core/Generator';
import postLists from '../public/publish.json';

const gen = new Generator();

fs.readdir(__dirname + '/posts/', function (err, files) {
    if (err) {
        next(err);
        return;
    }

    const destinationDir = path.resolve(__dirname, '..', 'public/posts');
    if (!fs.existsSync(destinationDir)) {
        fs.mkdirSync(destinationDir);
    };

    files.forEach(function (f) {
        if (!postLists.published.find(p => p.url.includes(f.replace('.md', '')))) return;

        const htmlFile = destinationDir + "/" + f.replace('.md', '.html');
        fs.readFile(__dirname + '/posts/' + f, function (err, data) {
            if (err)
                throw err;
            console.log("Reading: ", f);
            if (data) {
                let mdText = data.toString('utf8');
                fs.writeFile(htmlFile, gen.mdToHtml(mdText), function (err) {
                    if (err)
                        throw err;
                    else
                        console.log('>>', htmlFile);
                });
            }
        });
    });

    console.log("Completed!");
});
