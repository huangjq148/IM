const BaseService = require("./base/BaseService");
const RecentChatSchema = require("../schema/recentChatSchema.js");
const { resolve } = require("url");
class RecentChatService extends BaseService{
    constructor(){
        super();
    }

    saveOrUpdate(msgObj){
        RecentChatSchema.findOneAndUpdate({from: msgObj.from, to: msgObj.to}, msgObj,{
            upsert: true,
            new: true
        }).exec((err)=>{
            if(err){
                console.error(err)
            }
        })
    }

    queryList(params){
        return new Promise((resolve,reject)=>{
            RecentChatSchema.find(params).exec((err,result)=>{
                if(err){
                    console.error("查询失败",err);
                    reject(err);
                }
                resolve(result);
            })
        })
    }
}

module.exports = RecentChatService;