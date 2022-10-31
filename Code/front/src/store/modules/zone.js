import postData from "@/axios";
import { NEKOT } from "@/global";

export default {
  namespaced: true,
  state: {
    get_zones: null,
  },
  getters: {
    getZoneData_: (state) => (list) => state[list],
  },
  mutations: {
    setZoneData_(state, data) {
      state[data.list] = data.res;
    },
  },
  actions: {
    async postZone_({ commit }, { data }) {
      try {
        const RES = await postData({ header: { x_token: NEKOT }, method: "POST", url: `zone`, data });
        return RES;
      } catch (error) {
        console.error("postZone_", error);
      }
    },
    async postPoint_({ commit }, { zone, data }) {
      try {
        const RES = await postData({ header: { x_token: NEKOT }, method: "PUT", url: `point/${zone}`, data });
        return RES;
      } catch (error) {
        console.error("postPoint_", error);
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
    async getZones_({ commit }) {
      try {
        const RES = await postData({ header: { x_token: NEKOT }, method: "GET", url: `zone` });
        if (!RES.msg) {
          return commit("setZoneData_", {
            list: "get_zones",
            res: RES,
          });
        }
        return RES;
      } catch (error) {
        console.error("getZones_", error);
      }
    },
    async putZone_({ commit }, { USER, password, data }) {
      try {
        const RES = await postData({
          url: `users/${USER}/${password}`,
          header: { x_token: NEKOT },
          method: "PUT",
          data: data,
        });
        if (!RES.msg) {
          commit("setZoneData_", {
            list: "get_zones",
            res: RES,
          });
        }
        return RES;
      } catch (error) {
        console.error("putZone_", error);
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
