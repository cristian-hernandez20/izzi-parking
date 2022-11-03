<template>
  <v-container fluid>
    <v-row justify="center" class="pt-4 ml-16 mr-2">
      <v-col cols="12" lg="12" sm="12" md="12">
        <v-card elevation="4">
          <v-card-text class="text-title primary--text mt-0">
            <h2 class="text-start">
              <v-icon color="primary" class="mb-1">mdi-account-circle</v-icon>
              Perfil > Administra datos de tu cuenta
            </h2>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" lg="5" sm="5" md="5">
        <v-card elevation="12">
          <v-card-text class="primary--text">
            <v-list>
              <v-list-item>
                <v-list-item-avatar size="40" color="primary" class="botone">
                  <span class="white--text mx-auto">
                    {{ `${current_user.name.slice(0, 1)}${current_user.last_name.slice(0, 1)} ` }}
                  </span>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title class="text-title">
                    <v-chip v-if="['ADMIN', 'SP'].includes(current_user.level_user)" color="secondary">
                      ADMINISTRADOR
                      <v-icon color="white" small class="botone ml-2"> mdi-shield-account </v-icon>
                    </v-chip>
                    <v-chip v-else color="primary">
                      USUARIO
                      <v-icon color="white" small class="botone ml-2"> mdi-account-badge </v-icon>
                    </v-chip>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item class="ml-0">
                <v-list-item-title class="text-title"> Nombres: {{ current_user.name }} </v-list-item-title>
              </v-list-item>
              <v-list-item class="ml-0">
                <v-list-item-title class="text-title"> Apellidos: {{ current_user.last_name }} </v-list-item-title>
              </v-list-item>
              <v-list-item class="ml-0">
                <v-list-item-title class="text-title"> Telefono: {{ ` ${current_user.phone_number}` }} </v-list-item-title>
              </v-list-item>
              <v-list-item class="ml-0">
                <v-list-item-title class="text-title"> Documento: {{ ` ${current_user.document}` }} </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
        <v-card elevation="12" class="mt-6">
          <v-card-text class="primary--text">
            <h2 class="text-title text-center py-4">Cambiar contraseña</h2>
            <v-form class="mx-auto" ref="form_change" v-model="valid_change_password" lazy-validation>
              <v-row justify="center" align="center" class="mt-2 px-4">
                <v-col cols="12" class="py-0">
                  <INPUT :field="form_change.password_current" />
                </v-col>
                <v-col cols="12" class="py-0">
                  <INPUT :field="form_change.password_repetir" />
                </v-col>
                <v-btn @click="$refs.form_change.reset()" class="mb-2 mx-2" justify="center" color="warning" filled shaped dense>
                  <v-icon class="ml-1">mdi-lock-reset</v-icon>
                </v-btn>
                <v-btn
                  :disabled="!valid_change_password"
                  @click="changePassword()"
                  :loading="_stateLoading"
                  justify="center"
                  color="success"
                  class="mb-2"
                  shaped
                  filled
                  dense
                >
                  Cambiar
                  <v-icon small class="ml-1">mdi-key-change</v-icon>
                </v-btn>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" lg="7" sm="7" md="7">
        <v-card elevation="12">
          <v-card-text class="primary--text">
            <h2 class="text-title text-center py-4">Cambiar información de la cuenta</h2>
            <v-form v-model="validate" ref="form" lazy-validation class="mt-10">
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
                <v-col cols="5" class="pt-1 pb-8">
                  <v-btn elevation="0" color="primary" class="botone" dark @click="saveChange()" large>Actualizar</v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
      <ALERT v-if="alert.state" :alert="alert" @exitEsc="cancel()" @cancel="cancel()" @confirm="confirm()"></ALERT>
    </v-row>
  </v-container>
</template>
<script>
import { INPUT, AUTOCOMPLETE } from "@/mixins/global";
import { mapGetters, mapActions } from "vuex";
import { current_user } from "@/global";
import { Alert } from "@/mixins/alert";
import moment from "moment";

export default {
  name: "Config-user",
  mixins: [INPUT, AUTOCOMPLETE, Alert],

  data() {
    return {
      current_user: current_user,
      validate: true,
      show_password: false,
      show_password2: false,

      form: {
        name: {
          value: current_user.name,
          id: "name",
          label: "Nombres",
          maxlength: "50",
          required: true,
          rules: [(v) => !!v || "Nombres son requeridos"],
        },
        last_name: {
          value: current_user.last_name,
          id: "last_name",
          label: "Apellidos",
          maxlength: "50",
          rules: [(v) => !!v || "Apellidos son requeridos"],
        },
        email: {
          value: current_user.email,
          tipo: "email",
          id: "email",
          label: "Email",
          type: "email",
          maxlength: "50",
          rules: [(v) => !!v || "Email es requerido", (v) => /.+@.+\..+/.test(v) || "Email no es valido"],
        },
        type_document: {
          value: current_user.type_document,
          id: "type_document",
          label: "Tipo",
          required: true,
          item_value: "id",
          items: [
            { id: "0", text: "C.C" },
            { id: "1", text: "T.I" },
            { id: "2", text: "C.E" },
          ],
          rules: [(v) => !!v || "Obligatorio"],
        },
        phone_number: {
          value: current_user.phone_number,
          id: "phone_number",
          label: "Telefono",
          maxlength: "30",
          rules: [(v) => !!v || "Teléfono es requerido"],
        },
        document: {
          value: current_user.document,
          id: "document",
          label: "Documento",
          maxlength: "12",
          rules: [(v) => !!v || "Documento es requerido"],
        },
      },
      change: "",
      showPassword_current: false,
      showPassword_new: false,
      showPassword: false,
      form_change: {
        password_current: {
          value: "",
          id: "password_current",
          label: "Contraseña",
          maxlength: "25",
          placeholder: "Ingresar contraseña",
          show_password: false,
          rules: [(v) => !!v || "Contraseña es requerida"],
        },
        password_repetir: {
          value: "",
          id: "password_repetir",
          label: "Nueva contraseña",
          maxlength: "25",
          placeholder: "Nueva contraseña",
          show_password: false,
          rules: [(v) => !!v || "Contraseña es requerida", (v) => v === this.form_change.password_current.value || `Las contraseñas no coinciden`],
        },
      },
      validate_current_password: false,
      validate_new_password: false,
      validate_document: null,
      valid_change_password: true,
      valid: true,
    };
  },

  watch: {
    // "form.document.value"() {
    //   this.validate_document = null;
    //   const USERS = this.getUserData_("get_users");
    //   USERS.forEach((user) => {
    //     if (this.form.document.value != this.current_user.document) {
    //       if (this.form.document.value == user.document) {
    //         this.validate_document = user.document;
    //         return this.sendAlert("doc_1", "info", null, null);
    //       }
    //     }
    //   });
    // },
  },
  computed: {
    date() {
      moment.locale("es");
      let date_moment = moment().format("ll");
      let time = moment().format("dddd");
      const date = {
        fech: date_moment,
        time: time,
      };
      return date;
    },
    ...mapGetters({
      _stateLoading: "_stateLoading",
      getUserData_: "user/getUserData_",
    }),
  },
  methods: {
    ...mapActions({
      validPassword_: "user/validPassword_",
      _getUsers: "user/_getUsers",
      _getUser: "user/_getUser",
      _putUser: "user/_putUser",
    }),
    cancel() {
      if (!["new_password", "password"].includes(this.change)) {
        this.checkFoco(this.change);
      }
      Object.entries(this.form_change).length !== 0 && location.reload();
      this.deletAlert();
    },
    confirm() {
      this.singOut_();
    },
    async saveUser() {
      try {
      } catch (error) {
        console.error(error);
      }
    },
    checkFoco(foco) {
      setTimeout(() => {
        this.$refs[foco].focus();
      }, 100);
    },
    async validPasswordNew() {
      const { new_password, current_password } = this.form_change_password;
      if (new_password == current_password && new_password) {
        return this.sendAlert("pass_0", "info", null, null);
      }
      this.validate_new_password = true;
    },
    async validPasswordCurrent() {
      try {
        const { document } = this.form;
        const { current_password } = this.form_change_password;
        const RES = await this.validPassword_({ document, current_password });
        if (!RES.S) return this.sendAlert("pass_2", "info", null, null);
        else return (this.validate_current_password = true);
      } catch (error) {
        console.error(error);
      }
    },
    async changePassword() {
      this.$refs.form_change_password.validate();
      if (this.$refs.form_change_password.validate()) {
        await this.validPasswordCurrent();
        this.validPasswordNew();
        if (this.validate_new_password && this.validate_current_password) {
          const USER = this.current_user.document;
          const password = this.form_change_password.current_password;
          const data = {
            password: this.form_change_password.new_password,
          };
          const RES = await this._putUser({ USER, password, data });
          if (RES) {
            this.$refs.form_change_password.reset();
            return this.sendAlert("pass_1", "success", null, null);
          }
          if (!RES.S) this.sendAlert("pass_3", "error", null, null);
        }
      }
    },
    async saveChange() {
      // const validate = this.$refs.form.validate();
      if (this.validate) {
        for (let i in this.form) {
          console.log(i);
          // if (![this.form[i], undefined].includes(this.current_user[i])) {
          //   let va = JSON.parse(`{"${i}" : "${this.form[i]}"}`);
          //   Object.assign(this.form_change, va);
          // }
        }
        // const data = JSON.parse(JSON.stringify(this.form_change));
        // const { password } = this.form;
        // const USER = current_user.document;
        // const RES = await this._putUser({ USER, password, data });
        // if (RES.S) {
        //   this.sendAlert("user_put", "success", null, null);
        //   let auth = JSON.parse(atob(sessionStorage.auth_code));
        //   auth.data.document = this.form.document;
        //   auth.data.last_name = this.form.last_name;
        //   auth.data.name = this.form.name;
        //   auth.data.phone_number = this.form.phone_number;
        //   sessionStorage.auth_code = btoa(JSON.stringify(auth));
        //   this.$refs.password.reset();
        // }
      }
    },
  },
  mounted() {
    this._getUsers();
  },
};
</script>
