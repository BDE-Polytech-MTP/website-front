<template>
  <b-field
    class="form-field"
    :id="id"
    :type="getClassType"
    :message="getMessage"
  >
    <template #label>
      <div class="is-fullwidth is-flex is-justify-content-space-between">
        <p>{{ label }}</p>
        <b-tag
          v-if="required && debouncedFieldInput == ''"
          rounded
          type="is-info is-light"
          class="is-italic"
          ><b-icon size="is-small" icon="alert-circle-check"></b-icon>
          obligatoire</b-tag
        >
      </div>
    </template>
    <b-input
      v-model="fieldInput"
      v-bind="field"
      :icon="icon"
      :placeholder="placeholder"
      :type="type"
      :max="max"
      :min="min"
      :spellcheck="spellcheck"
      :autocomplete="autocomplete"
      :autocapitalize="autocapitalize"
      :expanded="expanded"
      :password-reveal="passwordReveal"
    />
    <p class="control" v-if="addons">
      <b-button class="button is-static">{{ addons }}</b-button>
    </p>
  </b-field>
</template>
<script>
export default {
  name: "InputField",
  inheritAttrs: false,
  props: {
    id: { type: String, required: true },
    //  NOT REQUIRED  //
    label: { type: String, required: false },
    icon: { type: String, required: false },
    required: { type: Boolean, required: false, default: false },
    type: { type: String, required: false },
    passwordReveal: { type: Boolean, required: false, default: false },
    placeholder: { type: String, required: false },
    min: { type: Number, required: false, default: 2 },
    max: { type: Number, required: false, default: 50 },
    spellcheck: { type: Boolean, required: false, default: false },
    autocomplete: { type: String, required: false },
    autocapitalize: { type: Boolean, required: false, default: false },
    expanded: { type: Boolean, required: false, default: false },
    validator: { type: Function, required: false },
    message: { type: String, required: false },
    timeout: { type: Number, required: false, default: 300 },
    addons: { type: String, required: false },
    value: { required: false },
  },
  data() {
    const startValue = this.value || "";
    const formatValid = this.validator ? this.validator.call(null, startValue) : true;
    return {
      debouncedFieldInput: startValue,
      d_timeout: undefined,
      field: {
        loading: false,
        valid: formatValid && (!this.required || startValue ),
      },
    };
  },
  computed: {
    fieldInput: {
      get() {
        return this.debouncedFieldInput;
      },
      set(val) {
        this.d_timeout && clearTimeout(this.d_timeout);
        this.field.loading = true;
        this.d_timeout = setTimeout(() => {
          this.debouncedFieldInput = val;
          this.field.loading = false;
        }, this.timeout);
      },
    },
    getMessage() {
      if (this.field.valid || this.debouncedFieldInput == "") {
        return "";
      } else {
        return this.message;
      }
    },
    getClassType() {
      if (this.field.valid || this.debouncedFieldInput == "") {
        return "";
      } else {
        return "is-danger";
      }
    },
  },
  watch: {
    debouncedFieldInput: function (val) {
      this.validator
        ? (this.field.valid = this.validator.call(null, val))
        : (this.field.valid = true);
      this.field.valid
        ? this.$emit("update", true, val)
        : this.$emit("update", false, val);
    },
  },
};
</script>

<style lang="css" scoped>
.form-field {
  height: 6rem;
}
</style>