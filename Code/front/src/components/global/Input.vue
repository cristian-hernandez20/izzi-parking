<template>
  <div>
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
  </div>
</template>
<script>
import { fieldToUper_, formatDocument_, formarPhoneNumber_ } from "@/global";
export default {
  props: {
    field: {
      show_password: Boolean,
      append_icon: String,
      placeholder: String,
      maxlength: String,
      counter: Boolean,
      disabled: Boolean,
      validate: Boolean,
      label: String,
      error: String,
      value: String,

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
        if (this.field.required) {
          this.$emit("inputAlert");
        } else if (this.field.validation) {
          const res = await this.field.validation();
          if (res) this.$emit("controller", { key: "enter", field: this.field.id });
        } else this.$emit("controller", { key: "enter", field: this.field.id });
      } else {
        if (this.field.validation) {
          this.field.disabled = true;
          const res = await this.field.validation();
          if (res) {
            this.$emit("controller", { key: "enter", field: this.field.id });
          }
        }
      }
      this.$emit("controller", { key: "enter", field: this.field.id });
    },
    async pressEsc() {
      if (this.field.escValidation) {
        const res = await this.field.escValidation();
        if (res) {
          this.$emit("controller", {
            key: "esc",
            field: this.field.id,
          });
        }
      } else {
        this.$emit("controller", {
          key: "esc",
          field: this.field.id,
        });
      }
    },

    input() {
      switch (this.field.id) {
        case "name":
        case "last_name":
          this.field.value = fieldToUper_(this.field.value);
          break;
        case "user":
          // this.field.value = fieldWithoutSpace(this.field.value);
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
    formarPhoneNumber_();
    formatDocument_();
  },
};
</script>
