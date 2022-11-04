import { default as axios } from "axios";
import index from "./store/index";

const URI = "http://localhost:3000/api/";

const axiosSc = ({ url, data = {}, method = "POST", header = {}, responseType = "json" }) => {
  return new Promise((resolve, reject) => {
    let config = {
      url: `${URI}${url}`,
      method,
      data,
      headers: {
        "content-type": "application/json",
        ...header,
      },
      responseType,
      validateStatus: function (status) {
        return status >= 200 && status < 400;
      },
    };
    index.commit("loadingState_", null, { root: true });
    axios(config)
      .then((res) => {
        resolve(res.data);
        index.commit("loadingState_", null, { root: true });
      })
      .catch((error) => {
        let response = { status: -1, message: null };
        if (error.response) {
          response.status = error.response.status;
          response.message = error.response.data;
          response.status == -1;
        } else if (response.request) {
          response.message = error.request;
          response.status == -1;
        } else {
          response.message = error.message;
          response.status == -1;
        }
        error_console("global", error);
        index.commit("loadingState_", null, { root: true });
        reject(response);
      });
  });
};
function error_console(form, error, data = null) {
  console.debug("-> Error:", form, error, data);
}
export default axiosSc;
