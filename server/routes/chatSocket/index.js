let express = require('express');
let router = express.Router();
let WebSocket = require("ws")
let WebSocketServer = WebSocket.Server;
let wss = new WebSocketServer({ port: 80 })
let SocketUtil = require("../socketUtil")
const config = require("../../config")
const url = require('url');
// const {RDS_PORT, RDS_HOST, RDS_OPTS} = config.redis
const ChatController = require("../../controller/ChatController");

const IndexController = require("../../controller");
const indexControllerInstance = new IndexController();

const chatController = new ChatController();


const path = require("path");
const requireAll = require('require-all');

const controllerIntances = require('require-all')({
    dirname: path.resolve("./controller"),
    filter: /(.+Controller)\.js$/,
    resolve: function (Controller) {
        return new Controller();
    },
    map: function (name, path) {
        return name.replace("Controller", "").replace(name.substr(0, 1), name.substr(0, 1).toLocaleLowerCase())
    }
});
//初始化聊天记录
// redisClient.set("chatHistory", JSON.stringify([]), redis.print);

//有连接加入时
wss.on('connection', function (ws, connectInfo) {
    if (connectInfo.url) {
        const query = url.parse(connectInfo.url, true).query;
        const accountId = query.accountId;
        const username = query.username;
        username && (ws.username = username);
        accountId && (ws.accountId = accountId);
        controllerIntances.chat.addOnlineUser(ws)
        console.log(`用户:[${username}]加入连接`)
    }
    // const socketUtil = new SocketUtil(ws,rooms,redisClient);

    ws.on("message", function (msg) {
        console.log(`收到消息：${msg}`)
        let msgObj = JSON.parse(msg)

        const methodPath = msgObj.type.split("/")
        const instance = controllerIntances[methodPath[0]];
        instance[methodPath[1]](ws, msgObj);
    });


    ws.on("close", function () {
        // socketUtil.leaveRoom(ws)
        controllerIntances.chat.subOnlineUser(ws.username)
        console.log("有用户断开连接")
    })
});



module.exports = router;
