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
                <INPUT :field="form.color" />
              </v-col>
              <v-col cols="12" md="4" sm="4" xl="4" lg="4" class="py-0">
                <INPUT :field="form.placa" />
              </v-col>
              <v-col cols="12" md="4" sm="4" xl="4" lg="4" class="py-0">
                <AUTOCOMPLETE :field="form.type_vehicle" />
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
        placa: {
          value: "",
          tipo: "placa",
          id: "placa",
          label: "Placa",
          maxlength: "6",
          rules: [(v) => !!v || "La placa es requerida"],
        },
        color: {
          value: "",
          tipo: "name",
          id: "color",
          label: "Color",
          maxlength: "50",
          rules: [(v) => !!v || "Color es requerido"],
        },
        type_vehicle: {
          value: "",
          id: "type_vehicle",
          label: "Tipo de vehiculo",
          required: true,
          item_value: "text",
          items: [
            { id: "0", text: "Moto" },
            { id: "1", text: "Carro" },
            { id: "3", text: "Camioneta" },
            { id: "4", text: "Motocarguero" },
            { id: "4", text: "Bus" },
            { id: "4", text: "Taxi" },
          ],
          rules: [(v) => !!v || "Obligatorio"],
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
        type: this.form.type_vehicle.value,
        placa: this.form.placa.value,
        color: this.form.color.value,
      };
      let RES = await this._putVehicle({ _id, data_ });
      if (RES.S) {
        this.sendAlert(RES.S, RES.alert);
      } else this.sendAlert(RES.msg, RES.alert);
    },

    async addVehicle() {
      const data_ = {
        type: this.form.type_vehicle.value,
        placa: this.form.placa.value,
        color: this.form.color.value,
      };
      let RES = await this._postVehicle({ data_ });
      if (RES.S) {
        this.sendAlert(RES.S, RES.alert);
        this.$refs.form.reset();
      } else this.sendAlert(RES.msg, RES.alert);
    },
  },
  mounted() {
    if (this.option.option_text == "edit") {
      this.form.color.value = this.option.color;
      this.form.type_vehicle.value = this.option.type;
      this.form.placa.value = this.option.placa;
      this._id = this.option._id;
    }
  },
};
</script>
