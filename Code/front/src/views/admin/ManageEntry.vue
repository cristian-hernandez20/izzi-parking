<template>
  <v-app>
    <v-container fluid>
      <v-row justify="center" class="pt-4 ml-16 mr-2">
        <v-col cols="12" lg="12" sm="12" md="12">
          <v-card elevation="4">
            <v-card-text class="text-title primary--text mt-0">
              <h2 class="text-start">
                <v-icon color="primary" class="mb-1">mdi-account-circle </v-icon>
                Administración de ingreso
              </h2>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" lg="12" sm="12" md="12">
          <v-text-field
            append-icon="mdi-text-search-variant"
            label="Buscar ingreso"
            class="elevation-6"
            v-model="search"
            maxlength="30"
            hide-details
            outlined
            dense
            solo
          ></v-text-field>
          <v-btn color="primary" class="my-4 botone" dark elevation="10" @click="addVehicle()">
            Registrar ingreso
            <v-icon class="ml-2">mdi-account-circle </v-icon>
          </v-btn>
        </v-col>
        <v-col cols="12" lg="12" sm="12" md="12">
          <v-data-table
            loading-text="Cargando... Por favor Espere"
            :items="getVehicle('vehicle')"
            :loading="_stateLoading"
            :items-per-page="5"
            class="elevation-5"
            :headers="headers"
            :search="search"
          >
            <template v-slot:[`item.placa`]="{ item }">
              <v-chip color="accent" dark>
                {{ item.placa }}
              </v-chip>
            </template>
            <template v-slot:no-data>
              <v-btn color="primary" @click="_getVehicles()"> Cargar clientes </v-btn>
            </template>
          </v-data-table>
          <v-card-text class="primary--text"> </v-card-text>
        </v-col>
      </v-row>
    </v-container>
    <EditAddEntry :option="option" v-if="option.state" />
    <ALERT v-if="alert.state" :alert="alert" @exitEsc="cancel()" @cancel="cancel()" @confirm="confirm()"></ALERT>
  </v-app>
</template>

<script>
import EditAddEntry from "@/components/client/EditAddEntry.vue";
import { mapActions, mapGetters } from "vuex";
import { Alert } from "@/mixins/alert";

export default {
  components: {
    EditAddEntry,
  },
  mixins: [Alert],
  data() {
    return {
      search: "",
      option: {
        state: false,
        option_text: "Registrar vehiculo",
        icon: "mdi-car-plus",
      },
      confir_delete: false,
      _id: "",
      headers: [
        { text: "Placa", value: "placa", align: "center" },
        { text: "Tipo", value: "type", align: "center" },
        { text: "Color", align: "center", value: "color" },
      ],
    };
  },
  computed: {
    ...mapGetters({
      _stateLoading: "_stateLoading",
      getVehicle: "vehicle/getVehicle",
    }),
  },
  mounted() {
    this._getVehicles();
  },
  methods: {
    ...mapActions({
      _getVehicles: "vehicle/_getVehicles",
      _deleteVehicle: "vehicle/_deleteVehicle",
    }),
    cancel() {
      this.deletAlert();
    },
    confirm() {
      if (this.confir_delete) this.deleteVehicle();
    },
    comfirDelete(item) {
      this._id = item._id;
      this.sendAlert("V-005", "warning", null, "P");
      this.confir_delete = true;
    },
    async deleteVehicle() {
      this.deletAlert();
      const _id = this._id;
      const RES = await this._deleteVehicle({ _id });
      if (RES.S) {
        setTimeout(() => this.sendAlert(RES.S, RES.alert), 200);
        this.deletAlert();
      }
      RES.msg && this.sendAlert(RES.msg, RES.alert);
    },

    editVehicle(item) {
      this.option = {
        state: true,
        option_text: "edit",
        icon: "mdi-account-card",
        color: item.color,
        placa: item.placa,
        type: item.type,
        _id: item._id,
      };
    },
    addVehicle() {
      this.option = {
        state: true,
        option_text: "save",
        icon: "mdi-account-card",
      };
    },
  },
};
</script>
