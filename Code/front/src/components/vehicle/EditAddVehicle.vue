<template>
  <v-dialog v-model="option.state" max-width="1000px">
    <v-card>
      <v-footer color="primary" height="60">
        <h1 class="white--text mx-auto">
          {{ `${option.option_text == "save" ? "Registrar vehiculo" : "Editar vehiculo"}` }}
          <v-icon color="white" size="30">{{ option.icon }}</v-icon>
        </h1>
      </v-footer>
      <v-card-text>
        <v-container>
          <v-form v-model="validate" ref="form" lazy-validation class="mt-10">
            <v-row justify="center" class="px-5">
              <v-col cols="12" md="4" sm="4" xl="4" lg="4" class="py-0">
                <INPUT :field="form.type" />
              </v-col>
              <v-col cols="12" md="4" sm="4" xl="4" lg="4" class="py-0">
                <INPUT :field="form.fare" />
              </v-col>
            </v-row>
          </v-form>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <div class="mr-5 mb-3">
          <v-btn color="primary" class="botone" @click="option.state = false"> Cancelar </v-btn>
          <v-btn v-if="option.option_text == 'save'" color="green" class="botone ml-2" dark @click="addVehicle()"> Registrar </v-btn>
          <v-btn v-else color="green" class="botone ml-2" dark @click="editVehicle()"> Editar </v-btn>
        </div>
      </v-card-actions>
    </v-card>
    <ALERT v-if="alert.state" :alert="alert" @exitEsc="cancel()" @cancel="cancel()" @confirm="confirm()"></ALERT>
  </v-dialog>
</template>

<script>
import { INPUT, AUTOCOMPLETE } from "../../mixins/global";
import { cleanForm_ } from "../../global";
import { Alert } from "@/mixins/alert";
import { mapActions } from "vuex";

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
        type: {
          value: "",
          tipo: "type",
          id: "placa",
          label: "Tipo de vehiculo",
          maxlength: "30",
          rules: [(v) => !!v || "Tipo de vehiculo es requerido"],
        },
        fare: {
          value: "",
          id: "fare",
          label: "Tarifa hora",
          maxlength: "20",
          rules: [(v) => !!v || "Tarifa es requerida"],
        },
      },
    };
  },
  watch: {},
  methods: {
    ...mapActions({
      _postVehicle: "vehicle/_postVehicle",
      _putVehicle: "vehicle/_putVehicle",
    }),

    cancel() {
      this.deletAlert();
      this.option.state = false;
    },

    async editVehicle() {
      this.deletAlert();
      const _id = this._id;
      const data_ = {
        type: this.form.type.value,
        fare: this.form.fare.value,
      };
      let RES = await this._putVehicle({ _id, data_ });
      if (RES.S) {
        this.sendAlert(RES.S, RES.alert);
      } else this.sendAlert(RES.msg, RES.alert);
    },

    async addVehicle() {
      const data_ = {
        type: this.form.type.value,
        fare: this.form.fare.value,
      };
      let RES = await this._postVehicle({ data_ });
      if (RES.S) {
        cleanForm_(this.form);
        this.sendAlert(RES.S, RES.alert);
      } else this.sendAlert(RES.msg, RES.alert);
    },
  },
  mounted() {
    if (this.option.option_text == "edit") {
      this.form.type.value = this.option.type;
      this.form.fare.value = this.option.fare;

      this._id = this.option._id;
    }
  },
};
</script>
