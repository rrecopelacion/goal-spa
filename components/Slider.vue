<template>
  <div class="slider">
     <div class="slider-list" :style="{transform: (this.sliderIndex === 0) ? 'translate(0, 0)' : `translate(-${(100 / this.sliderPosts.length) * this.sliderIndex}%, 0)`, width: `${this.sliderPosts.length * 100}%`}">
        <SliderItem
        v-for="(post, index) in sliderPosts"
        :src="post.image"
        :title="post.title"
        :postDate="$moment(new Date(post.createdAt)).format('YYYY.MM.DD')"
        :key="`slider-item-${index}`"
        :width="100 / sliderPosts.length"
        :index="index" />
    </div>
    <div class="slider-button">
      <button
      :class="(this.sliderIndex === 0) ? 'slider-arrow slider-arrow-left is-disabled' : 'slider-arrow slider-arrow-left'"
      @click="handleArrowClick(-1)">
        <img
        src="~/assets/img/slider-arrow-left.png"
        alt="Slider arrow left" />
      </button>
      <button
      :class="(this.sliderIndex === this.sliderPosts.length - 1) ? 'slider-arrow slider-arrow-right is-disabled' : 'slider-arrow slider-arrow-right'"
      @click="handleArrowClick(1)">
        <img
        src="~/assets/img/slider-arrow-right.png"
        alt="Slider arrow right" />
      </button>
    </div>
    <ul class="slider-dots">
      <li
      v-for="(post, index) in sliderPosts"
      class="slider-dots-item"
      :key="`slider-dot-${index}`">
        <button
        :class="`slider-dots-button ${(getSliderIndex() === index) ? 'is-active' : ''}`"
        @click="handleDotsClick(index)"></button>
      </li>
    </ul>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import * as moment from 'moment';
import SliderItem from './SliderItem';

export default {
  name: 'Slider',
  components: {
    SliderItem,
  },
  data() {
    return {
      sliderIndex: 0,
      buttonLeftClass: '',
      buttonRightClass: '',
      sliderListStyle: {},
    }
  },
  methods: {
    handleDotsClick(index) {
      this.sliderIndex = index;
    },
    handleArrowClick(value) {
      let diff = this.sliderIndex + value;
      this.sliderIndex =  (diff > -1 && diff < this.sliderPosts.length) ? diff : this.sliderIndex;
    },
    getSliderIndex() {
      return this.sliderIndex;
    },
  },
  computed: mapGetters('posts', ['sliderPosts']),
}
</script>