import { loginByAccount } from "@/service/login"

const state = {
  curUser: ""
};

const mutations = {
  SET_USERINFO: (state, curUser) => {
    state.curUser = curUser;
  }
};

const actions = {
  login({ commit }, accountInfo) {
    return new Promise((resolve, reject) => {
      loginByAccount(accountInfo).then(res => {
        const data = res.data;
        if (data._id) {
          sessionStorage.setItem("username", accountInfo.username)
          sessionStorage.setItem("password", accountInfo.password)
          data.id = data._id;
          commit("SET_USERINFO", data)
          resolve();
        } else {
          reject(data.msg)
        }
      })
    })
  },

  setCurUser({ commit }, curUser) {
    commit("SET_USERINFO", curUser);
    return Promise.resolve("登陆完成")
  }
};


export default {
  namespaced: true,
  state,
  mutations,
  actions
};
