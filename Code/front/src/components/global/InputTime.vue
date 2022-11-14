<template>
  <!-- :return-value.sync="field.value" -->
  <v-menu
    :close-on-content-click="false"
    transition="scale-transition"
    v-model="field.state"
    :nudge-right="40"
    min-width="290px"
    max-width="290px"
    ref="menu"
    offset-y
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        prepend-icon="mdi-clock-time-four-outline"
        v-model="field.value"
        :label="field.label"
        :rules="field.rules"
        v-bind="attrs"
        v-on="on"
        outlined
        readonly
        shaped
        dense
      ></v-text-field>
    </template>
    <v-time-picker v-if="field.state" v-model="field.value" full-width @click:minute="$refs.menu.save(field.value)"></v-time-picker>
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
