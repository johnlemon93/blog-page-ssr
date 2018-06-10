require('ignore-styles');
process.env.NODE_ENV = 'production';
process.env.BABEL_ENV = 'production';

require('babel-register')({
    ignore: [ /(node_modules)/ ],
    presets: ['es2015', 'react-app'],
    plugins: [
        'syntax-dynamic-import',
        'dynamic-import-node',
        'react-loadable/babel'
    ]
});

require('./index');