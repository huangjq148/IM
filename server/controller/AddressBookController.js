const BaseController = require("./BaseController")
const AddressBookService = require("../service/AddressBookService");
const AccountService = require("../service/AccountService");

class AddressBookController extends BaseController{
    constructor() {
        super();
        this.addressBookService = new AddressBookService();
        this.accountService = new AccountService();
    }

    /**
     * 添加好友
     * @param {*} ws 
     * @param {*} msgObj 
     */
    async addFriend(ws, msgObj){
        
        let addressBookItem = await this.addressBookService.addFriend(ws, msgObj);
        let status = "success"

        if(!addressBookItem){
            status = "fail";
        }

        ws.send(JSON.stringify({
            username: msgObj.friend,
            addressBookItem,
            status,
            type: msgObj.type
        }))
    }

    /**
     * 查询通讯录
     * @param {*} ws 
     * @param {*} msgObj 
     */
    async queryAddressBook(ws, msgObj){
        try{
            const addressBook = await this.addressBookService.findAll({mine: ws.accountId});
            ws.send(JSON.stringify({
                addressBook,
                type: msgObj.type
            }))
        }catch(e){
            console.log(e)
        }
    }
}

module.exports = AddressBookController;