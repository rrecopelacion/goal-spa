<template>
  <div :class="`modal modal-confirm ${showModal ? 'is-active' : ''}`">
    <div class="modal-confirm-content flex">
      <div class="modal-confirm-close flex flex-end">
        <button
          class="button-link modal-confirm-button"
          @click="closeModal">close</button>
      </div>
      <p class="modal-confirm-text">Do you want to save your changes?</p>
      <div class="modal-confirm-buttons flex flex-end">
        <button class="button modal-confirm-button"
        @click="handleRedirect">Discard</button>
        <button class="button modal-confirm-button"
        @click="handleSave">Save</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ConfirmModal',
  props: ['showModal'],
  methods: {
    handleRedirect() {
      this.$router.push('/');
    },
    handleSave() {
      this.closeModal();
      setTimeout(() => {
        this.$emit('submit-form');
      }, 1000);
    },
    closeModal() {
      this.$emit('close-modal');
    }
  }
}
</script>
