// src/store/index.js
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    registeredUser: {
      username: '',
      password: ''
    }
  },
  mutations: {
    setRegisteredUser(state, payload) {
      state.registeredUser.username = payload.username;
      state.registeredUser.password = payload.password;
    }
  }
});
