import Vuex from "vuex";
import Vue from "vue";

Vue.use(Vuex);

import parking from "./modules/parking";
import reserve from "./modules/reserve";
import vehicle from "./modules/vehicle";
import client from "./modules/client";
import sesion from "./modules/sesion";
import user from "./modules/user";
import zone from "./modules/zone";

export default new Vuex.Store({
  state: {
    business: {
      name: "SEGURIDAD MOSGAL S.A.S",
      nit: "NIT 900.199.958",
    },
    loading: false,
  },
  getters: {
    _stateLoading(state) {
      return state.loading;
    },
    companyName_(state) {
      return state.business;
    },
  },
  mutations: {
    loadingState_(state) {
      state.loading = !state.loading;
    },
  },
  modules: {
    vehicle,
    parking,
    reserve,
    client,
    sesion,
    zone,
    user,
  },
});
