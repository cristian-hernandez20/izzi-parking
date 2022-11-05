import postData from "@/axios";
import { NEKOT } from "@/global";

export default {
  namespaced: true,
  state: {
    zone_car: null,
    zone_motorcycle: null,
    botones: [
      {
        id: "2",
        text: "hello",
      },
    ],
  },
  getters: {
    getZone: (state) => (list) => state[list],
  },
  mutations: {
    setZoneData_(state, data) {
      state[data.list] = data.res;
    },
    pushZone(state, data) {
      state[data.list].push(data.data);
    },
    editZone(state, data) {
      const indice = state[data.list].map((e) => e._id).indexOf(data._id);
      state[data.list][indice].state = data.data_.state;
    },
  },
  actions: {
    async _postZone({ commit }, { data }) {
      try {
        const RES = await postData({ header: { x_token: NEKOT }, method: "POST", url: `add&location`, data });
        if (RES?.msg?.keyPattern?.name) return { msg: "Z-001" };
        else if (RES?.msg) return { msg: "Z-000" };
        else {
          commit("pushZone", { list: "zone_car", data });
          return RES;
        }
      } catch (error) {
        console.error("_postZone", error);
      }
    },
    async deletePoint_({ commit }, { id_point, id }) {
      try {
        const RES = await postData({
          url: `point/${id}/${id_point}`,
          header: { x_token: NEKOT },
          method: "DELETE",
        });
        return RES;
      } catch (error) {
        console.error("deletePoint_", error);
      }
    },
    async _getZones({ commit }) {
      try {
        const RES = await postData({ header: { x_token: NEKOT }, method: "GET", url: `get&locations` });
        console.log(RES);
        if (!RES.msg) {
          return commit("setZoneData_", {
            list: "zone_car",
            res: RES,
          });
        } else return { msg: "Z-003", alert: "info" };
      } catch (error) {
        console.error("_getZones", error);
      }
    },
    async _putZone({ commit }, { _id, data_ }) {
      try {
        const RES = await postData({
          url: `editar&location/${_id}`,
          header: { x_token: NEKOT },
          method: "PUT",
          data: data_,
        });
        if (RES.msg) return RES.msg;
        else {
          commit("editZone", { list: "zone_car", data_, _id });
          return RES;
        }
      } catch (error) {
        console.error("_putZone", error);
      }
    },
    async deleteZone_({ commit }, { zone }) {
      try {
        const RES = await postData({ url: `zone/${zone}`, header: { x_token: NEKOT }, method: "DELETE" });
        return RES;
      } catch (error) {
        console.error("deleteZone_", error);
      }
    },
  },
};
