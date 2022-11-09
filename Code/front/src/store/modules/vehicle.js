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
      state[data.list].push(data.data_);
    },
    popVehicle(state, data) {
      const indice = state[data.list].map((e) => e._id).indexOf(data._id);
      state[data.list].splice(indice, 1);
    },
    editVehicle(state, data) {
      const indice = state[data.list].map((e) => e._id).indexOf(data._id);
      state[data.list][indice].color = data.data_.color;
      state[data.list][indice].type = data.data_.type;
      state[data.list][indice].placa = data.data_.placa;
    },
  },
  actions: {
    async _postVehicle({ commit }, { data_ }) {
      try {
        const RES = await postData({ header: { x_token: NEKOT }, method: "POST", url: `/create&vehiculo`, data: data_ });
        if (RES?.msg?.keyPattern?.placa) return { msg: "V-001", alert: "error" };
        else if (RES?.msg) return { msg: "V-000", alert: "error" };
        else {
          commit("pushVehicle", { list: "vehicle", data_ });
          return RES;
        }
      } catch (error) {
        console.error("_postVehicle", error);
      }
    },

    async _getVehicles({ commit }) {
      try {
        const RES = await postData({ header: { x_token: NEKOT }, method: "GET", url: `get&vehiculos` });
        if (!RES.msg) {
          return commit("_setVehicleData", {
            list: "vehicle",
            res: RES,
          });
        } else return { msg: "V-003", alert: "info" };
      } catch (error) {
        console.error("_getVehicles", error);
      }
    },
    async _putVehicle({ commit }, { _id, data_ }) {
      try {
        const RES = await postData({
          url: `edit&vehiculo/${_id}`,
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
    async _deleteVehicle({ commit }, { _id }) {
      try {
        const RES = await postData({ url: `delet&vehiculo/${_id}`, header: { x_token: NEKOT }, method: "DELETE" });
        if (RES.msg) return RES.msg;
        else {
          commit("popVehicle", { list: "vehicle", _id });
          return RES;
        }
      } catch (error) {
        console.error("_deleteVehicle", error);
      }
    },
  },
};
