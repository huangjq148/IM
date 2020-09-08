const path = require("path");
const requireAll = require('require-all');

// const ChatController = require("./ChatController")
// const AddressBookController = require("./AddressBookController")

class Main {
    constructor() {
        let a = path.resolve("./", __dirname)

        this.controllerIntances = require('require-all')({
            dirname: __dirname,
            filter: /(.+Controller)\.js$/,
            resolve: function (Controller) {
                return new Controller();
            },
            map: function (name, path) {
                return name.replace("Controller","").replace(name.substr(0,1),name.substr(0,1).toLocaleLowerCase())
            }
        });
    }

    getInstance(controllerName) {
        return this.controllerIntances[controllerName];
    }
}

module.exports = Main;