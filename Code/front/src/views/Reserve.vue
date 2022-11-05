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
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-row justify="center" class="mt-10">
                <v-col cols="12" lg="4" sm="4" md="4" class="py-0 px-2">
                  <v-text-field v-model="form.hora" label="Hora" type="time" ref="hora" required outlined filled shaped dense></v-text-field>
                </v-col>
                <v-col cols="12" lg="4" sm="4" md="4" class="py-0 px-2">
                  <v-text-field
                    v-model="form.fecha"
                    :maxlength="'17'"
                    label="Fecha"
                    ref="date"
                    id="date"
                    type="date"
                    required
                    outlined
                    filled
                    shaped
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12" lg="4" sm="4" md="4" class="py-0 px-2">
                  <v-autocomplete
                    v-model="form.puesto"
                    :maxlength="'17'"
                    label="Puesto"
                    ref="puesto"
                    id="puesto"
                    required
                    outlined
                    filled
                    shaped
                    dense
                  ></v-autocomplete>
                </v-col>

                <v-col cols="12" lg="12" sm="12" md="12" class="py-0 text-center">
                  <v-btn
                    :loading="_stateLoading"
                    :disabled="!valid"
                    @click="registrarReserva()"
                    justify="center"
                    class="my-2 botone"
                    color="success"
                    filled
                    shaped
                    dense
                  >
                    Reservar <v-icon class="ml-1" small>mdi-content-save</v-icon>
                  </v-btn>
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
import { current_user } from "@/global";
import { mapGetters, mapActions } from "vuex";
export default {
  data: () => ({
    valid: false,
    form: {
      hora: "",
      fecha: "",
      puesto: "",
    },
  }),
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
