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
    async _loginUser({ commit }, { data_ }) {
      try {
        console.log(data_);
        const { email, password } = data_;
        const RES = await postData({ url: `login?user=${email}&password=${password}`, method: "GET" });
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
