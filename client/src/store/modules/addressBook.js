import {addFriend, queryAddressBook} from "@/utils/messageType"
const state = {
    addressBook: {}
  };
  
  const mutations = {
    SET_ADDRESS_BOOK: (state, addressBook) => {
      state.addressBook = addressBook;
    }
  };
  
  const actions = {
    initAddressBook({ commit }, addressBook = {}) {
      return new Promise(resolve => {
        
        this.getters.connection.send(queryAddressBook())
        commit("SET_ADDRESS_BOOK", addressBook);
        // console.log("初始化通讯录结束");
        resolve("初始化通讯录结束");
      });
    },
    addFriend(commit, friendId){
      return new Promise((resolve) => {
        this.getters.connection.send(addFriend(friendId))
        // console.log("初始化通讯录结束");
        resolve("初始化通讯录结束");
      });
    }
  };
  
  
  export default {
      namespaced: true,
      state,
      mutations,
      actions
  };
  