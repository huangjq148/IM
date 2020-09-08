/** * 最近联系人 */ 
var mongoose = require('../service/db.js'), 
Schema = mongoose.Schema; 
var RecentChatSchema = new Schema({
    from : { type: String }, // 类型 
    to: {type: String}, // 目标
    content: {type: String} // 内容
});

module.exports = mongoose.model('RecentChat',RecentChatSchema);