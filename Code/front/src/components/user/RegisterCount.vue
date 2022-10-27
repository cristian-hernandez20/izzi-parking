<template>
  <v-dialog v-model="register_usuario.estado" width="500" persistent>
    <v-card style="border-radius: 20px" color="white" elevation="3">
      <v-container>
        <h1 class="text-center primary--text pt-6 pb-12">Registrar cuenta</h1>
        <v-form v-model="validacion" ref="form" lazy-validation>
          <v-row justify="center" class="px-5">
            <v-col cols="12" md="6" sm="6" xl="6" lg="6" class="py-0">
              <INPUT :field="form.nombre" />
            </v-col>
            <v-col cols="12" md="6" sm="6" xl="6" lg="6" class="py-0">
              <INPUT :field="form.apellido" />
            </v-col>
            <v-col cols="12" class="py-0">
              <INPUT :field="form.usuario" />
            </v-col>
            <v-col cols="4" class="py-0">
              <AUTOCOMPLETE :field="form.tipo_identidad" />
            </v-col>
            <v-col cols="8" class="py-0">
              <INPUT :field="form.documento" />
            </v-col>
            <v-col cols="12" class="py-0">
              <INPUT :field="form.password" />
            </v-col>
            <v-col cols="12" class="py-0">
              <INPUT :field="form.password_repetir" />
            </v-col>
            <v-col cols="12" class="pt-1 pb-8">
              <v-btn elevation="0" color="primary" dark block @click="registrarUsuario()" large>Crear cuenta</v-btn>
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
          <v-col cols="12" class="px-13 pt-4 pb-10 text-center">
            <v-btn color="primary" @click="register_usuario.estado = false" outlined large>Iniciar sesión</v-btn>
          </v-col>
        </v-row>
      </v-container>
      <ALT @exitEsc="cancel()" @cancel="cancel()" @cancelAlert="cancelAlert()" @confirm="confirm()" :alert="alert" v-if="alert.estado" />
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
      validacion: true,
      show_password: false,
      show_password2: false,
      form: {
        nombre: {
          value: "",
          id: "nombre",
          label: "Nombres",
          maxlength: "50",
          required: true,
          //   autofocus: true,
          rules: [(v) => !!v || "Nombres son requeridos"],
        },
        apellido: {
          value: "",
          id: "apellido",
          label: "Apellidos",
          maxlength: "50",
          rules: [(v) => !!v || "Apellidos son requeridos"],
        },
        usuario: {
          value: "",
          tipo: "email",
          id: "usuario",
          label: "Email",
          maxlength: "50",
          rules: [(v) => !!v || "Email es requerido", (v) => /.+@.+\..+/.test(v) || "Email no es valido"],
        },
        tipo_identidad: {
          value: "",
          id: "tipo_identidad",
          label: "Tipo",
          items: [
            { id: "0", text: "C.C" },
            { id: "1", text: "T.I" },
            { id: "2", text: "C.E" },
            { id: "3", text: "C.C" },
          ],
          rules: [(v) => !!v || "Obligatorio"],
        },
        documento: {
          value: "",
          id: "documento",
          label: "Documento",
          maxlength: "12",
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
    ...mapActions({}),

    async registrarUsuario() {
      const validacion = this.$refs.form.validate();
      const data = {
        name: this.form.nombre.value,
        lastName: this.form.apellido.value,
        email: this.form.usuario.value,
        typeDocument: this.form.tipo_identidad.value,
        document: this.form.documento.value,
        password: this.form.password.value,
        roleId: 0,
      };
      //this.$router.push('/reistroCanal')
      if (validacion) {
        const respuesta = await this._addUsuario(data);
        console.log(respuesta);
        if (respuesta.status == 200) {
          this.form.nombre.value = "";
          this.form.apellido.value = "";
          this.form.usuario.value = "";
          this.form.tipo_identidad.value = "";
          this.form.documento.value = "";
          this.form.password.value = "";
          this.ALT_("CORREO-0");
        } else if (respuesta.status == 400) this.ALT_("CORREO-3");
      } else {
      }
    },
    cancel() {
      this.ALTD_();
    },
  },
  created() {
    console.log("hello");
  },
};
</script>

<style></style>
