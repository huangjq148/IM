/** * 最近联系人 */ 
var mongoose = require('../service/db.js'), 
Schema = mongoose.Schema; 
var UserSchema = new Schema({
    name : { type: String }, // 类型 
    sex: {type: String}, // 发送人
    age: {type: String}, // 目标
    avatar: {type: String} // 内容
});

module.exports = mongoose.model('User',UserSchema);