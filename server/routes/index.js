
let express = require('express')
let router = express.Router()

const recentChat = require("./chat/recentChat");

const login = require("./user/login");

router.get('/recentChat/list/:id', recentChat.queryList);

router.post('/user/login', login.login);

module.exports = router