import postData from "@/axios";
import { NEKOT } from "@/global";

export default {
  namespaced: true,
  state: {
    reservas: null,
  },
  getters: {
    getReservas: (state) => (list) => state[list],
  },
  mutations: {
    setReservas(state, data) {
      state[data.list] = data.res;
    },
  },
  actions: {
    async _addReserva({ commit }, { DATA }) {
      try {
        console.log(DATA);
        const RES = await postData({ header: { x_token: NEKOT }, method: "POST", url: `create&reserva`, data: DATA });
        console.log(RES);
        return RES;
      } catch (error) {
        console.error("_addReserva", error);
      }
    },
    async _getReserva({ commit }) {
      try {
        const RES = await postData({ header: { x_token: NEKOT }, method: "GET", url: `get&reservas` });
        return RES;
      } catch (error) {
        console.error("_getReserva", error);
      }
    },
  },
};
