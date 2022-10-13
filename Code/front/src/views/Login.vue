<template>
  <v-card style="height: 100%">
    <v-img :src="require('../assets/image/fondo.jpg')" style="height: 100%" class="mx-auto" disabled>
      <v-hover v-slot="{ hover }" open-delay="100">
        <v-card :elevation="hover ? 12 : 10" :loading="_stateLoading" class="mx-auto my-8" width="400" shaped>
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
                <v-col cols="12" lg="9" sm="9" md="9" class="text-center">
                  <v-text-field
                    onkeypress="return (event.charCode > 47 && event.charCode < 123)"
                    @keydown.enter="nextAction(form, change, validate(form.user))"
                    @input="(val) => (form.user = form.user.toUpperCase())"
                    prepend-icon="mdi-account-circle"
                    @focus="change = 'user'"
                    placeholder="Usuario"
                    v-model="form.user"
                    color="primary"
                    label="Usuario"
                    maxlength="10"
                    autocomplete
                    class="mt-6"
                    type="user"
                    ref="user"
                    autofocus
                    id="user"
                    outlined
                    shaped
                    dense
                  />
                  <v-text-field
                    onkeypress="return (event.charCode > 47 && event.charCode < 123)"
                    :append-icon="showPassword ? ' mdi-eye' : 'mdi-eye-off'"
                    @keydown.enter="nextAction(form, change, null, login())"
                    @keydown.esc="nextAction(form, change)"
                    @click:append="showPassword = !showPassword"
                    :type="showPassword ? 'text' : 'password'"
                    placeholder="Ingresa Contraseña"
                    @focus="change = 'password'"
                    :disabled="_stateLoading"
                    v-model="form.password"
                    prepend-icon="mdi-lock"
                    autocomplete="true"
                    label="Contraseña"
                    color="primary"
                    ref="password"
                    id="password"
                    maxlength="8"
                    outlined
                    shaped
                    dense
                  />
                </v-col>
                <v-col cols="12">
                  <v-row justify="center">
                    <h5 class="primary--text text-h7 py-1">¿No tienes una cuenta?</h5>
                    <v-btn small text class="zoomIt" color="success" @click="registro()">crear cuenta</v-btn>
                  </v-row>
                </v-col>
                <v-col cols="12" lg="9" md="9" sm="9" class="text-center">
                  <v-hover v-slot="{ hover }" open-delay="50">
                    <v-btn
                      class="mx-auto mt-0 mb-4 py-0 botone"
                      :elevation="hover ? 12 : 0"
                      :disabled="_stateLoading"
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
    <ALERT @cancelAlert="cancelAlert()" @confirm="confirm()" @exitEsc="cancel()" @cancel="cancel()" v-if="alert.state" :alert="alert"></ALERT>
  </v-card>
</template>

<script>
import { controller } from "@/mixins/controler";
import { mapActions, mapGetters } from "vuex";
import LottieAnimation from "lottie-web-vue";
import { Alert } from "@/mixins/alert";

export default {
  name: "Login",
  components: {
    LottieAnimation,
  },
  mixins: [Alert, controller],
  data: () => ({
    form: {
      user: "",
      password: "",
    },
    change: "",
    loader: null,
    showPassword: false,
  }),
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
    cancelAlert() {
      this.deletAlert();
      setTimeout(() => {
        this.$refs.user.focus();
      }, 100);
    },
    cancel() {
      this.deletAlert();
      setTimeout(() => {
        this.$refs.user.focus();
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
      const DATA = this.form;

      if (!DATA.user) return this.sendAlert("user_0", "info");
      try {
        const RES = await this._loginUser(DATA);
      } catch (error) {
        console.error("LOGIN", error);
      }
    },
    eonia() {
      window.open("http://www.eonia.com.co");
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
