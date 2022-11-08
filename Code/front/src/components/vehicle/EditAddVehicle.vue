<template>
  <v-dialog v-model="option.state" max-width="1000px">
    <v-card>
      <v-footer color="primary" height="60">
        <h1 class="white--text mx-auto">
          {{ `${option.option_text == "save" ? "Registrar vehiculo" : "Editar vehiculo"}` }}
          <v-icon color="white" size="30">{{ option.icon }}</v-icon>
        </h1>
      </v-footer>
      <v-card-title>
        <span class="text-h5">{{ option.title_option }}</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-form v-model="validate" ref="form" lazy-validation>
            <v-row justify="center" class="px-5">
              <v-col cols="12" md="6" sm="6" xl="6" lg="6" class="py-0">
                <INPUT :field="form.name" />
              </v-col>
              <v-col cols="12" md="6" sm="6" xl="6" lg="6" class="py-0">
                <INPUT :field="form.last_name" />
              </v-col>
              <v-col cols="6" class="py-0">
                <INPUT :field="form.placa" />
              </v-col>
              <v-col cols="6" class="py-0">
                <INPUT :field="form.phone_number" />
              </v-col>
              <v-col cols="4" class="py-0">
                <AUTOCOMPLETE :field="form.type_vehicle" />
              </v-col>
            </v-row>
          </v-form>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" class="botone" @click="option.state = false"> Cancelar </v-btn>
        <v-btn color="green" class="botone" dark @click="optionTask()"> Guardar </v-btn>
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
      form: {
        name: {
          value: "",
          id: "name",
          label: "Nombres",
          maxlength: "50",
          required: true,
          rules: [(v) => !!v || "Nombres son requeridos"],
        },
        last_name: {
          value: "",
          id: "last_name",
          label: "Apellidos",
          maxlength: "50",
          rules: [(v) => !!v || "Apellidos son requeridos"],
        },
        placa: {
          value: "",
          tipo: "placa",
          id: "placa",
          label: "Placa",
          type: "placa",
          maxlength: "50",
          rules: [(v) => !!v || "La placa es requerida"],
        },
        color: {
          value: "",
          tipo: "text",
          id: "color",
          label: "Color",
          type: "name",
          maxlength: "50",
          rules: [(v) => !!v || "Color es requerido"],
        },
        type_vehicle: {
          value: "",
          id: "type_vehicle",
          label: "Tipo de vehiculo",
          required: true,
          item_value: "id",
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
    ...mapActions({}),

    cancel() {
      this.option.state = false;
    },
    confirm() {
      switch (this.option.option_text) {
        case "save":
          this.createdTask();
          break;
        case "edit":
          this.editTask();
          break;
        default:
          break;
      }
    },

    async editTask() {
      this.deletAlert();
      const id_task = this.option.data.id;
      const data = {
        description: this.form.description,
        date: this.form.date,
        hour: this.form.hour,
        condition: this.form.condition,
      };
      // let res = await this._putTask({ id_task, data });
    },

    async createdTask() {
      this.deletAlert();
      const data = {
        description: this.form.description,
        date: this.form.date,
        hour: this.form.hour,
      };
      // let res = await this._addTask(data);
    },
  },
  mounted() {
    // if (this.option.option_text == "edit") this.form = this.option.data;
    // else this.form = Object.assign({}, this.form_default);
  },
};
</script>
