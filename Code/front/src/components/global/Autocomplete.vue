<template>
  <v-autocomplete
    :item-value="field.itemValue"
    :disabled="field.disabled"
    :messages="field.message"
    v-model="field.value"
    :label="field.label"
    :items="field.items"
    :ref="field.id"
    :id="field.id"
    outlined
    shaped
    dense
  ></v-autocomplete>
</template>
<script>
export default {
  name: "Combobox",
  props: {
    field: {
      id: String,
      label: String,
      value: String,
      disabled: Boolean,
      items: Array,
      itemValue: String,
    },
  },
  data() {
    return {
      cont: 0,
    };
  },
  watch: {
    "field.disabled"() {
      if (this.field.disabled === false) {
        this.setCaja(this.field);
        this.$nextTick(() => {
          this.$refs.combo.focus();
        });
      }
    },
  },
  methods: {
    async pressEnter() {},
  },
};
</script>
