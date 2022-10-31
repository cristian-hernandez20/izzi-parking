import postData from "@/axios";
import { NEKOT } from "@/global";

export default {
  namespaced: true,
  state: {
    get_records: null,
  },
  getters: {
    getRecordsData_: (state) => (list) => state[list],
  },
  mutations: {
    setRecordsData_(state, data) {
      state[data.list] = data.res;
    },
  },
  actions: {
    async postRecord_({ commit }, { DATA }) {
      try {
        const RES = await postData({ header: { x_token: NEKOT }, method: "POST", url: `record`, data: DATA });
        return RES;
      } catch (error) {
        console.error("postRecord_", error);
      }
    },
    async getRecord_({ commit }, { record }) {
      try {
        const RES = await postData({ header: { x_token: NEKOT }, method: "GET", url: `record/${record}` });
        return RES;
      } catch (error) {
        console.error("getRecord_", error);
      }
    },
    async recordHistory_({ commit }, { DATA }) {
      const { id_watchman, since, until, zone_id } = DATA;
      try {
        const RES = await postData({
          header: { x_token: NEKOT },
          method: "GET",
          url: `record_history/${zone_id}/${id_watchman}/${since}/${until}`,
        });
        return RES;
      } catch (error) {
        console.error("recordHistory_", error);
      }
    },
    async getRecords_({ commit }) {
      try {
        const RES = await postData({ header: { x_token: NEKOT }, method: "GET", url: `record` });
        if (!RES.msg) {
          commit("setRecordsData_", {
            list: "get_records",
            res: RES,
          });
        }
        return RES;
      } catch (error) {
        console.error("getRecords_", error);
      }
    },
  },
};
