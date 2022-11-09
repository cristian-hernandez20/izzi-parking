<template>
  <v-dialog v-model="option.state" max-width="1000px">
    <v-card>
      <v-footer color="primary" height="60">
        <h1 class="white--text mx-auto">
          Registrar ingreso
          <v-icon color="white" size="30">{{ option.icon }}</v-icon>
        </h1>
      </v-footer>
      <v-card-text>
        <v-container>
          <v-form v-model="validate" ref="form" lazy-validation class="mt-10">
            <v-row justify="center" class="px-5">
              <v-col cols="12" md="4" sm="4" xl="4" lg="4" class="py-0">
                <INPUT :field="form.date_init" />
              </v-col>
              <v-col cols="12" md="4" sm="4" xl="4" lg="4" class="py-0">
                <INPUT :field="form.time_init" />
              </v-col>
              <v-col cols="12" md="4" sm="4" xl="4" lg="4" class="py-0">
                <INPUT :field="form.date_end" />
              </v-col>
              <v-col cols="12" md="4" sm="4" xl="4" lg="4" class="py-0">
                <INPUT :field="form.time_end" />
              </v-col>
              <v-col cols="12" md="4" sm="4" xl="4" lg="4" class="py-0">
                <INPUT :field="form.placa" />
              </v-col>
              <v-col cols="12" md="4" sm="4" xl="4" lg="4" class="py-0">
                <AUTOCOMPLETE :field="form.puesto" />
              </v-col>
            </v-row>
          </v-form>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <div class="mr-5 mb-3">
          <v-btn color="primary" class="botone" @click="option.state = false"> Cancelar </v-btn>
          <v-btn v-if="option.option_text == 'save'" color="green" class="botone ml-2" dark @click="addEntry()"> Registrar </v-btn>
        </div>
      </v-card-actions>
    </v-card>
    <ALERT v-if="alert.state" :alert="alert" @exitEsc="cancel()" @cancel="cancel()" @confirm="confirm()"></ALERT>
  </v-dialog>
</template>

<script>
import { INPUT, AUTOCOMPLETE } from "../../mixins/global";
import { mapActions, mapGetters } from "vuex";
import { Alert } from "@/mixins/alert";

export default {
  mixins: [INPUT, AUTOCOMPLETE, Alert],
  props: {
    option: Object,
  },
  data() {
    return {
      validate: false,
      _id: "",
      form: {
        date_init: {
          value: "",
          tipo: "date",
          id: "date_init",
          label: "Fecha ingreso",
          maxlength: "10",
          rules: [(v) => !!v || "Fecha es requerida"],
        },
        time_init: {
          value: "",
          tipo: "time",
          id: "time_init",
          label: "Hora ingreso",
          maxlength: "10",
          rules: [(v) => !!v || "Hora es requerida"],
        },
        date_end: {
          value: "",
          tipo: "date",
          id: "date_end",
          label: "Fecha salida",
          maxlength: "10",
          rules: [(v) => !!v || "Fecha es requerida"],
        },
        time_end: {
          value: "",
          tipo: "time",
          id: "time_end",
          label: "Hora salida",
          maxlength: "10",
          rules: [(v) => !!v || "Hora es requerida"],
        },
        placa: {
          value: "",
          tipo: "placa",
          id: "placa",
          label: "Placa",
          maxlength: "6",
          rules: [(v) => !!v || "La placa es requerida"],
        },

        puesto: {
          value: "",
          id: "puesto",
          label: "Puestos",
          required: true,
          item_value: "name",
          item_text: "name",
          items: [],
          rules: [(v) => !!v || "Obligatorio"],
        },
      },
    };
  },
  watch: {},
  computed: {
    ...mapGetters({ getZone: "zone/getZone" }),
  },
  async mounted() {
    await this._loadZones();
    this.form.puesto.items = this.getZone("zone").filter((e) => ["0", "1"].includes(e.state));
    console.log(this.form.puesto.items);
  },
  methods: {
    ...mapActions({
      _postEntry: "entry/_postEntry",
      _loadZones: "zone/_getZones",
    }),

    cancel() {
      this.deletAlert();
      this.option.state = false;
    },
    async addEntry() {
      const data_ = {
        date_init: this.form.date_init.value,
        time_init: this.form.time_init.value,
        date_end: this.form.date_end.value,
        time_end: this.form.time_end.value,
        placa: this.form.placa.value,
        puesto: this.form.puesto.value,
      };
      const RES = await this._postEntry({ data_ });
      console.log(RES)
      if (RES.S) {
        this.sendAlert(RES.S, RES.alert);
        this.$refs.form.reset();
      } else this.sendAlert(RES.msg, RES.alert);
    },
  },
};
</script>
