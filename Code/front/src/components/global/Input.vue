<template>
  <v-text-field
    oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
    :append-icon="field.id == 'password' ? (field.show_password ? 'mdi-eye' : 'mdi-eye-off') : undefined"
    :type="field.id == 'password' ? (field.show_password ? 'text' : 'password') : field.tipo"
    @click:append="field.show_password = !field.show_password"
    :hide-details="field.details == false ? true : false"
    :counter="field.counter ? field.maxlength : false"
    :error="field.error == true ? true : false"
    :prepend-icon="field.prepend_icon"
    :placeholder="field.placeholder"
    :maxlength="field.maxlength"
    :autofocus="field.autofocus"
    @keydown.enter="pressEnter"
    :disabled="field.disabled"
    :messages="field.message"
    @keydown.esc="pressEsc"
    v-model="field.value"
    :label="field.label"
    :rules="field.rules"
    @input="input()"
    :ref="field.id"
    :id="field.id"
    outlined
    shaped
    dense
  >
  </v-text-field>
</template>
<script>
import { fieldToUper_, formatDocument_, formatPhoneNumber_ } from "@/global";
export default {
  props: {
    field: {
      show_password: Boolean,
      prepend_icon: String,
      append_icon: String,
      placeholder: String,
      maxlength: String,
      disabled: Boolean,
      validate: Boolean,
      counter: Boolean,
      label: String,
      error: String,
      value: String,
      id: String,
      rules: {
        type: Array,
        default: () => false,
      },
      autofocus: {
        type: Boolean,
        default: () => false,
      },
      tipo: {
        type: String,
        default: () => "string",
      },
      required: {
        type: Boolean,
        default: () => false,
      },
      details: {
        type: Boolean,
        default: () => false,
      },
    },
    mask: Function,
  },
  data() {
    return {};
  },
  watch: {
    "field.disabled"() {
      if (!this.field.disabled) {
        this.$nextTick(() => {
          this.$refs.input.focus();
        });
      }
    },
    "field.validate"(newVal) {
      if (newVal) {
        this.validateInput();
      }
    },
  },
  methods: {
    async pressEnter() {
      if (this.field.value.length == 0) {
      }
    },
    async pressEsc() {},

    input() {
      switch (this.field.id) {
        case "name":
        case "last_name":
          this.field.value = fieldToUper_(this.field.value);
          break;
        case "email":
          this.field.value = this.field.value.toLowerCase();
          break;
        case "placa":
          this.field.value = this.field.value.toUpperCase();
          break;
        default:
          break;
      }
      if (this.mask)
        this.field.value = this.mask({
          val: this.field.value,
          max: this.field.max_digits,
          decimal: this.field.decimal,
        });
    },
    validateInput() {
      if (this.$refs.form.validate()) {
      }
    },
  },
  mounted() {
    switch (this.field.id) {
      case "phone_number":
        formatPhoneNumber_();
        break;
      case "document":
        formatDocument_();
        break;
      default:
        break;
    }
  },
};
</script>
