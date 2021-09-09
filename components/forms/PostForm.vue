<template>
  <div>
    <Breadcrumbs :title="post && !isNewPost ? post.title : 'Create New Post'" />
    <div class="post-section">
      <div class="l-container post-container is-new-post">
        <div v-show="user" class="flex flex-end button-group">
          <button v-if="!showForm" class="button-link" @click="handleEditPost">Edit Post</button>
          <div v-else>
            <button class="button-link button-save" @click="handleFormSubmit">Save Post</button>
            <button class="button-link" @click="handleEditCancel">Cancel</button>
          </div>
        </div>
        <ul class="user-form-errors">
          <li v-for="error in formErrors" :key="error" class="post-form-message post-form-error">{{error}}</li>
          <li v-show="post && !isSinglePost" class="post-form-message post-form-success">Post added</li>
          <li v-show="post && isSinglePost && isUpdated" class="post-form-message post-form-success">Post updated</li>
        </ul>
        <time :class="`post-date ${!user ? 'post-date-padded' : ''}`" :dateTime="formatDate">{{formatDate}}</time>
        <div v-if="!showForm" class="post-body">
          <h2 class="post-title">{{formTitle}}</h2>
          <div class="post-image">
            <img
            class="img-responsive img-full"
            :src="formImage ? formImage : placeholder"
            :alt="formTitle" />
          </div>
          <p class="post-content">{{formContent}}</p>
        </div>
        <form v-else @submit.prevent="handleFormSubmit" class="post-form" noValidate>
          <textarea-autosize
          class="post-form-input post-form-title"
          id="js-form-title"
          name="title"
          v-model="formTitle"
          placeholder="Title" />
          <div class="post-dropzone" @drop.prevent="drop" @dragenter.prevent @dragover.prevent>
            <input type="file" class="post-input" @change="(e) => createFile(e.target.files[0])" ref="file" accept=".jpg,.jpeg,.png" />
            <button class="button button-dropzone" @click.prevent="$refs.file.click()">UPLOAD IMAGE</button>
            <img
            class="img-responsive img-full"
            :src="formImage ? formImage : placeholder"
            :alt="formTitle" />
            <div :class="`post-dropzone-overlay flex flex-align-center flex-center ${formImage ? 'is-disabled' : ''}`">
              <p>Drag image or click the button to upload</p>
            </div>
          </div>
          <textarea-autosize
          class="post-form-input post-form-title"
          name="content"
          v-model="formContent"
          placeholder="Content" />
        </form>
      </div>
    </div>

    <div class="post-comment-section">
      <div class="l-container">
        <h2 class="section-heading">COMMENT</h2>
        <div class="post-comment-list">
          <PostComment
          v-for="comment in comments"
          :key="`comment-${comment.id}`"
          :content="comment.content"
          :date="comment.createdAt" />
        </div>
        <form
        v-show="user"
        class="flex flex-vertical flex-align-end"
        @submit.prevent="handleCommentSubmit">
          <textarea
          class="post-comment-form-text"
          v-model="newComment"
          placeholder="Write comment"
          required />
          <button class="button comment-button">SUBMIT</button>
        </form>
      </div>
    </div>
    <ConfirmModal
    :showModal="showConfirmModal"
    @submit-form="handleFormSubmit"
    @close-modal="handleCloseModal" />
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
import * as moment from 'moment';
import ConfirmModal from '../ConfirmModal';
import Breadcrumbs from '../Breadcrumbs';
import PostComment from '../PostComment';

export default {
  name: 'PostForm',
  components: {
    ConfirmModal,
    Breadcrumbs,
    PostComment,
  },
  props: ['isSinglePost', 'postId', 'isNewPost'],
  data() {
    return {
      placeholder: require('../../assets/img/placeholder1920x1080.png'),
      formTitle: '',
      formContent: '',
      formImage: '',
      formatDate: moment().format('YYYY.MM.DD'),
      formErrors: [],
      comments: [],
      showConfirmModal: false,
      showForm: !this.isSinglePost,
      isUpdated: false,
      newComment: '',
    }
  },
  methods: {
    ...mapActions('posts', ['addPost', 'getPost', 'updatePost', 'addPostComment']),
    validate() {
      let titleErrors = [];

      if(!this.formTitle) {
        titleErrors.push('Title field is required');
      }

      this.formErrors = titleErrors;

      if(titleErrors.length) {
        return false;
      }

      return true;
    },
    handleFormSubmit() {
      let isValid = this.validate();
      if(isValid) {
        if(this.isSinglePost) {
          if(this.formTitle === this.post.title || this.formContent === this.post.formContent || this.formImage === this.post.formImage) {
            this.showForm = false;
          } else {
            this.updatePost({
              title: this.formTitle,
              content: this.formContent,
              image: this.formImage,
              id: parseInt(this.postId),
            });
            this.isUpdated = true;
          }
        } else {
          this.addPost({
            title: this.formTitle,
            content: this.formContent,
            image: this.formImage,
          });
        }
      }
    },
    createFile(file) {
      let reader = new FileReader();
      var vm = this;

      if(file) {
        reader.readAsDataURL(file);
      }
      reader.onloadend = function () {
        vm.formImage = reader.result;
      }
    },
    drop() {
      let file = event.dataTransfer.files[0];
      this.createFile(file);
    },
    handleCloseModal() {
      this.showConfirmModal = false;
    },
    handleEditCancel() {
      if(this.formTitle || this.formContent || this.formImage) {
        if(this.formTitle === this.post.title || this.formContent === this.post.formContent || this.formImage === this.post.formImage) {
          this.showForm = false;
        } else {
          this.showConfirmModal = true;
        }
      } else {
        this.$router.push('/');
      }
    },
    handleEditPost() {
      this.showForm = true;
      this.isUpdated = false;
    },
    handleCommentSubmit() {
      this.addPostComment({
        postId: parseInt(this.postId),
        content: this.newComment,
      });
      this.newComment = '';
    }
  },
  computed: {
    ...mapGetters('posts', ['post']),
    ...mapGetters('auth', ['user']),
  },
  created() {
    if(this.post && this.isSinglePost) {
      this.formImage = this.post.image;
      this.formTitle = this.post.title;
      this.formContent = this.post.content;
      this.comments = this.post.comments;
    }
  },
  watch: {
    post: function(data) {
      if(data && this.isSinglePost) {
        this.formImage = data.image;
        this.formTitle = data.title;
        this.formContent = data.content;
        this.comments = data.comments;
      }

      if(data && this.isSinglePost && this.isUpdated) {
        this.showForm = false;
      }

      if(data && !this.isSinglePost) {
        setTimeout(() => {
          this.$router.push(`/post/${data.id}`);
        }, 1500);
      }
    }
  }
}
</script>