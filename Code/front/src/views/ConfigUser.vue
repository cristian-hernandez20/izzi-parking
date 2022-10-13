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
                    <v-chip v-if="current_user.level_user == 'ADMIN'" color="secondary">
                      ADMINISTRADOR
                      <v-icon color="white" small class="botone ml-2"> mdi-shield-account </v-icon>
                    </v-chip>
                    <v-chip v-else color="primary">
                      CELADOR
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
            <v-form class="mx-auto" ref="form_change_password" v-model="valid_change_password" lazy-validation>
              <v-row justify="center" align="center" class="mt-2 px-4">
                <v-col cols="12" lg="12" sm="12" md="12" class="py-0 px-2">
                  <v-text-field
                    :append-icon="showPassword_current ? 'mdi-eye' : 'mdi-eye-off'"
                    @keypress.enter="nextAction(form_change_password, change, validate(form_change_password.current_password))"
                    @click:append="showPassword_current = !showPassword_current"
                    :type="showPassword_current ? 'text' : 'password'"
                    @focus="change = 'current_password'"
                    placeholder="Contraseña actual"
                    v-model="form_change_password.current_password"
                    label="Contraseña Actual"
                    :rules="rules_password"
                    ref="current_password"
                    color="primary"
                    maxlength="15"
                    required
                    outlined
                    filled
                    shaped
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12" lg="12" sm="12" md="12" class="py-0 px-2">
                  <v-text-field
                    :append-icon="showPassword_new ? 'mdi-eye' : 'mdi-eye-off'"
                    @keypress.enter="nextAction(form_change_password, change, validate(form_change_password.new_password), changePassword())"
                    @keydown.esc="nextAction(form_change_password, change)"
                    @click:append="showPassword_new = !showPassword_new"
                    v-model="form_change_password.new_password"
                    :type="showPassword_new ? 'text' : 'password'"
                    @focus="change = 'new_password'"
                    placeholder="Contraseña nueva"
                    :rules="rules_password"
                    label="Contraseña Nueva"
                    color="primary"
                    ref="new_password"
                    maxlength="15"
                    required
                    outlined
                    filled
                    shaped
                    dense
                  ></v-text-field>
                </v-col>
                <v-btn @click="$refs.form_change_password.reset()" class="mb-2 mx-2" justify="center" color="warning" filled shaped dense>
                  <v-icon class="ml-1">mdi-lock-reset</v-icon>
                </v-btn>
                <v-btn
                  dense
                  filled
                  shaped
                  justify="center"
                  :disabled="!valid_change_password"
                  color="success"
                  class="mb-2"
                  @click="changePassword()"
                  :loading="_stateLoading"
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
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-row justify="center" class="mt-2 px-4">
                <v-col cols="12" lg="6" sm="6" md="6" class="py-0 px-2">
                  <v-text-field
                    @keydown.esc="nextAction(form, change, validate(form.name))"
                    @keypress.enter="nextAction(form, change, validate(form.name))"
                    @focus="change = 'name'"
                    :onblur="(validate_current_password = false)"
                    @input="form.name = nameToUper(form.name)"
                    :rules="rules_name"
                    v-model="form.name"
                    label="Nombres"
                    maxlength="25"
                    ref="name"
                    required
                    outlined
                    filled
                    shaped
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12" lg="6" sm="6" md="6" class="py-0 px-2">
                  <v-text-field
                    @keydown.esc="nextAction(form, change, validate(form.last_name), null)"
                    @keypress.enter="nextAction(form, change, validate(form.last_name))"
                    @input="form.last_name = nameToUper(form.last_name)"
                    @focus="change = 'last_name'"
                    v-model="form.last_name"
                    :rules="rules_last_name"
                    label="Apellidos"
                    ref="last_name"
                    maxlength="25"
                    required
                    outlined
                    filled
                    shaped
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12" lg="6" sm="6" md="6" class="py-0 px-2">
                  <v-text-field
                    onkeypress="return (event.charCode > 47 && event.charCode < 123)"
                    @keydown.esc="nextAction(form, change, validate(form.document))"
                    @keypress.enter="nextAction(form, change, validate(form.document))"
                    @focus="change = 'document'"
                    label="Numero de cedula"
                    v-model="form.document"
                    ref="document"
                    maxlength="10"
                    required
                    outlined
                    filled
                    shaped
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12" lg="6" sm="6" md="6" class="py-0 px-2">
                  <v-text-field
                    onkeypress="return (event.charCode > 47 && event.charCode < 123)"
                    @keypress.enter="nextAction(form, change, true)"
                    @keydown.esc="nextAction(form, change, true)"
                    @focus="(change = 'phone_number'), (validate_current_password = false)"
                    v-model="form.phone_number"
                    label="Numero de celular"
                    ref="phone_number"
                    id="phone_number"
                    :maxlength="'17'"
                    required
                    outlined
                    filled
                    shaped
                    dense
                  ></v-text-field>
                </v-col>

                <v-col cols="12" lg="6" sm="6" md="6" class="py-0 px-2">
                  <v-text-field
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    @keypress.enter="nextAction(form, change, validate(form.password), saveChange())"
                    @click:append="showPassword = !showPassword"
                    :type="showPassword ? 'text' : 'password'"
                    @keydown.esc="nextAction(form, change)"
                    placeholder="Contraseña actual"
                    @focus="change = 'password'"
                    v-model="form.password"
                    :rules="rules_password"
                    label="Contraseña"
                    color="primary"
                    ref="password"
                    maxlength="17"
                    required
                    outlined
                    filled
                    shaped
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12" lg="12" sm="12" md="12" class="py-0 text-center">
                  <v-btn
                    :loading="_stateLoading"
                    :disabled="!valid"
                    @click="saveChange()"
                    justify="center"
                    class="my-2 botone"
                    color="success"
                    filled
                    shaped
                    dense
                  >
                    Guardar <v-icon class="ml-1" small>mdi-content-save</v-icon>
                  </v-btn>
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
import { current_user, nameToUper, phoneNumberImask } from "@/global";
import { controller } from "@/mixins/controler";
import { mapGetters, mapActions } from "vuex";
import { Alert } from "@/mixins/alert";
import moment from "moment";

export default {
  name: "Config-user",
  mixins: [Alert, controller],
  data: () => ({
    current_user: current_user,
    form: {
      name: current_user.name,
      last_name: current_user.last_name,
      document: current_user.document,
      phone_number: current_user.phone_number,
      password: "",
    },
    form_change: {},
    change: "",
    showPassword_current: false,
    showPassword_new: false,
    showPassword: false,
    form_change_password: {
      current_password: "",
      new_password: "",
    },
    validate_current_password: false,
    validate_new_password: false,
    validate_document: null,
    valid_change_password: true,
    valid: true,

    rules_name: [(v) => !!v || "Nombre es requerido", (v) => (v && v.length <= 30) || "Nombre no puede tener mas de 30 letras"],
    rules_last_name: [(v) => !!v || "Apellido es requerido", (v) => (v && v.length <= 30) || "Apellido no puede tener mas de 30 letras"],
    max_length_number: "10",
    max_length_document: "10",
    rules_password: [
      (v) => !!v || "Contraseña es requerida",
      (v) => (v && v.length <= 30) || "Contraseña no válida",
      (v) => (v && v.length >= 3) || "Contraseña muy corta",
    ],
  }),

  watch: {
    "form.document"() {
      this.validate_document = null;
      const USERS = this.getUserData_("get_users");
      USERS.forEach((user) => {
        if (this.form.document != this.current_user.document) {
          if (this.form.document == user.document) {
            this.validate_document = user.document;
            return this.sendAlert("doc_1", "info", null, null);
          }
        }
      });
    },
  },
  computed: {
    date() {
      moment.locale("es");
      let fecha = moment().format("ll");
      let hora = moment().format("dddd");
      const FECHA_ACTUAL = {
        fech: fecha,
        time: hora,
      };
      return FECHA_ACTUAL;
    },
    ...mapGetters({
      _stateLoading: "_stateLoading",
      getUserData_: "user/getUserData_",
    }),
  },
  methods: {
    nameToUper,
    phoneNumberImask,
    ...mapActions({
      _getUsers: "user/_getUsers",
      _putUser: "user/_putUser",
      validPassword_: "user/validPassword_",
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
    validate(value) {
      if (["", undefined].includes(value)) {
        this.sendAlert("field_0", "info", null, null);
        return false;
      }
      switch (this.change) {
        case "current_password":
          this.validPasswordCurrent();
          return this.validate_current_password;
        case "new_password":
          return this.validPasswordNew();
        default:
          return true;
      }
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
      this.$refs.form.validate();
      if (this.validate_document) return this.sendAlert("doc_1", "info", null, null);
      if (this.$refs.form.validate()) {
        for (let i in this.form) {
          if (![this.form[i], undefined].includes(this.current_user[i])) {
            let va = JSON.parse(`{"${i}" : "${this.form[i]}"}`);
            Object.assign(this.form_change, va);
          }
        }
        if (Object.entries(this.form_change).length === 0) {
          return this.sendAlert("user_3", "info", null, null);
        } else {
          const data = JSON.parse(JSON.stringify(this.form_change));
          const { password } = this.form;
          const USER = current_user.document;
          const RES = await this._putUser({ USER, password, data });
          if (RES.S) {
            this.sendAlert("user_put", "success", null, null);
            let auth = JSON.parse(atob(sessionStorage.auth_code));
            auth.data.document = this.form.document;
            auth.data.last_name = this.form.last_name;
            auth.data.name = this.form.name;
            auth.data.phone_number = this.form.phone_number;
            sessionStorage.auth_code = btoa(JSON.stringify(auth));
            this.$refs.password.reset();
          }
        }
      }
    },
  },
  mounted() {
    phoneNumberImask();
  },
  created() {
    this._getUsers();
  },
};
</script>
