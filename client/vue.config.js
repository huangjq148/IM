// vue.config.js
'use strict';
const path = require('path');

function resolve(dir) {
    return path.join(__dirname, dir);
}

const name = 'myChat'; // page title

module.exports = {
    configureWebpack: {
        // provide the app's title in webpack's name field, so that
        // it can be accessed in index.html to inject the correct title.
        name: name,
        resolve: {
            alias: {
                '@': resolve('src'),
            },
        },
    },
    devServer: {
        proxy: {
          '/': {
            target: 'http://localhost:3000/',
            changeOrigin: true
          },
          '/foo': {
            target: '<other_url>'
          }
        }
    }
};
