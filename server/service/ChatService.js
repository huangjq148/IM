const BaseService = require("./base/BaseService");
const ChatSchema = require("../schema/chatSchema");
class ChatService extends BaseService{
    constructor(){
        super();
    }

    saveMsg(msgObj){
        const chatSchema = new ChatSchema(msgObj);
        chatSchema.save();
    }
}

module.exports = ChatService;