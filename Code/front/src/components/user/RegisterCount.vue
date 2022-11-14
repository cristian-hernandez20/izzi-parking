<template>
  <v-dialog v-model="register_usuario.estado" width="500" persistent>
    <v-card style="border-radius: 20px" color="white" elevation="3">
      <v-container>
        <h1 class="text-center primary--text pt-2 pb-10">Registrar cuenta</h1>
        <v-form v-model="validate" ref="form" lazy-validation>
          <v-row justify="center" class="px-5">
            <v-col cols="12" md="6" sm="6" xl="6" lg="6" class="py-0">
              <INPUT :field="form.name" />
            </v-col>
            <v-col cols="12" md="6" sm="6" xl="6" lg="6" class="py-0">
              <INPUT :field="form.last_name" />
            </v-col>
            <v-col cols="6" class="py-0">
              <INPUT :field="form.phone_number" />
            </v-col>
            <v-col cols="6" class="py-0">
              <INPUT :field="form.email" />
            </v-col>
            <v-col cols="4" class="py-0">
              <AUTOCOMPLETE :field="form.type_document" />
            </v-col>
            <v-col cols="8" class="py-0">
              <INPUT :field="form.document" />
            </v-col>
            <v-col cols="6" class="py-0">
              <INPUT :field="form.password" />
            </v-col>
            <v-col cols="6" class="py-0">
              <INPUT :field="form.password_repetir" />
            </v-col>
            <v-col cols="5" class="pt-1 pb-8">
              <v-btn elevation="0" color="primary" :disabled="!validate" class="botone" @click="registrarUsuario()" large>Crear cuenta</v-btn>
            </v-col>
          </v-row>
        </v-form>
        <v-row justify="center">
          <v-col cols="3" class="mx-0 px-0">
            <v-divider class="mt-2 ml-10"></v-divider>
          </v-col>
          <v-col cols="5" class="mx-0 px-0">
            <h5 class="text-center">¿Ya tienes una cuenta?</h5>
          </v-col>
          <v-col cols="3" class="mx-0 px-0">
            <v-divider class="mt-2 mr-10"></v-divider>
          </v-col>
          <v-col cols="12" class="px-13 pt-4 pb-6 text-center">
            <v-btn color="primary" class="botone" outlined @click="register_usuario.estado = false">Iniciar sesión</v-btn>
          </v-col>
        </v-row>
      </v-container>
      <ALERT @confirm="confirm()" @cancel="cancel()" v-if="alert.state" :alert="alert"></ALERT>
    </v-card>
  </v-dialog>
</template>

<script>
import { INPUT, AUTOCOMPLETE } from "@/mixins/global";
import { Alert } from "../../mixins/alert";
import { mapActions } from "vuex";

export default {
  mixins: [INPUT, AUTOCOMPLETE, Alert],
  props: {
    register_usuario: Object,
  },
  data() {
    return {
      validate: true,
      show_password: false,
      show_password2: false,
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
        email: {
          value: "",
          tipo: "email",
          id: "email",
          label: "Email",
          type: "email",
          maxlength: "50",
          rules: [(v) => !!v || "Email es requerido", (v) => /.+@.+\..+/.test(v) || "Email no es válido"],
        },
        type_document: {
          value: "",
          id: "type_document",
          label: "Tipo",
          required: true,
          item_value: "id",
          items: [
            { id: "0", text: "C.C." },
            { id: "1", text: "T.I." },
            { id: "2", text: "C.E." },
          ],
          rules: [(v) => !!v || "Obligatorio"],
        },
        phone_number: {
          value: "",
          id: "phone_number",
          label: "Teléfono",
          maxlength: "30",
          rules: [(v) => !!v || "Teléfono es requerido"],
        },
        document: {
          value: "",
          id: "document",
          label: "Documento",
          maxlength: "10",
          rules: [(v) => !!v || "Documento es requerido"],
        },
        password: {
          value: "",
          id: "password",
          label: "Contraseña",
          maxlength: "25",
          placeholder: "Ingresar contraseña",
          show_password: false,
          rules: [(v) => !!v || "Contraseña es requerida"],
        },
        password_repetir: {
          value: "",
          id: "password",
          label: "Contraseña",
          maxlength: "25",
          placeholder: "Repetir contraseña",
          show_password: false,
          rules: [(v) => !!v || "Contraseña es requerida", (v) => v === this.form.password.value || `Las contraseñas no coinciden`],
        },
      },
    };
  },
  methods: {
    ...mapActions({
      _registerUser: "user/_postUser",
    }),
    cancel() {
      this.deletAlert();
    },
    async registrarUsuario() {
      const validate = this.$refs.form.validate();
      const data = {
        name: this.form.name.value,
        last_name: this.form.last_name.value,
        email: this.form.email.value,
        type_document: this.form.type_document.value,
        document: this.form.document.value,
        password: this.form.password.value,
        phone_number: this.form.phone_number.value,
      };
      if (validate) {
        const RES = await this._registerUser({ data });
        console.log(RES);
        if (RES.S) {
          this.$refs.form.reset();
          this.sendAlert(RES.S, RES.alert);
        }
        RES.msg && this.sendAlert(RES.msg, RES.alert);
      }
    },
  },
};
</script>

<style>
.scroll {
  overflow-x: scroll;
  overflow-y: hidden;
}
</style>
