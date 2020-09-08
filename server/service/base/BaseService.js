const mongoose = require('mongoose');
const { resolve } = require('url');
const { rejects } = require('assert');
class BaseService {
    DB_URL = 'mongodb://localhost:27017/myChat'; /** * 连接 */ 
    constructor(BaseSchema){
        this.mongoose = mongoose;
        this.mongoose.connect(this.DB_URL)
        this.BaseSchema = BaseSchema
    }

    find(params, populates){
        return new Promise((resolve,reject)=>{
            let handler = this.BaseSchema.find(params)
            populates && (handler = handler.populate(populates))
            handler.exec(function(err,result){
                if(err){
                    console.log(err)
                    reject("查询失败",err)
                }
                console.log(JSON.stringify(result))
                resolve(result)
            })
        })
    }

    findOne(params){
        return new Promise((resolve,reject)=>{
            this.BaseSchema.findOne(params).exec(function(err,result){
                if(err){
                    reject("查询失败",err)
                }
                resolve(result)
            })
        })
    }

    connect(){
    }

    close(){
        // this.mongoose.disconnect();
    }
}

module.exports = BaseService;