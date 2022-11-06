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
                <v-col cols="6" md="3" sm="3" xl="3" lg="3" class="py-0">
                  <INPUT :field="form.time" />
                </v-col>
                <v-col cols="3" md="3" sm="3" xl="3" lg="3" class="py-0">
                  <INPUT :field="form.date" />
                </v-col>
                <v-col cols="6" md="3" sm="3" xl="3" lg="3" class="py-0">
                  <AUTOCOMPLETE :field="form.type_vehicle" />
                </v-col>
                <v-col cols="5" class="pt-1 pb-8">
                  <v-btn elevation="0" color="primary" :disabled="!validate" class="botone" @click="registrarUsuario()" large>Crear cuenta</v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
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
          item_value: "text",
          items: [
            { id: "0", text: "Moto" },
            { id: "1", text: "Carro" },
          ],
          rules: [(v) => !!v || "Obligatorio"],
        },
        array_car: {
          value: "",
          id: "array_car",
          label: "Tipo",
          required: true,
          item_value: "text",
          items: [],
          rules: [(v) => !!v || "Obligatorio"],
        },
        array_motorcycle: {
          value: "",
          id: "array_motorcycle",
          label: "Tipo",
          required: true,
          item_value: "text",
          items: [],
          rules: [(v) => !!v || "Obligatorio"],
        },
        placa: {
          value: "",
          id: "placa",
          label: "Placa",
          maxlength: "30",
          rules: [(v) => !!v || "Teléfono es requerido"],
        },
      },
    };
  },
  computed: {
    ...mapGetters({
      _stateLoading: "_stateLoading",
    }),
  },
  methods: {
    ...mapActions({
      _getReserva: "reserva/_getReserva",
      _addReserva: "reserva/_addReserva",
    }),
    async registrarReserva() {
      const DATA = {
        hora: this.form.hora,
        fecha: this.form.fecha,
        puesto: this.form.puesto,
        usuario: current_user._id,
      };
      let res = await this._addReserva({ DATA });
    },
  },
  async created() {
    this._getReserva();
  },
};
</script>

<style></style>
