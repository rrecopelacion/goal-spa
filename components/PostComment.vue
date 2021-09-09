<template>
  <div class="post-comment-item">
    <p class="post-comment-content">{{content}}</p>
    <time class="post-comment-date">{{formatDate()}} ago</time>
  </div>
</template>

<script>
import * as moment from 'moment';

export default {
  name: 'PostComment',
  props: ['content', 'date'],
  methods: {
    formatDate() {
      let now = moment(new Date());
      let postDate = moment(new Date(this.date));
      let duration = moment.duration(now.diff(postDate));
      let months = Math.floor(duration.asMonths());
      let days = Math.floor(duration.asDays());
      let hours = Math.floor(duration.asHours());
      let minutes = Math.floor(duration.asMinutes());
      let seconds = Math.floor(duration.asSeconds());
      let newDate = seconds > 1 ? `${seconds} seconds` : `${seconds} second`;

      if(months > 0) {
        newDate = months > 1 ? `${months} months` : `${months} month`;
      } else if(days > 0) {
        newDate = days > 1 ? `${days} days` : `${days} day`;
      } else if(hours > 0) {
        newDate = hours > 1 ? `${hours} hours` : `${hours} hour`;
      } else if(minutes > 0) {
        newDate = minutes > 1 ? `${minutes} minutes` : `${minutes} minute`;
      }

      return newDate;
    }
  }
}
</script>