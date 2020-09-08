// 发消息给用户
export function getToPersonMsg({ to, content }) {
    return JSON.stringify({
        type: "chat/sendToPerson",
        to,
        content
    })
}

// 连接后发送消息
export function afterConnected(userId) {
    return JSON.stringify({
        type: "createConnect",
        userId
    })
}

// 添加好友
export function addFriend(friend) {
    return JSON.stringify({
        type: "addressBook/addFriend",
        friend
    })
}

// 查询通讯录
export function queryAddressBook() {
    return JSON.stringify({
        type: "addressBook/queryAddressBook"
    })
}