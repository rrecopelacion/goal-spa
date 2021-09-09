<template>
  <div class="footer">
    <div class="l-container">
      <div class="footer__logo">
        <img src="../assets/img/logowt.png" alt="">
      </div>
      <p class="footer__description">
        サンプルテキストサンプル ルテキストサンプルテキストサ<br>ンプルテキストサンプル ルテキスト
      </p>
    </div>
    <div class="footer__copyright">
      <div class="l-container">
        <p>Copyright©2007-2019 Blog Inc.</p>
      </div>
    </div>
    <a @click="scrollTop" v-show="visible" class="button-scroll">
      <img src="../assets/img/totop.png" alt="">
    </a>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false
    }
  },
  methods: {
    scrollTop: function() {
      this.intervalId = setInterval(() => {
        if(window.pageYOffset === 0) {
          clearInterval(this.intervalId);
        }
        window.scroll(0, window.pageYOffset - 50)
      }, 10)
    },
    scrollListener: function(e) {
      this.visible = window.scrollY > 150
    }
  }, 
  mounted: function() {
    window.addEventListener('scroll', this.scrollListener)
  },
  beforeDestroy: function() {
    window.removeEventListener('scroll', this.scrollListener)
  }
}
</script>