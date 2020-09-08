const BaseController = require("./BaseController")
const ChatService = require("../service/ChatService");
const RecentChatService = require("../service/RecentChatService");
class ChatController extends BaseController{
    constructor() {
        super();
        this.onlineUsers = {};
        this.chatService = new ChatService();
        this.recentChatService = new RecentChatService();
    }

    addOnlineUser(ws){
        const username = ws.username;
        const oldWs = this.onlineUsers[username];
        if(oldWs){
            oldWs.send("此账号在别的地方登录，请您重新登陆");
            oldWs.close();
        }
        this.onlineUsers[username] = ws;
    }

    subOnlineUser(username){
        if(this.onlineUsers[username] > 1){
            this.onlineUsers[username]--;
        }else{
            delete this.onlineUsers[username];
        }
    }

    sendToPerson(ws, msgObj){
        const toUserId = msgObj.to;
        const toUserHandle = this.onlineUsers[toUserId];

        msgObj.from = ws.username;
        
        this.chatService.saveMsg(msgObj);
        this.recentChatService.saveOrUpdate(msgObj);

        console.log(`${msgObj.from} 发送给${msgObj.to}`)
        if(toUserHandle){
            toUserHandle.send(JSON.stringify(msgObj));
        }
    }
}

module.exports = ChatController;