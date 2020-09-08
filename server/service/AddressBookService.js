const BaseService = require("./base/BaseService");
const AddressBookSchema = require("../schema/addressBookSchema.js");
const AccountService = require("./AccountService");
const dayjs = require('dayjs');

class AddressBookService extends BaseService{
    constructor(){
        super(AddressBookSchema);
        this.accountService = new AccountService();
    }

    async addFriend(ws, msgObj){

        let friendInfo
        msgObj.mine = ws.accountId
        msgObj.mineUsername = ws.username
        msgObj.createTime = dayjs().format("YYYYMMDD HH:mm:ss")
        const friendAccount = await this.accountService.queryAndPopulate({username: msgObj.friend})
        if(friendAccount) {
            friendInfo = friendAccount.toObject()
            msgObj.friendUsername = msgObj.to
            msgObj.friend = friendAccount._id
            const addressBookSchema = new AddressBookSchema(msgObj);
            addressBookSchema.save();
            addressBookSchema.friend = friendAccount
            return addressBookSchema;
        }

        return null;
    }

    findAll(params){
        return new Promise((resolve, reject)=>{
            let handler = AddressBookSchema.find(params).populate({
                path: "friend", // The string we passed in before
                populate: {
                    path: 'user' // This will populate the friends' addresses
                }
            }).exec(function(err,result){
                if(err){
                    console.log(err)
                    reject("查询失败",err)
                }
                console.log(JSON.stringify(result))
                resolve(result)
            })
        })
    }

}

module.exports = AddressBookService;