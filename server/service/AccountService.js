const BaseService = require("./base/BaseService");
const AccountSchema = require("../schema/accountSchema");
const UserSchema = require("../schema/userSchema");
const UserService = require("./UserService");

class AccountService extends BaseService {
    constructor() {
        super(AccountSchema);
        this.AccountSchema = AccountSchema;
        this.userService = new UserService();
    }

    save(msgObj) {
        const accountSchema = new AccountSchema(msgObj);
        accountSchema.save();
    }

    async loginOrRegist(account) {
        return new Promise((resolve, reject) => {
            AccountSchema.find({ username: account.username }).exec(async (err, result) => {
                if (err) {
                    console.error("查询出错");
                    reject("查询出错");
                }
                if (result.length == 0) {
                    let user = await this.userService.saveOrUpdate({name: account.username})
                    const accountSchema = new AccountSchema({
                        ...account,
                        user: user.id
                    })
                    accountSchema.save().then(account => {
                        user.username = account.username;
                        user.accountId = account._id;
                        resolve(user);
                    })
                } else {
                    AccountSchema.findOne(account).exec(function (err, account) {
                        if (err) {
                            reject({ status: "fail", msg: "查询出错" });
                        }
                        if (!account) {
                            reject({ status: "fail", msg: "密码错误" })
                        } else {
                            UserSchema.findById(account.user).exec(function (err, user) {
                                if (err) {
                                    reject(err);
                                }
                                user.username = account.username;
                                user.accountId = account._id;
                                resolve(user);
                            })
                        }
                    })
                }
            })
        })
    }

    queryAndPopulate(params){
        return new Promise(resolve=>{
            AccountSchema.findOne(params).populate({
                path: "user" // The string we passed in before
            }).exec((err,account)=>{
                if(err){
                    console.error("查询失败", err)
                    reject("查询失败")
                }else{
                    resolve(account);
                }
            })
        })
    }
}

module.exports = AccountService;