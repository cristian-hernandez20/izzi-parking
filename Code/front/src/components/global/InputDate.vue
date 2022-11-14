<template>
  <v-menu v-model="field.state" :close-on-content-click="false" transition="scale-transition" offset-y max-width="290px" min-width="auto">
    <template v-slot:activator="{ on, attrs }">
      <!-- hint="Año-mes-dia" -->
      <v-text-field
        prepend-icon="mdi-calendar"
        v-model="field.value"
        :label="field.label"
        :rules="field.rules"
        persistent-hint
        v-bind="attrs"
        v-on="on"
        readonly
        outlined
        shaped
        dense
      ></v-text-field>
    </template>
    <v-date-picker :max="field.date_today" v-model="field.value" no-title @input="field.state = false"></v-date-picker>
  </v-menu>
</template>
<script>
export default {
  props: {
    field: {
      placeholder: String,
      date_today: String,
      maxlength: String,
      disabled: Boolean,
      validate: Boolean,
      counter: Boolean,
      state: Boolean,
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
      required: {
        type: Boolean,
        default: () => false,
      },
    },
    mask: Function,
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {},
  mounted() {},
};
</script>
