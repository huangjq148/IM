/** * 用户信息 */ 
var mongoose = require('../service/db.js'), 
Schema = mongoose.Schema; 
var AddressBookSchema = new Schema({
    mine : { type: Schema.Types.ObjectId, ref: 'Account' }, // 我的id
    friend: { type: Schema.Types.ObjectId, ref: 'Account' }, // 朋友的id
    mineUsername : { type: String }, // 我的username
    friendUsername: { type: String }, // 朋友的username
    createTime: {type: String} //添加时间
});

module.exports = mongoose.model('AddressBook',AddressBookSchema);