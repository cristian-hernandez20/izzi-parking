<template>
    <v-container fluid>
      <v-row justify="center" class="pt-4 ml-16 mr-2">
        <v-col cols="12" lg="12" sm="12" md="12">
          <v-card elevation="4">
            <v-card-text class="text-title primary--text mt-0">
              <h2 class="text-start">
                <v-icon color="primary" class="mb-1">mdi-account-circle</v-icon>
                Ayuda > Video guias
              </h2>
            </v-card-text>
          </v-card>
        </v-col>          
          <!-- Cuadro 1 -->
          <v-col cols="6" lg="6" sm="6" md="6">
        <v-card elevation="12">
          <v-card-text class="primary--text">
            <v-list>
              <v-list-item>
        
                <v-list-item-content>
                  <v-list-item-title class="text-title">
                    <v-chip v-if="['ADMIN', 'SP'].includes(current_user.level_user)" color="secondary">
                      <v-icon color="white" small class="botone ml-2"> mdi-shield-account </v-icon>
                    </v-chip>
                    <v-chip v-else color="primary">
                      Guia#1:Como registrarse, e Iniciar sesion en IZZI PARKING 
                    </v-chip>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item class="ml-0">
                <v-list-item-title class="link"> <iframe width="500" height="250" src="https://www.youtube.com/embed/fyn1aHqsHwA" title="Cómo registrarse e iniciar sesión" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> </v-list-item-title>
              </v-list-item>
             
              <v-list-item class="ml-0">
                <v-list-item-title class="text-title"> Descripcion </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Cuadro 2 -->
      <v-col cols="6" lg="6" sm="6" md="6">
        <v-card elevation="12">
          <v-card-text class="primary--text">
            <v-list>
              <v-list-item>
        
                <v-list-item-content>
                  <v-list-item-title class="text-title">
                    <v-chip v-if="['ADMIN', 'SP'].includes(current_user.level_user)" color="secondary">
                      <v-icon color="white" small class="botone ml-2"> mdi-shield-account </v-icon>
                    </v-chip>
                    <v-chip v-else color="primary">
                      Guia#2:Como realizar reservas en IZZI PARKING
                    </v-chip>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item class="ml-0">
                <v-list-item-title class="link"> <iframe width="500" height="250" src="https://www.youtube.com/embed/-CLCwIBzBbs" title="Proceso de reservas paso a paso" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> </v-list-item-title>
              </v-list-item>
             
              <v-list-item class="ml-0">
                <v-list-item-title class="text-title">Descripcion:</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Cuadro 3 -->
      <v-col cols="6" lg="6" sm="6" md="6">
        <v-card elevation="12">
          <v-card-text class="primary--text">
            <v-list>
              <v-list-item>
        
                <v-list-item-content>
                  <v-list-item-title class="text-title">
                    <v-chip v-if="['ADMIN', 'SP'].includes(current_user.level_user)" color="secondary">
                      <v-icon color="white" small class="botone ml-2"> mdi-shield-account </v-icon>
                    </v-chip>
                    <v-chip v-else color="primary">
                      Guia#3:Confirgurar tu perfil en IZZI PARKING
                    </v-chip>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item class="ml-0">
                <v-list-item-title class="link"> <iframe width="500" height="250" src="https://www.youtube.com/embed/41FiS_PcV-0" title="😎Como configurar tu perfil😎 📝y darle un mejor estilo al discord📝" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> </v-list-item-title>
              </v-list-item>
             
              <v-list-item class="ml-0">
                <v-list-item-title class="text-title"> Descripcion:</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Cuadro 4 -->

      <v-col cols="6" lg="6" sm="6" md="6">
        <v-card elevation="12">
          <v-card-text class="primary--text">
            <v-list>
              <v-list-item>
        
                <v-list-item-content>
                  <v-list-item-title class="text-title">
                    <v-chip v-if="['ADMIN', 'SP'].includes(current_user.level_user)" color="secondary">
                      <v-icon color="white" small class="botone ml-2"> mdi-shield-account </v-icon>
                    </v-chip>
                    <v-chip v-else color="primary">
                      Guia#4: Visualizar puestos disponibles en  IZZI PARKING
                    </v-chip>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item class="ml-0">
                <v-list-item-title class="link"> <iframe width="500" height="250" src="https://www.youtube.com/embed/-CLCwIBzBbs" title="Proceso de reservas paso a paso" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> </v-list-item-title>
              </v-list-item>
             
              <v-list-item class="ml-0">
                <v-list-item-title class="text-title"> Descripcion: </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
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
  name: "help",
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
          items: [{ id: "0", text: "C.C" }, { id: "1", text: "T.I" }, { id: "2", text: "C.E" }],
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
            return this.sendAlert("pass_1", "success");
          }
          if (!RES.S) this.sendAlert("pass_3", "error");
        }
      }
    },
    async saveChange() {
      if (this.validate) {
        const data_ = {
          name: this.form.name.value,
          last_name: this.form.last_name.value,
          email: this.form.email.value,
          type_document: this.form.type_document.value,
          document: this.form.document.value,
          phone_number: this.form.phone_number.value,
        };

        const _id = current_user._id;
        const RES = await this._putUser({ _id, data_ });

        console.log(RES);

        if (RES.S) {
          this.sendAlert(RES.S, "success");
          let auth = JSON.parse(atob(sessionStorage.auth_code));

          auth.DATA.document = this.form.type_document.value;
          auth.DATA.last_name = this.form.last_name.value;
          auth.DATA.name = this.form.name.value;
          auth.DATA.phone_number = this.form.phone_number.value;
          auth.DATA.email = this.form.email.value;
          auth.DATA.document = this.form.document.value;
          sessionStorage.auth_code = btoa(JSON.stringify(auth));
        }
      }
    },
  },
  mounted() {
    this._getUsers();
  },
};
</script>
  