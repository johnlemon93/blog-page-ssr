import fs from 'fs';
const path = require('path');
const cpx = require('cpx');

console.log("deploying...");

const blogDir = path.resolve(__dirname, '../..', 'johnlemon93.github.io/')
const blogStaticDir = blogDir + "/static";
const blogPostsDir = blogDir + "/posts";
const blogPdir = blogDir + "/p";

const removeOldDir = function (directory) {
    let files = fs.readdirSync(directory);

    for (const file of files) {
        let fullPath = path.join(directory, file);

        if (fs.lstatSync(fullPath).isDirectory()) 
            removeOldDir(fullPath);
        else
            fs.unlinkSync(fullPath);
    }

    fs.rmdirSync(directory);
}

removeOldDir(blogStaticDir);
removeOldDir(blogPostsDir);
removeOldDir(blogPdir);

// copy new files    
cpx.copySync(path.resolve(__dirname, '..', 'build/**/*.*'), blogDir, { update: true });

console.log("deployed successfully!");