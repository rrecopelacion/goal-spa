<template>
  <PostForm :isSinglePost=true :postId="this.$route.params.id"/>
</template>

<script>
import PostForm from '../../../components/forms/PostForm';
import {mapMutations} from 'vuex';

export default {
  components: {
    PostForm
  },
  methods: {
    ...mapMutations('posts', ['setPost', 'setPosts']),
  },
  beforeRouteLeave: function(to, from, next) {
    this.setPost(null);
    next();
  },
  middleware: ['post'],
  mounted() {
    let userData = localStorage.getItem('userData') || null;
    this.$store.commit('auth/setUser', userData);
  }
}
</script>
