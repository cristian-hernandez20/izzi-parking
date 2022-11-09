<template>
  <v-card style="height: 100%">
    <v-img :src="require('../assets/image/fondo.jpg')" style="height: 100%" class="mx-auto" disabled>
      <v-hover v-slot="{ hover }" open-delay="100">
        <v-card :elevation="hover ? 12 : 10" :loading="_stateLoading" class="mx-auto my-16" width="400" shaped>
          <v-card-text class="mt-0 text-title">
            <h1 class="primary--text text-center">Iniciar sesión</h1>
          </v-card-text>
          <v-divider class="mx-4"></v-divider>
          <v-row justify="center">
            <v-col cols="12" lg="12" sm="12" md="12" class="py-0 my-0">
              <lottie-animation
                :animationData="require('@/assets/image/parking-login.json')"
                class="mx-auto zoomIt"
                style="height: 180px"
                ref="anim_login"
                :autoPlay="true"
                id="anim_login"
                :loop="true"
                :speed="2"
                content
              />
            </v-col>
            <v-col cols="12" lg="12" sm="12" md="12" class="py-0 my-0">
              <v-row justify="center">
                <v-col cols="12" md="9" sm="9" xl="9" lg="9" class="py-0">
                  <INPUT :field="form.email" />
                </v-col>
                <v-col cols="12" md="9" sm="9" xl="9" lg="9" class="py-0">
                  <INPUT :field="form.password" />
                </v-col>
                <v-col cols="12">
                  <v-row justify="center">
                    <h5 class="primary--text text-h7 py-1">¿No tienes una cuenta?</h5>
                    <v-btn small text class="zoomIt" color="success" @click="register_usuario.estado = true">crear cuenta</v-btn>
                  </v-row>
                </v-col>
                <v-col cols="12" lg="9" md="9" sm="9" class="text-center">
                  <v-hover v-slot="{ hover }" open-delay="50">
                    <v-btn
                      class="mx-auto mt-0 mb-4 py-0 botone"
                      :elevation="hover ? 12 : 0"
                      :loading="_stateLoading"
                      @click="login()"
                      color="primary"
                      rounded
                      block
                    >
                      Inicia sesión
                      <v-icon class="ml-2"> fa-solid fa-arrow-right-to-bracket </v-icon>
                      <template v-slot:loader>
                        <span class="custom-loader">
                          <v-icon light>mdi-loading</v-icon>
                        </span>
                      </template>
                    </v-btn>
                  </v-hover>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12" lg="12" md="12" sm="12" class="text-center mt-6 pt-0">
              <v-hover v-slot="{ hover }" open-delay="60">
                <h5 :class="`text-center botone ${hover ? 'success' : 'primary'}--text `" style="cursor: pointer" @click="eonia">IZZI PARKING</h5>
              </v-hover>
              <h5 class="text-center mb-4 text-title primary--text">© 2022 Izzi Parking - Versión 1.0.0</h5>
            </v-col>
          </v-row>
        </v-card>
      </v-hover>
    </v-img>
    <RegisterUser :register_usuario="register_usuario" v-if="register_usuario.estado" />
    <ALERT @confirm="confirm()" @cancel="cancel()" v-if="alert.state" :alert="alert"></ALERT>
  </v-card>
</template>

<script>
import RegisterUser from "../components/user/RegisterCount.vue";
import { mapActions, mapGetters } from "vuex";
import LottieAnimation from "lottie-web-vue";
import { Alert } from "../mixins/alert";
import { INPUT } from "@/mixins/global";
export default {
  name: "Login",
  components: {
    LottieAnimation,
    RegisterUser,
  },
  mixins: [Alert, INPUT],
  data() {
    return {
      register_usuario: {
        estado: false,
      },

      form: {
        email: {
          value: "",
          tipo: "email",
          id: "email",
          label: "Email",
          type: "email",
          maxlength: "50",
          prepend_icon: "mdi-account-circle",
          rules: [(v) => !!v || "Email es requerido", (v) => /.+@.+\..+/.test(v) || "Email no es valido"],
        },
        password: {
          value: "",
          tipo: "password",
          id: "password",
          label: "Contraseña",
          type: "password",
          maxlength: "20",
          show_password: false,
          prepend_icon: "mdi-lock",
          rules: [(v) => !!v || "Contraseña es requerida"],
        },
      },
      change: "",
      loader: null,
      showPassword: false,
    };
  },
  computed: {
    ...mapGetters({
      _stateLoading: "_stateLoading",
    }),
  },
  watch: {
    loader() {
      const l = this.loader;
      this[l] = !this[l];
      setTimeout(() => (this[l] = false), 3000);
      this.loader = null;
    },
    "form.user"() {
      if (this.change === "user" && this.form.user.length === 10) {
        this.$refs.password.focus();
      }
    },
  },
  methods: {
    ...mapActions({
      _loginUser: "sesion/_loginUser",
    }),
    cancel() {
      this.deletAlert();
      setTimeout(() => {
        document.getElementById("email").focus();
      }, 100);
    },
    validate(value) {
      switch (this.change) {
        case "user":
          if (value == "") {
            this.sendAlert("user_0", "info");
            return false;
          } else {
            return true;
          }
        case "password":
          return this.validate_current_password;
        case "new_password":
          return this.validPasswordNew();
        default:
          return true;
      }
    },
    async login() {
      const data = this.form;
      if (!data.email.value) return this.sendAlert("user_0", "info");
      try {
        const data_ = {
          email: data.email.value,
          password: data.password.value,
        };
        const RES = await this._loginUser({ data_ });
        console.log(RES);
        RES.msg && this.sendAlert(RES.msg, "error");
      } catch (error) {
        console.error("login", error);
      }
    },
    eonia() {
      // window.open("http://www.eonia.com.co");
    },
  },
};
</script>
<style scoped>
.custom-loader {
  animation: loader 0.8s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}

@media only screen and (max-width: 700px) {
  .min_footer {
    display: none;
  }
}
</style>
