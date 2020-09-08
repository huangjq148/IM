import axios from "axios";
import { getToPersonMsg, afterConnected } from "@/utils/messageType"
const state = {
  recentChat: {},
  chatingUserId: ""
};

const mutations = {
  SET_RECENT_CHAT: (state, recentChat) => {
    state.recentChat = recentChat;
  },
  SET_CHATING_USER_ID: (state, chatingUserId) => {
    state.chatingUserId = chatingUserId;
  }
};

// function handleReveiveMsg(evt) {
//   let received_msg = evt.data;
//   let msgObj = JSON.parse(received_msg)
//   const chatInfo = state.recentChat[msgObj.from];
//   if (chatInfo) {
//     chatInfo.chatList.push({
//       id: Math.random(),
//       isMe: 0,
//       avatar: 'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=176464291,3597204706&fm=26&gp=0.jpg',
//       name: msgObj.from,
//       value: msgObj.content
//     });

//     chatInfo.content = msgObj.content;
//   }
// }

const actions = {

  afterConnected() {
    this.getters.connection.send(afterConnected(this.getters.curUser.id))
  },

  // 发送消息
  sendMsg({ commit }, msg) {
    const userId = this.state.chatLogs.chatingUserId;
    this.state.chatLogs.recentChat[userId].chatList.push({
      id: Math.random(),
      isMe: 1,
      avatar: 'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=176464291,3597204706&fm=26&gp=0.jpg',
      name: "我",
      value: msg
    })

    this.getters.connection.send(getToPersonMsg({
      to: this.getters.curChatUserInfo.id,
      content: msg
    }))

    commit("SET_RECENT_CHAT", this.state.chatLogs.recentChat)
    console.log(msg)
  },

  setChatingUserId({ commit }, userId) {
    commit("SET_CHATING_USER_ID", userId);
  },

  initRecentChat({ commit }) {
    return new Promise((resolve) => {
      const data = [];
      const recentChat = {};
      axios.get(`/recentChat/list/${this.getters.curUser._id}`).then(res => {
        console.log(res.data)

        if (res.data instanceof Array) {
          res.data.map(item => {
            state.recentChat[item.to] = {
              id: item.username,
              name: item.name,
              avatar: item.avatar,
              content: item.content,
              chatList: []
            }
          })
          console.log("结束", recentChat)
        }
      })
      for (let i = 1; i < 3; i++) {
        const chatList = [];
        for (let j = 0; j < 10; j++) {
          const isMe = j % 2
          chatList.push({
            id: j,
            isMe: isMe,
            avatar:
              'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=176464291,3597204706&fm=26&gp=0.jpg',
            name: isMe == 0 ? `用户${i}` : '用户',
            value: `这是第${j}条记录记录记录记录记录记录`,
          });
        }
        data.push({
          id: i == 1 ? "user1" : "user2",
          name: `用户${i}`,
          avatar:
            'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=176464291,3597204706&fm=26&gp=0.jpg',
          content: 'hehe',
          chatList
        });
      }
      data.map(item => {
        recentChat[item.id] = item;
      })

      commit("SET_RECENT_CHAT", recentChat);
      // console.log("初始化最近联系人结束");
      resolve("初始化最近联系人结束");
    });
  }
};


export default {
  state,
  mutations,
  actions
};
