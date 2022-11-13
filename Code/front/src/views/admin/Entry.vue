<template>
  <v-app>
    <v-container fluid>
      <v-row justify="center" class="pt-4 ml-16 mr-2">
        <v-col cols="12" lg="12" sm="12" md="12">
          <v-card>
            <v-footer color="primary" height="60">
              <h1 class="white--text mx-auto">
                Registrar ingreso
                <v-icon color="white" size="30">mdi-car</v-icon>
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
                    <v-col cols="12" md="2" sm="2" xl="2" lg="2" class="py-0">
                      <INPUT :field="form.type_vehiculo" />
                    </v-col>
                    <v-col cols="12" md="2" sm="2" xl="2" lg="2" class="py-0">
                      <AUTOCOMPLETE :field="form.puesto" />
                    </v-col>
                  </v-row>
                </v-form>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <div class="mr-12 mb-3">
                <v-btn color="primary" class="botone" @click="option.state = false"> Cancelar </v-btn>
                <v-btn color="green" class="botone ml-2" dark @click="addEntry()"> Registrar </v-btn>
              </div>
            </v-card-actions>
          </v-card>
          <ALERT v-if="alert.state" :alert="alert" @exitEsc="cancel()" @cancel="cancel()" @confirm="confirm()"></ALERT>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import { INPUT, AUTOCOMPLETE } from "../../mixins/global";
import { mapActions, mapGetters } from "vuex";
import { printComanda } from "../../pdf/index";
import { Alert } from "@/mixins/alert";
import { current_user, imageBase64_ } from "@/global";

export default {
  mixins: [INPUT, AUTOCOMPLETE, Alert],
  props: {
    option: Object,
  },
  data() {
    return {
      validate: false,
      _id: "",
      print: false,
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

        type_vehiculo: {
          value: "",
          tipo: "type_vehiculo",
          id: "type_vehiculo",
          label: "Tipo vehiculo",
          maxlength: "5",
          rules: [(v) => !!v || "El vehiculo es requerido"],
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
  },
  methods: {
    ...mapActions({
      _postEntry: "entry/_postEntry",
      _loadZones: "zone/_getZones",
    }),

    cancel() {
      this.deletAlert();
      if (this.print) {
        setTimeout(() => this.sendAlert("pdf-c", "info", "", "P"), 200);
        this.print = false;
      }
    },
    async confirm() {
      const data = {
        date_init: this.form.date_init.value,
        time_init: this.form.time_init.value,
        date_end: this.form.date_end.value,
        time_end: this.form.time_end.value,
        placa: this.form.placa.value,
        puesto: this.form.puesto.value,
        type_vehiculo: this.form.type_vehiculo.value,
        name: `${current_user.name} ${current_user.last_name}`,
      };
      let image = await imageBase64_(require("../../assets/image/Logo.jpeg"));
      console.log(image);
      printComanda(data, image);
      // this.$refs.form.reset();
      this.deletAlert();
    },
    async addEntry() {
      const data_ = {
        date_init: this.form.date_init.value,
        time_init: this.form.time_init.value,
        date_end: this.form.date_end.value,
        time_end: this.form.time_end.value,
        placa: this.form.placa.value,
        type_vehiculo: this.form.type_vehiculo.value,
        puesto: this.form.puesto.value,
      };
      const RES = await this._postEntry({ data_ });
      if (RES.S) {
        this.print = true;
        this.sendAlert(RES.S, RES.alert);
      } else this.sendAlert(RES.msg, RES.alert);
    },
  },
};
</script>
