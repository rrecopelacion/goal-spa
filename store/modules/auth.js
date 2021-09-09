import axios from 'axios';
import { AUTH_USER, REGISTER_USER } from '../../graphql/mutations';

const headers = {
  'Content-Type': 'application/json',
};

const state = {
  user: null,
  showLoginForm: false,
  showRegisterForm: false,
  isLoading: false,
  errors: [],
};

const getters = {
  user: (state) => state.user,
  showLoginForm: (state) => state.showLoginForm,
  showRegisterForm: (state) => state.showRegisterForm,
  errors: (state) => state.errors,
};

const actions = {
  async userLogin({commit}, payload) {
    await axios({
      method: "POST",
      url: 'http://localhost:4000/graphql',
      data: {
        query: AUTH_USER,
        variables: payload
      },
      headers
    })
    .then(({data}) => {
      if(data.data.authenticate) {
        let userData = {email: payload.email, authKey: data.data.authenticate};
        commit('setUser', userData);
        localStorage.setItem('userData', JSON.stringify(userData));
        setTimeout(() => {
          commit('setLoginForm', false);
          commit('setRegisterForm', false);
        }, 1500);
      } else {
        commit('setErrors', ['Invalid user']);
      }
    })
    .catch(error => {
      console.log(error);
    });
  },
  async userRegister({commit, dispatch}, payload) {
    await axios({
      method: "POST",
      url: 'http://localhost:4000/graphql',
      data: {
        query: REGISTER_USER,
        variables: payload
      },
      headers
    })
    .then(({data}) => {
      if(data.data.register) {
        dispatch('userLogin', payload);
      } else {
        commit('setErrors', ['Email address already taken']);
      }
    })
    .catch(error => {
      console.log(error);
    });
  },
  updateLoginForm({commit}, status) {
    commit('setLoginForm', status);
  },
  updateRegisterForm({commit}, status) {
    commit('setRegisterForm', status);
  },
  updateLoading({commit}, status) {
    commit('setLoading', status);
  },
  userLogout({commit}) {
    commit('setUser', null);
  },
};

const mutations = {
  setUser: (state, user) => state.user = user,
  setLoginForm: (state, status) => state.showLoginForm = status,
  setRegisterForm: (state, status) => state.showRegisterForm = status,
  setLoading: (state, status) => state.isLoading = status,
  setErrors: (state, error) => state.errors = error,
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
