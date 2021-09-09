<template>
  <div :class="`modal-form ${showLoginForm ? 'is-active' : ''}`">
    <form class="modal-form-content" @submit.prevent="handleFormSubmit" noValidate>
      <h2 class="modal-form-header">LOGIN</h2>
      <ul class="modal-form-errors">
        <li v-for="error in formErrors" :key="error" class="modal-form-message modal-form-error">{{error}}</li>
        <li v-show="user" class="modal-form-message modal-form-success">Login Success...Redirecting...</li>
      </ul>
      <div class="modal-form-group">
        <label class="modal-form-label" htmlFor="email">Email</label>
        <input class="modal-form-input"
        id="email"
        name="email"
        type="email"
        v-model="email" />
      </div>
      <div class="modal-form-group">
        <label class="modal-form-label" htmlFor="password">Password</label>
        <input class="modal-form-input"
        id="password"
        name="password"
        v-model="password"
        type="password" />
      </div>
      <button
        :class="`button modal-form-button ${user ? 'is-disabled' : ''}`">
        LOGIN</button>
    </form>
    <p class="modal-form-action">
      No account yet?
      <button
        class="modal-form-link"
        @click="handleSwitch" >REGISTER HERE</button>
    </p>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      formErrors: [],
    }
  },
  methods: {
    ...mapActions('auth', ['userLogin', 'updateLoading']),
    validate() {
      let emailErrors = [];
      let passwordErrors = [];

      if(!this.email) {
        emailErrors.push('Email field is required');
      }

      if(!this.email.includes('@')) {
        emailErrors.push('Invalid Email');
      }

      if(!this.password) {
        passwordErrors.push('Password field is required');
      }

      this.formErrors = [...emailErrors, ...passwordErrors];
      if(emailErrors.length || passwordErrors.length) {
        return false;
      }

      return true;
    },
    handleFormSubmit() {
      let isValid = this.validate();

      if(isValid) {
        this.updateLoading(true);
        this.userLogin({email: this.email, password: this.password});
      }
    },
    handleSwitch() {
      this.$emit('switch-form', 'register');
    },
  },
  computed: mapGetters('auth', ['user', 'showLoginForm', 'errors']),
  watch: {
    user: function(val) {
      if(val) {
        this.email = "";
        this.password = "";
        this.formErrors = [];
      }
    },
    errors: function(val) {
      if(val) {
        this.formErrors = val;
      }
    }
  }
}
</script>
