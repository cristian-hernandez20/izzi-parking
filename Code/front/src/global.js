import IMask from "imask";

export function formarNumber_(val = 0, scale = 0) {
  let mask = IMask.createMask({
    mask: Number,
    scale: 0,
    thousandsSeparator: ",",
    radix: ".",
  });

  mask.resolve(val.toString());
  return `${mask.value}`;
}
export function formatDate_(fecha, id) {
  let element = document.getElementById(`${id}`);
  let maskOptions = {
    mask: "****-**-**",
  };
  let mask = IMask(element, maskOptions);
}
export function formatNum_({ val, max = 0, decimal = undefined }) {
  let v_mask;
  let comas = max < 3 ? 0 : max % 3 === 0 ? Math.trunc(max / 3) - 1 : Math.trunc(max / 3);
  let first_num = max % 3 === 0 ? 3 : max % 3;
  v_mask = Array.from({ length: max + comas }, (v, i) => {
    if (first_num !== 0 && i == first_num) return ",";
    else if (comas !== 0 && (i - first_num) % 4 === 0) return ",";
    else return "0";
  }).join("");

  if (decimal != undefined) v_mask += "." + "0".repeat(decimal);
  let mask = IMask.createMask({
    mask: v_mask,
  });
  mask.resolve(val);
  return mask.value;
}

export function formatIp_(ip) {
  let element = document.getElementById(`${ip}`);
  let maskOptions = {
    mask: "000.000.000.000",
  };
  let mask = IMask(element, maskOptions);
}
export function formatMac_() {
  let element = document.getElementById("mac");
  let maskOptions = {
    mask: "**-**-**-**-**-**",
  };
  let mask = IMask(element, maskOptions);
}
export const formatOp_ = (value) => {
  return parseFloat(value) || 0;
};
export function formatPhoneNumber_() {
  let phoneMask = IMask(document.getElementById("phone_number"), {
    mask: "+{57} (000) 0000000",
  });
  return phoneMask;
}
export function formatDocument_() {
  let numberMask = IMask(document.getElementById("document"), {
    mask: Number,
    min: -99999999999999,
    max: 99999999999999,
    // thousandsSeparator: ",",
  });
  return numberMask;
}
export function cleanForm_(cajas) {
  let objs = Object.values(cajas);
  objs.forEach((obj) => {
    obj.value = "";
    if (obj.dataCard) obj.dataCard = "";
  });
}

export function imageBase64_(url) {
  return new Promise((res) => {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      var reader = new FileReader();
      reader.onloadend = function () {
        res(reader.result);
      };
      reader.readAsDataURL(xhr.response);
    };
    xhr.open("GET", url);
    xhr.responseType = "blob";
    xhr.send();
  });
}
export function fieldToUper_(field) {
  if (field) {
    field = field.toLowerCase();
    let name = field.split(" ");
    name = name.map((p) => p && p[0].toUpperCase() + p.substring(1));
    return name.join(" ");
  }
}
const AUTH = sessionStorage.auth_code;
export let current_user = AUTH ? JSON.parse(atob(AUTH)).DATA : null;
export const NEKOT = AUTH ? JSON.parse(atob(AUTH)).TOKEN : null;
