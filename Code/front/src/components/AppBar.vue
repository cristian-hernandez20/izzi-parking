<template>
  <div>
    <v-app-bar app color="primary">
      <v-spacer></v-spacer>
      <div>
        <lottie-animation
          :animationData="require('@/assets/image/parking-header.json')"
          class="mx-auto mr-2 botone"
          style="height: 50px"
          :autoPlay="true"
          :loop="true"
          :speed="1"
          content
        />
      </div>
      <h3 @click="$router.push({ path: '/main' })" class="white--text text-title cursor">IZZI PARKING</h3>
      <v-spacer></v-spacer>
      <v-menu :close-on-content-click="false" transition="fab-transition" origin="top right" :nudge-width="200">
        <template v-slot:activator="{ on, attrs }">
          <v-icon size="15" color="white" class="botone">mdi-menu-down</v-icon>
          <v-hover v-slot="{ hover }" open-delay="60">
            <v-avatar :elevation="hover ? 24 : 0" class="py-0 mt-1 botone" v-bind="attrs" color="white" v-on="on" size="30">
              <span class="primary--text text-h7">
                {{ `${current_user.name.slice(0, 1)}${current_user.last_name.slice(0, 1)} ` }}
              </span>
            </v-avatar>
          </v-hover>
        </template>
        <v-card style="z-index: 101 !important">
          <v-list>
            <v-list-item>
              <v-list-item-avatar size="40" color="primary" class="botone">
                <span class="white--text mx-auto">
                  {{ `${current_user.name.slice(0, 1)}${current_user.last_name.slice(0, 1)} ` }}
                </span>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-subtitle class="text-title">
                  <v-chip v-if="['ADMIN', 'SP'].includes(current_user.level_user)" color="secondary">
                    ADMINISTRADOR
                    <v-icon color="white" small class="botone ml-2"> mdi-shield-account </v-icon>
                  </v-chip>
                  <v-chip v-else color="primary">
                    USUARIO
                    <v-icon color="white" small class="botone ml-2"> mdi-account-badge </v-icon>
                  </v-chip>
                </v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action class="botone">
                <v-btn small :class="current_user.level_user == 'ADMIN' ? 'green--text' : 'primary--text'" @click="fav = !fav" icon>
                  <v-icon> mdi-circle </v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item class="py-0" style="min-height: 35px">
              <v-list-item-title class="py-0 text-md-h7 primary--text text-title"> {{ date.time }}, {{ date.fech }} </v-list-item-title>
            </v-list-item>
            <v-list-item class="ml-0 primary--text">
              <v-list-item-title class="text-title">
                {{ current_user.name }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
          <v-divider></v-divider>
          <v-list>
            <v-list-item>
              <v-hover v-slot="{ hover }" open-delay="60">
                <v-btn
                  :color="hover ? 'accent' : 'primary'"
                  :class="hover ? `botone ` : null"
                  :elevation="hover ? 24 : 0"
                  class="mr-2 boton botone"
                  to="config-user"
                  rounded
                  block
                  dark
                >
                  Configurar cuenta
                  <v-icon class="ml-2" color="white" size="20" dark> mdi-account-cog </v-icon>
                </v-btn>
              </v-hover>
            </v-list-item>
            <v-list-item>
              <v-hover v-slot="{ hover }" open-delay="60">
                <v-btn
                  :color="hover ? 'error' : 'primary'"
                  :class="hover ? `botone ` : null"
                  :elevation="hover ? 24 : 0"
                  class="mr-2 boton botone"
                  @click="validExit()"
                  rounded
                  block
                  dark
                >
                  Cerrar sesión
                  <v-icon class="ml-2" color="white" size="30"> mdi-exit-to-app </v-icon>
                </v-btn>
              </v-hover>
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>
    </v-app-bar>
    <ALERT @cancelAlert="cancelAlert()" @confirm="confirm()" @exitEsc="cancel()" @cancel="cancel()" v-if="alert.state" :alert="alert"></ALERT>
  </div>
</template>
<script>
import LottieAnimation from "lottie-web-vue";
import { current_user } from "@/global";
import { Alert } from "@/mixins/alert";
import { mapMutations } from "vuex";
import moment from "moment";
export default {
  components: {
    LottieAnimation,
  },
  mixins: [Alert],
  name: "AppBar",
  data() {
    return {
      current_user: current_user,
      menu_opcion: true,
      drawer: true,
      menu: false,
    };
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
  },
  methods: {
    ...mapMutations({ singOut_: "sesion/singOut_" }),
    validExit() {
      this.sendAlert("out_0", "warning", null, "p");
    },
    cancelAlert() {
      this.deletAlert();
    },
    cancel() {
      this.deletAlert();
    },
    confirm() {
      this.singOut_();
    },
    hideNav() {
      this.$emit("toggleNav", (this.drawer = !this.drawer));
    },
  },
  created() {
    if (this.$route.name && this.$route.name == "dashboard_admin") this.menu_opcion = false;
  },
};
</script>
<style scoped>
.sticky {
  position: sticky;
  top: 0px;
  z-index: 1;
}
.boton {
  transition: 300ms;
}
.btne {
  transition: 2000ms;
}
</style>
