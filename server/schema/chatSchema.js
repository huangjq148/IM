/** * 用户信息 */ 
var mongoose = require('../service/db.js'), 
Schema = mongoose.Schema; 
var ChatSchema = new Schema({
    sessionId: {type: Schema.Types.ObjectId, ref: 'Session'},
    type : { type: String }, // 类型 
    from: {type: String}, // 发送人
    to: {type: String}, // 目标
    mine: { type: Schema.Types.ObjectId, ref: 'User' },
    friend: { type: Schema.Types.ObjectId, ref: 'User' },
    content: {type: String} // 内容
});

module.exports = mongoose.model('Chat',ChatSchema);