import { postData } from "@/axios";
import { NEKOT } from "@/global";

export default {
  namespaced: true,
  state: {
    reserve: [],
  },
  getters: {
    getReserves: (state) => (list) => state[list],
  },
  mutations: {
    setReserves(state, data) {
      state[data.list] = data.res;
    },
  },
  actions: {
    async _postReserve({ commit }, { data_ }) {
      try {
        const RES = await postData({
          header: { x_token: NEKOT },
          method: "POST",
          url: `create&reserva`,
          data: data_,
        });
        if (RES?.msg) return RES.msg;
        else return RES;
      } catch (error) {
        console.error("_postReserve", error);
      }
    },
    async _getReserves({ commit }) {
      try {
        const RES = await postData({
          header: { x_token: NEKOT },
          method: "GET",
          url: `get&reservas`,
        });
        console.log(RES);
        if (!RES.msg) {
          return commit("setReserves", {
            list: "reserve",
            res: RES,
          });
        } else RES;
      } catch (error) {
        console.error("_getReserves", error);
      }
    },
    async _getReservesId({ commit }, { _id }) {
      try {
        console.log(_id, "Este es el ID");
        const RES = await postData({
          header: { x_token: NEKOT },
          method: "GET",
          url: `get&reservas/${_id}`,
        });
        console.log(RES);

        if (!RES.msg) {
          return commit("setReserves", {
            list: "reserve",
            res: RES,
          });
        } else RES;
      } catch (error) {
        console.error("_getReserves", error);
      }
    },
  },
};
