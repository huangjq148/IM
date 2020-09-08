
const RecentChatService = require("../../service/RecentChatService");
const UserService = require("../../service/UserService");
const recentChatService = new RecentChatService();
const userService = new UserService();

async function queryList(req, res, next) {
    const result = await recentChatService.queryList({from: req.params.id});
    result.map(item=>{
        userService.queryOne({username: item.to})
    })
    
    res.send(JSON.stringify(result))
}

module.exports = {
    queryList
}