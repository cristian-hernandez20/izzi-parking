import Vuex from "vuex";
import Vue from "vue";

Vue.use(Vuex);

import parking from "./modules/parking";
import reserva from "./modules/reserva";
import sesion from "./modules/sesion";
import record from "./modules/record";
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
    parking,
    reserva,
    record,
    sesion,
    zone,
    user,
  },
});
