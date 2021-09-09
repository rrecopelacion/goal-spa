<template>
  <section class="section post-section">
      <div class="l-container">
        <div class="section-title flex">
          <h2 class="section-heading">NEWS</h2>
          <nuxt-link v-show="user" to="post/new">Create New Post</nuxt-link>
        </div>
        <div class="post-content">
          <ul class="post-list-group">
            <li
            v-for="(post, index) in allPosts"
            class="post-list-item"
            :key="`post-group-${index}`">
              <nuxt-link :to="`post/${post.id}`" class="post-list-link">
                <article class="post-article">
                  <div class="post-article-image">
                    <img
                    class="img-responsive"
                    :src="post.image ? post.image : placeholder"
                    :alt="post.title" />
                  </div>
                  <div class="post-article-content">
                    <time class="post-article-time" :dateTime="getDateFormat(post.createdAt)">{{getDateFormat(post.createdAt)}}</time>
                    <p class="post-article-text">{{post.title}}</p>
                  </div>
                </article>
              </nuxt-link>
            </li>
          </ul>
        </div>
        <div class="tc">
          <button
          :class="`button ${(isLoading || !hasMore) ? 'is-disabled' : ''}`"
          @click="handleLoadMore()"> {{isLoading ? 'LOADING...' : (!hasMore ? 'NO MORE POSTS' : 'LOAD MORE')}}</button>
        </div>
      </div>
  </section>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
import * as moment from 'moment';

export default {
  name: 'PostsList',
  data() {
    return {
      limit: 6,
      index: 0,
      placeholder: require('../assets/img/placeholder280x200.png'),
    }
  },
  methods: {
    ...mapActions('posts', ['updateLoading', 'getPosts']),
    getDateFormat(date) {
      return moment(new Date(date)).format('YYYY.MM.DD');
    },
    handleLoadMore() {
      this.updateLoading(true);
      this.index += this.limit;
      setTimeout(() => {
        this.getPosts(this.index);
      }, 500); //add timeout to show loading
    },
  },
  computed: {
    ...mapGetters('posts', ['allPosts', 'isLoading', 'hasMore']),
    ...mapGetters('auth', ['user']),
  },
}
</script>