import express from 'express';
import socketio from 'socket.io';
import bodyParser from 'body-parser';
import fs from 'fs';

import Generator from './Generator';
import postLists from '../public/publish.json';

const app = express();
const gen = new Generator();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(express.static("."));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-type');
    next();
});

app.post('/save-post', (req, res, next) => {
    const mdFileName = req.body.slug + ".md";
    const htmlFileName = req.body.slug + ".html";

    fs.writeFile(__dirname + '/posts/' + mdFileName, req.body.mdText, function (err) {
        if (err)
            next(err);
        else {
            // fs.writeFile('../public/posts/' + htmlFileName, gen.mdToHtml(req.body.mdText), function(err) {
            //     if(err)
            //         res.status(500).json({ error: err });
            //     res.status(200).json('Post saved');
            // });   
            res.status(200).json('Post saved');
        }
    });
});

app.get('/get-md/:slug', (req, res, next) => {
    let mdFile = __dirname + '/posts/' + req.params.slug + ".md";
    fs.readFile(mdFile, function (err, data) {
        if (err) {
            next(err);
            return;
        };
        if (data) {
            const mdText = data.toString('utf8');
            res.send(mdText);
        } else
            res.send("Failed to get post content!");
    });
});

app.get('/publish-all', (req, res, next) => {
    fs.readdir(__dirname + '/posts/', function (err, files) {
        if (err) {
            next(err);
            return;
        }

        files.forEach(function (f) {
            if (!postLists.published.find(p => p.url.includes(f.replace('.md', '')))) return;

            let htmlFile = '../public/posts/' + f.replace('.md', '.html');
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

        res.json("Completed!");
    });
});

app.get('/preview', (req, res) => {
    fs.watch(req.query.url, (event) => {
        console.log('Change detected');
        if (currentSocket) {
            currentSocket.emit('reload');
        }
    });
    res.json("abc");
    //preview(req.query.url, res);
});

// Remember that Express middleware executes in order. 
// You should define error handlers last, after all other middleware. 
// Otherwise, your error handler won't get called:
// development error handler
// will print stacktrace
// if (app.get('env') === 'development') {

//     app.use(function (err, req, res, next) {
//         res.status(err.status || 500);
//         res.render('error', {
//             message: err.message,
//             error: err
//         });
//     });

// }

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500)
        .send(err.message);
});

console.log("Server is running at: http://localhost:3030");
let http = app.listen(3030);
let io = socketio(http);

io.on('connect', (socket) => {
    console.log('client connected');
    currentSocket = socket;
});