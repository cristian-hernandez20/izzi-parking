import postData from "@/axios";
import { NEKOT } from "@/global";

export default {
  namespaced: true,
  state: {
    vehicle: [],
  },
  getters: {
    getVehicle: (state) => (list) => state[list],
  },
  mutations: {
    _setVehicleData(state, data) {
      state[data.list] = data.res;
    },
    pushVehicle(state, data) {
      state[data.list].push(data.data);
    },
    editVehicle(state, data) {
      const indice = state[data.list].map((e) => e._id).indexOf(data._id);
      state[data.list][indice].state = data.data_.state;
    },
  },
  actions: {
    async _postVehicle({ commit }, { data }) {
      try {
        const RES = await postData({ header: { x_token: NEKOT }, method: "POST", url: `add&location`, data });
        if (RES?.msg?.keyPattern?.name) return { msg: "Z-001" };
        else if (RES?.msg) return { msg: "Z-000" };
        else {
          commit("pushVehicle", { list: "vehicle", data });
          return RES;
        }
      } catch (error) {
        console.error("_postVehicle", error);
      }
    },

    async _getVehicles({ commit }) {
      try {
        const RES = await postData({ header: { x_token: NEKOT }, method: "GET", url: `get&vehiculos` });
        console.log(RES)
        if (!RES.msg) {
          return commit("_setVehicleData", {
            list: "vehicle",
            res: RES,
          });
        } else return { msg: "Z-003", alert: "info" };
      } catch (error) {
        console.error("_getVehicles", error);
      }
    },
    async _putVehicle({ commit }, { _id, data_ }) {
      try {
        const RES = await postData({
          url: `editar&location/${_id}`,
          header: { x_token: NEKOT },
          method: "PUT",
          data: data_,
        });
        if (RES.msg) return RES.msg;
        else {
          commit("editVehicle", { list: "vehicle", data_, _id });
          return RES;
        }
      } catch (error) {
        console.error("_putVehicle", error);
      }
    },
    async deleteVehicle_({ commit }, { vehicle }) {
      try {
        const RES = await postData({ url: `vehicle/${vehicle}`, header: { x_token: NEKOT }, method: "DELETE" });
        return RES;
      } catch (error) {
        console.error("deleteVehicle_", error);
      }
    },
  },
};
