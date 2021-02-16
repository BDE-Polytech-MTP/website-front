<template>
  <div>
    <b-modal
      v-if="tokenValid"
      v-model="isResetPasswordModalActive"
      :can-cancel="[false, false, false]"
      aria-role="dialog"
      has-modal-card
    >
      <div>
        <ResetPassword
          @close="closeModal()"
          @resetPassword="handleResetPassword()"
        />
      </div>
    </b-modal>
    <div v-else></div>
  </div>
</template>

<script>
export default {
  middleware: "reset-password-valid-token",
  data() {
    return {
      token: String,
      tokenValid: false,
      isResetPasswordModalActive: false,
    };
  },
  methods: {
    closeModal() {
      this.isResetPasswordModalActive = false;
      this.$router.push("/");
    },
    handleResetPassword() {
      this.isResetPasswordModalActive = false;
      this.$buefy.toast.open({
        message: "Ton mot de passe à été changé 🔒",
        type: "is-success",
      });
      this.$router.push("/");
    },
  },
  created() {
    this.token = this.$route.query.token;
    const loadingComponent = this.$buefy.loading.open({ container: null });
    this.$axios
      .get("/api/token/" + this.token)
      .then((data) => {
        loadingComponent.close();
        if (data) {
          this.tokenValid = true;
          this.isResetPasswordModalActive = true;
        } else {
          this.$router.push("/");
        }
      })
      .catch(() => {
        loadingComponent.close();
        //this.$router.push("/");
        this.tokenValid = true;
        this.isResetPasswordModalActive = true;
      });
  },
};
</script>

<style lang="css" scoped>
</style>