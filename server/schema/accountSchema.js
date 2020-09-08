/** * 最近联系人 */
var mongoose = require('../service/db.js'),
    Schema = mongoose.Schema;
var AccountSchema = new Schema({
    username: { type: String }, // 用户名 
    password: { type: String }, // 密码
    user: { type: Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Account', AccountSchema);