<template>
  <section :class="`modal-form ${showRegisterForm ? 'is-active' : ''}`">
    <form class="modal-form-content" @submit.prevent="handleFormSubmit" noValidate>
      <h2 class="modal-form-header">REGISTER</h2>
      <ul class="modal-form-errors">
        <li v-for="error in formErrors" :key="error" class="modal-form-message modal-form-error">{{error}}</li>
        <li v-show="user" class="modal-form-message modal-form-success">Register Success...Logging in...</li>
      </ul>
      <div class="modal-form-group">
        <label class="modal-form-label" htmlFor="email">Email</label>
        <input class="modal-form-input"
        id="register-email"
        name="register-email"
        type="email"
        v-model="email" />
      </div>
      <div class="modal-form-group">
        <label class="modal-form-label" htmlFor="password">Password</label>
        <input class="modal-form-input"
        id="js-register-password"
        name="register-password"
        v-model="password"
        type="password" />
      </div>
      <div class="modal-form-group">
        <label class="modal-form-label" htmlFor="confirm-password">Confirm Password</label>
        <input class="modal-form-input"
        id="js-confirm-password"
        name="confirm-password"
        v-model="confirmPassword"
        type="password" />
      </div>
      <button :class="`button modal-form-button ${user ? 'is-disabled' : ''}`">
        REGISTER</button>
    </form>
    <p class="modal-form-action">
      Already have an account?
      <button
        class="modal-form-link"
        @click="handleSwitch" >LOGIN HERE</button>
    </p>
  </section>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';

export default {
  name: 'Register',
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      formErrors: [],
    }
  },
  methods: {
    ...mapActions('auth', ['userRegister', 'updateLoading']),
    validate() {
      let emailErrors = [];
      let passwordErrors = [];
      let confirmPasswordErrors = [];

      if(!this.email) {
        emailErrors.push('Email field is required');
      }

      if(!this.email.includes('@')) {
        emailErrors.push('Invalid Email');
      }

      if(!this.password) {
        passwordErrors.push('Password field is required');
      }

      if(!this.confirmPassword) {
        confirmPasswordErrors.push('Confirm Password field is required')
      }

      if(this.password !== this.confirmPassword) {
        confirmPasswordErrors.push('Passwords should match');
      }

      this.formErrors = [
        ...emailErrors,
        ...passwordErrors,
        ...confirmPasswordErrors,
      ];

      if(emailErrors.length || passwordErrors.length || confirmPasswordErrors.length) {
        return false;
      }

      return true;
    },
    handleFormSubmit() {
      let isValid = this.validate();

      if(isValid) {
        this.updateLoading(true);
        this.userRegister({email: this.email, password: this.password});
      }
    },
    handleSwitch() {
      this.$emit('switch-form', 'login');
    },
  },
  computed: mapGetters('auth', ['user', 'showRegisterForm', 'errors']),
  watch: {
    user: function(val) {
      if(val) {
        this.email = '';
        this.password = '';
        this.confirmPassword = '';
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
