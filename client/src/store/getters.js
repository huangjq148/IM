export default {
  curUser: state => state.user.curUser,
  connection: state => state.app.connection,
  menus: state => state.app.menus,
  addressBook: state => state.addressBook.addressBook,
  recentChat: state => state.chatLogs.recentChat,
  chatingUserId: state => state.chatLogs.chatingUserId,
  curChatList: state=> {
    let chatList = state.chatLogs.chatingUserId?state.chatLogs.recentChat[state.chatLogs.chatingUserId].chatList:[];
    return chatList;
  },
  curChatUserInfo: state=> state.chatLogs.chatingUserId?state.chatLogs.recentChat[state.chatLogs.chatingUserId]:{}
};
