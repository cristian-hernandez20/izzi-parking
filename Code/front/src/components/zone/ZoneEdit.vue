<template>
  <v-dialog v-model="zone.state_dialog" v-if="zone.state_dialog" persistent width="800">
    <v-card width="800">
      <v-footer class="white--text mt-0" color="primary">
        <h2 class="text-start">Editar puesto</h2>
      </v-footer>
      <v-container>
        <v-form v-model="validate" ref="form" lazy-validation>
          <v-row justify="start" class="px-5 pt-10">
            <v-col cols="12" lg="3" sm="3" md="3" class="py-0">
              <INPUT :field="form.name" />
            </v-col>
            <v-col cols="12" lg="3" sm="3" md="3" class="py-0">
              <AUTOCOMPLETE :field="form.type" />
            </v-col>
            <v-col cols="12" lg="3" sm="3" md="3" class="py-0">
              <AUTOCOMPLETE :field="form.state" />
            </v-col>
            <v-col cols="12" lg="3" sm="3" md="3" class="py-0">
              <v-btn elevation="0" color="primary" class="botone" dark @click="editZone()" large>Actualizar</v-btn>
            </v-col>
          </v-row>
        </v-form>
        <ALERT v-if="alert.state" :alert="alert" @exitEsc="cancel()" @cancel="cancel()" @confirm="confirm()"></ALERT>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import { INPUT, AUTOCOMPLETE } from "@/mixins/global";
import { Alert } from "@/mixins/alert";
import { mapActions } from "vuex";
export default {
  mixins: [INPUT, AUTOCOMPLETE, Alert],
  props: {
    zone: Object,
  },
  data() {
    return {
      alert: {
        state: false,
      },
      validate: false,
      form: {
        name: {
          value: this.zone.name,
          tipo: "name",
          id: "name",
          label: "Nombre de puesto",
          type: "name",
          maxlength: "4",
          disabled: true,
          rules: [(v) => !!v || "Nombre es requerido"],
        },
        type: {
          value: this.zone.type,
          id: "type",
          label: "Tipo",
          required: true,
          item_value: "id",
          disabled: true,
          items: [
            { id: "0", text: "Moto" },
            { id: "1", text: "Carro" },
          ],
          rules: [(v) => !!v || "Dato obligatorio"],
        },
        state: {
          value: this.zone.state,
          id: "state",
          label: "Tipo",
          required: true,
          item_value: "id",
          items: [
            { id: "0", text: "Disponible" },
            { id: "1", text: "Ocupado" },
            { id: "2", text: "Reservado" },
          ],
          rules: [(v) => !!v || "Dato obligatorio"],
        },
      },
    };
  },
  methods: {
    ...mapActions({
      _putZone: "zone/_putZone",
    }),
    cancel() {
      this.deletAlert();
      this.zone.state_dialog = false;
    },
    async editZone() {
      const data_ = {
        state: this.form.state.value,
      };
      const _id = this.zone._id;
      const RES = await this._putZone({ _id, data_ });
      if (RES.S) {
        this.sendAlert(RES.S, RES.alert);
      } else this.sendAlert(RES.msg, RES.alert);
    },
  },
};
</script>

<style></style>
