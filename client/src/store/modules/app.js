import vue from "vue";
const state = {
  menus: {},
  isInited: false,
  connection: null,
};

const mutations = {
  SET_MENUS: (state, menus) => {
    state.menus = menus;
  },
  SET_INITED: state => {
    state.isInited = true;
  },
  SET_CONNECTION: (state, connection) => {
    state.connection = connection;
  }
};

const actions = {
  
  setAppInited({ commit }){
    commit("SET_INITED");
    return Promise.resolve("程序初始化结束")
  },

  createConnect({commit}){
    return new Promise(resolve=>{
      const serverUrl = "ws://localhost:80/websocket";
      const username = this.getters.curUser.username;
      const accountId = this.getters.curUser.accountId;
      const connection = new WebSocket(serverUrl + `?username=${username}&&accountId=${accountId}`);
      
      connection.onmessage = handleReveiveMsg.bind(this);
      connection.onopen = function () {
        // connection.send('Hello Server!');
        commit("SET_CONNECTION", connection);
        resolve("建立连接成功");
      }
    })
  },

  initAppSettings({ commit }) {
    return new Promise((resolve) => {
      const topMenu = [
        {
          id: "1",
          name: "聊天",
          url: '/chat/index'
        },
        {
          id: "2",
          name: "联系人",
          url: '/address-book/index'
        },
        {
          id: "3",
          name: "群聊",
          url: '/group-book'
        }
      ];
      const bottomMenu = [
        {
          id: "b1",
          name: "更多"
        }
      ];
      commit("SET_MENUS", { topMenu, bottomMenu });
      resolve("初始化菜单结束");
    });
  }
};


function handleReveiveMsg(evt) {
  let received_msg = evt.data;
  let msgObj = JSON.parse(received_msg)
  console.log(msgObj.type)
  types[msgObj.type].call(this,msgObj)
}

const types = {
  "chat/sendToPerson": function(msgObj){
    const chatInfo = this.getters.recentChat[msgObj.from];
    if (chatInfo) {
      chatInfo.chatList.push({
        id: Math.random(),
        isMe: 0,
        avatar: 'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=176464291,3597204706&fm=26&gp=0.jpg',
        name: msgObj.from,
        value: msgObj.content
      });
  
      chatInfo.content = msgObj.content;
    }
  },
  "addressBook/addFriend":function(msgObj) {
    const addressBookItem = msgObj.addressBookItem;
    if(addressBookItem){
      vue.set(this.getters.addressBook, addressBookItem.friend.username, addressBookItem.friend);
    }else{
      debugger
      alert(`用户[${msgObj.username}]不存在`)
    }
  },
  "addressBook/queryAddressBook": function(msgObj) {
    msgObj.addressBook.map(item=>{
      this.getters.addressBook[item.friend.username] = item.friend
    })
    console.log("addressBook",JSON.stringify(msgObj.addressBook))
    // this.getters.addressBook = this.getters.addressBook.concat(msgObj.addressBook)
    // debugger

  }
}




export default {
    namespaced: true,
    state,
    mutations,
    actions
};
