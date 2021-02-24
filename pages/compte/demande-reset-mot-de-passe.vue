<template>
  <div>
    <b-modal
      v-model="isAskResetPasswordModalActive"
      :can-cancel="[false, false, false]"
      aria-role="dialog"
      has-modal-card
    >
      <div>
        <AskResetPassword
          @close="closeModal()"
          @sent="onSent()"
          :token="this.token"
        />
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isAskResetPasswordModalActive: true,
    };
  },
  methods: {
    closeModal() {
      this.$router.push("/");
    },
    onSent() {
      this.$buefy.toast.open({
        message: "Un mail pour redéfinir ton mot de passe t'as été envoyé par mail si celui-ci est associé à un compte 🔒",
        type: "is-success",
        duration: 4000,
      });
      this.$router.push("/");
    },
  },
};
</script>

<style lang="css" scoped>
</style>