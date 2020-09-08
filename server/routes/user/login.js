const AccountService = require("../../service/AccountService");
const accountService = new AccountService();

function login(req, res) {
    const { username, password } = req.body;
    accountService.loginOrRegist({ username, password }).then(userInfo => {
        res.send(JSON.stringify({ ...userInfo.toObject(), username: userInfo.username, accountId: userInfo.accountId }));
    }).catch((err) => {
        res.send(JSON.stringify(err));
    })
}

module.exports = { login };