import postData from "@/axios";

export default {
  namespaced: true,
  mutations: {
    singOut_() {
      sessionStorage.removeItem("auth_code");
      location.reload();
    },
  },
  actions: {
    async _loginUser({ commit }, data) {
      try {
        const { user, password } = data;
        const RES = await postData({ url: `login?user=${user}&password=${password}`, method: "GET", data });
        if (!RES.msg) {
          const BASE64 = JSON.stringify(RES);
          sessionStorage.auth_code = btoa(BASE64);
          location.reload();
        } else return RES;
      } catch (error) {
        console.error("_loginUser", error);
        return error;
      }
    },
  },
};
