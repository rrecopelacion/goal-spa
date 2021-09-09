<template>
  <div>
    <PostForm :isNewPost=true />
  </div>
</template>

<script>
import PostForm from '../../components/forms/PostForm';
import {mapGetters} from 'vuex';

export default {
  components: {
    PostForm,
  },
  computed: {
    ...mapGetters('auth', ['user']),
  },
  beforeRouteEnter: function(to, from, next) {
    let isLoggedIn = false;

    if (process.browser) {
      isLoggedIn = localStorage.getItem('userData');
    }

    next(vm => {
      if(isLoggedIn) {
        vm.$router.push('/post/new');
      } else {
        vm.$router.push('/');
      }
    });
  },
}
</script>
