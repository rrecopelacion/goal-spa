import axios from 'axios';
import {GET_POSTS_QUERY, GET_POST_QUERY} from '../../graphql/queries';
import {
  UPDATE_POST_QUERY,
  ADD_COMMENT_QUERY,
  ADD_POST_QUERY
} from '../../graphql/mutations';

const state = {
  posts: [],
  sliderPosts: [],
  isLoading: false,
  hasMore: true,
  post: null,
  errors: [],
};

export const getters = {
  allPosts: (state) => state.posts,
  isLoading: (state) => state.isLoading,
  hasMore: (state) => state.hasMore,
  sliderPosts: (state) => state.sliderPosts,
  post: (state) => state.post,
  errors: (state) => state.errors,
};

const actions = {
  async getPosts({commit}, offset) {
    await axios({
      method: "POST",
      url: 'http://localhost:4000/graphql',
      data: {
        query: GET_POSTS_QUERY,
        variables: {
          offset: 0,
          limit: 6 + offset,
        }
      },
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(({data}) => {
      commit('setPosts', data.data.posts);
      commit('setLoading', false);

      if(data.data.posts.length < offset) {
        commit('setHasMore', false);
      }
    })
    .catch(error => {
      console.log(error);
    });
  },
  updateLoading({commit}, status) {
    commit('setLoading', status);
  },
  async addPost({commit}, payload) {
    await axios({
      method: "POST",
      url: 'http://localhost:4000/graphql',
      data: {
        query: ADD_POST_QUERY,
        variables: payload
      },
      headers: {
        'Content-Type': 'application/json',
        'Authorization': JSON.parse(localStorage.getItem('userData')).authKey,
      }
    })
    .then(({data}) => {
      commit('setPost', data.data.addPost);
    })
    .catch(error => {
      console.log(error);
    });
  },
  updateError({commit}, error) {
    commit('setErrors', error);
  },
  async getPost({commit}, payload) {
    await axios({
      method: "POST",
      url: 'http://localhost:4000/graphql',
      data: {
        query: GET_POST_QUERY,
        variables: payload
      },
      headers: {
        'Content-Type': 'application/json',
        'Authorization': JSON.parse(localStorage.getItem('userData')).authKey,
      }
    })
    .then(({data}) => {
      commit('setPost', data.data.post);
    })
    .catch(error => {
      console.log(error);
    });
  },
  async updatePost({dispatch}, payload) {
    await axios({
      method: "POST",
      url: 'http://localhost:4000/graphql',
      data: {
        query: UPDATE_POST_QUERY,
        variables: payload
      },
      headers: {
        'Content-Type': 'application/json',
        'Authorization': JSON.parse(localStorage.getItem('userData')).authKey,
      }
    })
    .then(() => {
      dispatch('getPost', {id: payload.id}); //dispatch getPost, updatePost return data has bug
    })
    .catch(error => {
      console.log(error);
    });
  },
  async addPostComment({dispatch}, payload) {
    await axios({
      method: "POST",
      url: 'http://localhost:4000/graphql',
      data: {
        query: ADD_COMMENT_QUERY,
        variables: payload
      },
      headers: {
        'Content-Type': 'application/json',
        'Authorization': JSON.parse(localStorage.getItem('userData')).authKey,
      }
    })
    .then(() => {
      dispatch('getPost', {id: payload.postId});
    })
    .catch(error => {
      console.log(error);
    });
  },
  updateError({commit}, error) {
    commit('setErrors', error);
  },
  async getInitialPosts({ commit }) {
    const { data } = await axios.get('http://localhost:3000/api/posts');
    commit('setPosts', data);
    commit('setSliderPosts', data);
  },
};

const mutations = {
  setSliderPosts:  (state, post) => state.sliderPosts = post,
  setPosts: (state, posts) => state.posts = posts,
  setLoading: (state, status) => state.isLoading = status,
  setHasMore: (state, status) => state.hasMore = status,
  setPost: (state, post) => state.post = post,
  setErrors: (state, error) => state.errors = error,
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
