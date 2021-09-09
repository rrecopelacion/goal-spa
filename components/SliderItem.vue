<template>
  <div class="slider-item" :style="{width: `${width}%`}">
    <div class="slider-image">
      <img
      class="img-responsive"
      :src="src ? src : placeholder"
      :alt="title" />
    </div>
    <div class="slider-wrapper">
      <div class="slider-content">
        <h2 class="slider-header">
          <span>{{title}}</span>
        </h2>
        <time class="slider-time" :dateTime="postDate">{{postDate}}</time>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      placeholder: require('../assets/img/slider-image.jpg'),
      formatDate: '',
    }
  },
  name: 'SliderItem',
  props: ['src', 'title', 'postDate', 'index', 'width'],
}
</script>
