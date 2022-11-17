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
                <v-row justify="center" class="px-5">
                  <v-col cols="12" md="2" sm="2" xl="2" lg="2" class="py-0"> <INPUT :field="placa_search" /> </v-col
                  ><v-btn color="primary" @click="searchEntry()" class="botone">BUSCAR <v-icon>mdi-car-search</v-icon></v-btn>
                </v-row>
                <v-form v-model="validate" ref="form" lazy-validation class="mt-10">
                  <v-row justify="center" class="px-5">
                    <v-col cols="12" md="2" sm="2" xl="2" lg="2" class="py-0">
                      <INPUT :field="form.date_init" />
                    </v-col>
                    <v-col cols="12" md="2" sm="2" xl="2" lg="2" class="py-0">
                      <INPUT :field="form.time_init" />
                    </v-col>
                    <v-col cols="12" md="2" sm="2" xl="2" lg="2" class="py-0">
                      <INPUT :field="form.date_end" />
                    </v-col>
                    <v-col cols="12" md="2" sm="2" xl="2" lg="2" class="py-0">
                      <INPUT :field="form.time_end" />
                    </v-col>
                    <v-col cols="12" md="2" sm="2" xl="2" lg="2" class="py-0">
                      <INPUT :field="form.placa" />
                    </v-col>
                    <v-col cols="6" md="3" sm="3" xl="3" lg="3" class="py-0">
                      <AUTOCOMPLETE :field="form.type_vehicle" />
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
                <v-btn color="green" class="mr-10 botone ml-2" dark @click="editEntry()"> Registrar </v-btn>
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
import { current_user, imageBase64_, cleanForm_ } from "@/global";
import moment from "moment";

export default {
  mixins: [INPUT, AUTOCOMPLETE, Alert],
  props: {
    option: Object,
  },
  data() {
    return {
      validate: false,
      _id: "",
      _id_ticket: "",
      print: false,
      placa_search: {
        value: "",
        tipo: "placa",
        id: "placa",
        label: "Placa",
        maxlength: "6",
        rules: [(v) => !!v || "La placa es requerida"],
      },
      form: {
        date_init: {
          value: "",
          id: "date_init",
          label: "Fecha ingreso",
          maxlength: "10",
          disabled: true,
          rules: [(v) => !!v || "Fecha es requerida"],
        },
        time_init: {
          value: "",
          id: "time_init",
          label: "Hora ingreso",
          disabled: true,
          maxlength: "10",
          rules: [(v) => !!v || "Hora es requerida"],
        },
        date_end: {
          value: "",
          id: "date_end",
          label: "Fecha salida",
          disabled: true,
          maxlength: "10",
          rules: [(v) => !!v || "Fecha es requerida"],
        },
        time_end: {
          value: "",
          id: "time_end",
          label: "Hora salida",
          disabled: true,
          maxlength: "10",
          rules: [(v) => !!v || "Hora es requerida"],
        },
        placa: {
          value: "",
          tipo: "placa",
          id: "placa",
          label: "Placa",
          maxlength: "6",
          disabled: true,
          rules: [(v) => !!v || "La placa es requerida"],
        },

        type_vehicle: {
          value: "",
          id: "type_vehicle",
          label: "Tipo",
          required: true,
          item_value: "type",
          item_text: "type",
          disabled: true,
          items: [],
          rules: [(v) => !!v || "Obligatorio"],
        },

        puesto: {
          value: "",
          id: "puesto",
          label: "Puestos",
          required: true,
          disabled: true,
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
    ...mapGetters({
      getZone: "zone/getZone",
      getVehicle: "vehicle/getVehicle",
    }),
  },
  async mounted() {
    await this._loadZones();
    await this._getVehicles();
    this.form.type_vehicle.items = this.getVehicle("vehicle");
    this.form.puesto.items = this.getZone("zone").filter((e) => ["0", "1"].includes(e.state));
    this.form.date_end.value = moment().format("DD/MM/YYYY");
    this.form.time_end.value = moment().format("LTS");
  },
  methods: {
    ...mapActions({
      _getVehicles: "vehicle/_getVehicles",
      _getVehicle: "vehicle/_getVehicle",
      _putEntry: "entry/_putEntry",
      _loadZones: "zone/_getZones",
      _getEntry: "entry/_getEntry",
    }),

    cancel() {
      this.deletAlert();
      if (this.print) {
        setTimeout(() => this.sendAlert("pdf-c", "info", "", "P"), 200);
        this.print = false;
      }
    },
    async searchEntry() {
      const placa = this.placa_search.value;
      const RES = await this._getEntry({ placa });

      if (RES) {
        this.form.date_init.value = RES.date_init;
        this.form.time_init.value = RES.time_init;
        this.form.placa.value = RES.placa;
        this.form.type_vehicle.value = RES.type_vehicle;
        this.form.puesto.value = RES.puesto;
        this._id = RES._id;
      } else {
        cleanForm_(this.form);
        this.sendAlert("E-005", "info");
      }
    },
    async confirm() {
      const type = this.form.type_vehicle.value;
      const type_ = await this._getVehicle({ type });

      const data = {
        name: `${current_user.name} ${current_user.last_name}`,
        date_init: this.form.date_init.value,
        time_init: this.form.time_init.value,
        date_end: this.form.date_end.value,
        time_end: this.form.time_end.value,
        puesto: this.form.puesto.value,
        placa: this.form.placa.value,
        type_vehicle: type_.type,
        id_ticket: this._id,
        fare: type_.fare,
      };
      let image = await imageBase64_(require("../../assets/image/Logo.jpeg"));
      printComanda(data, image);

      this.deletAlert();
      setTimeout(() => {
        location.reload();
      }, 100);
    },
    async editEntry() {
      const data_ = {
        date_end: this.form.date_end.value,
        time_end: this.form.time_end.value,
      };
      const _id = this._id;
      const RES = await this._putEntry({ _id, data_ });
      if (RES.S) {
        this.print = true;
        this.sendAlert(RES.S, RES.alert);
      } else this.sendAlert(RES.msg, RES.alert);
    },
  },
};
</script>
