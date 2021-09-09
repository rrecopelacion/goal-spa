import Vue from 'vue'
import Vuex from 'vuex'

import posts from './modules/posts';
import auth from './modules/auth';

Vue.use(Vuex)

const store = () => {
  return new Vuex.Store({
    actions: {
      async nuxtServerInit({ dispatch }) {
        await dispatch('posts/getInitialPosts');
      }
    },
    modules: {
      posts,
      auth
    },
  })
}

export default store
