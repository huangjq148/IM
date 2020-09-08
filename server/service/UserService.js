const BaseService = require("./base/BaseService");
const UserSchema = require("../schema/userSchema");
class UserService extends BaseService{
    constructor(){
        super();
    }


    queryOne(params){
        return new Promise((resolve,reject)=>{
            UserSchema.findOne(params).exec((err,result)=>{
                if(err){
                    reject(err);
                }
                resolve(result)
            })
        })
    }

    saveOrUpdate(account){
        return new Promise(resolve=>{
            const userSchema = new UserSchema({
                name: account.username,
                sex: "1",
                age: "0",
                avatar: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1598986620854&di=ae2b30ec0546baecf8c0cff1c846f76c&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fforum%2Fw%3D580%2Fsign%3Dabbf8f972d738bd4c421b239918b876c%2F8169ca8065380cd7e02852a7a244ad3459828159.jpg"
            })
            userSchema.save().then(user => {
                resolve(user);
            })
        })
    }
}

module.exports = UserService;