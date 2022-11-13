<template>
  <v-container fluid>
    <v-row justify="center" class="pt-4 ml-16 mr-2">
      <v-col cols="12" lg="12" sm="12" md="12">
        <v-card elevation="4">
          <v-card-text class="text-title primary--text mt-0">
            <h3 class="text-start">
              <v-icon color="primary" class="mb-1">mdi-book</v-icon>
              Agendar reserva
            </h3>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" lg="12" sm="12" md="12">
        <v-card elevation="12">
          <v-card-text class="primary--text">
            <v-form v-model="validate" ref="form" lazy-validation>
              <v-row justify="center" class="px-5 pt-8">
                <v-col cols="3" md="3" sm="3" xl="3" lg="3" class="py-0">
                  <INPUT :field="form.date" />
                </v-col>
                <v-col cols="6" md="3" sm="3" xl="3" lg="3" class="py-0">
                  <INPUT :field="form.time" />
                </v-col>
                <v-col cols="6" md="3" sm="3" xl="3" lg="3" class="py-0">
                  <AUTOCOMPLETE :field="form.type_vehicle" />
                </v-col>
                <v-col cols="6" md="3" sm="3" xl="3" lg="3" class="py-0" v-if="form.type_vehicle.value == 'Carro'">
                  <AUTOCOMPLETE :field="form.array_car" />
                </v-col>
                <v-col cols="6" md="3" sm="3" xl="3" lg="3" class="py-0" v-if="form.type_vehicle.value == 'Moto'">
                  <AUTOCOMPLETE :field="form.array_motorcycle" />
                </v-col>
                <v-col cols="3" md="3" sm="3" xl="3" lg="3" class="py-0">
                  <INPUT :field="form.placa" />
                </v-col>
                <v-col cols="12" class="pt-1 pb-8 text-center">
                  <v-btn elevation="0" color="primary" :disabled="!validate" class="botone" @click="registerReserve()" large>Registrar reserva</v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <ALERT @confirm="confirm()" @cancel="cancel()" v-if="alert.state" :alert="alert"></ALERT>
  </v-container>
</template>
<script>
import { INPUT, AUTOCOMPLETE } from "@/mixins/global";
import { mapGetters, mapActions } from "vuex";
import { Alert } from "@/mixins/alert";
import { current_user } from "@/global";

export default {
  mixins: [INPUT, AUTOCOMPLETE, Alert],
  data() {
    return {
      validate: true,
      show_password: false,
      show_password2: false,
      form: {
        time: {
          value: "",
          id: "time",
          tipo: "time",
          label: "Hora",
          maxlength: "10",
          required: true,
          rules: [(v) => !!v || "La hora es requerida"],
        },
        date: {
          value: "",
          id: "date",
          tipo: "date",
          label: "Fecha",
          maxlength: "10",
          rules: [(v) => !!v || "La fecha es requerida"],
        },
        type_vehicle: {
          value: "",
          id: "type_vehicle",
          label: "Tipo",
          required: true,
          item_value: "type",
          item_text: "type",
          items: [],
          rules: [(v) => !!v || "Obligatorio"],
        },
        array_car: {
          value: "",
          id: "array_car",
          label: "Puestos",
          required: true,
          item_value: "_id",
          item_text: "name",
          items: [],
          rules: [(v) => !!v || "Obligatorio"],
        },
        array_motorcycle: {
          value: "",
          id: "array_motorcycle",
          label: "Puesto",
          required: true,
          item_value: "_id",
          item_text: "name",
          items: [],
          rules: [(v) => !!v || "Obligatorio"],
        },
        placa: {
          value: "",
          id: "placa",
          label: "Placa",
          maxlength: "6",
          rules: [(v) => !!v || "Teléfono es requerido"],
        },
      },
    };
  },
  computed: {
    ...mapGetters({
      getVehicle: "vehicle/getVehicle",
      _stateLoading: "_stateLoading",
      getZone: "zone/getZone",
    }),
  },
  methods: {
    ...mapActions({
      _postReserve: "reserve/_postReserve",
      _loadZones: "zone/_getZones",
      _putZone: "zone/_putZone",
      _getVehicles: "vehicle/_getVehicles",
    }),
    cancel() {
      this.deletAlert();
    },
    async registerReserve() {
      if (this.$refs.form.validate()) {
        const data_ = {
          time: this.form.time.value,
          date: this.form.date.value,
          zone: this.form.array_car.value || this.form.array_motorcycle.value,
          document_user: current_user.document,
          name_user: `${current_user.name} ${current_user.last_name}`,
          type_vehicle: this.form.type_vehicle.value,
          placa: this.form.placa.value,
        };

        const RES = await this._postReserve({ data_ });

        if (RES.S) {
          this.sendAlert(RES.S, RES.alert);

          this.editZone();
        } else this.sendAlert(RES.msg, RES.alert);
      }
    },
    async editZone() {
      const data_ = {
        state: "2",
      };
      const _id = this.form.array_car.value || this.form.array_motorcycle.value;

      const RES = await this._putZone({ _id, data_ });
      if (RES.S) {
        this.sendAlert(RES.S, RES.alert);
      } else this.sendAlert(RES.msg, RES.alert);
    },
    async loadZones() {
      await this._loadZones();
      this.form.array_motorcycle.items = this.getZone("zone").filter((e) => e.type == 0);
      this.form.array_car.items = this.getZone("zone").filter((e) => e.type == 1);
    },
  },
  async created() {
    await this.loadZones();
    await this._getVehicles();
    this.form.type_vehicle.items = this.getVehicle("vehicle");
  },
};
</script>

<style></style>
