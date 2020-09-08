/** * 用户信息 */ 
var mongoose = require('../service/db.js'), 
Schema = mongoose.Schema; 
var ChatSchema = new Schema({
    type : { type: String }, // 类型 
    from: {type: String}, // 发送人
    to: {type: String}, // 目标
    mine: { type: Schema.Types.ObjectId, ref: 'User' },
    friend: { type: Schema.Types.ObjectId, ref: 'User' },
    last_msg: {type: String}, // 内容
    last_time: {type: String}
});

module.exports = mongoose.model('Chat',ChatSchema);