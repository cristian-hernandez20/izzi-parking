const Serialport = require("serialport").SerialPort;
const { DelimiterParser } = require("@serialport/parser-delimiter");
const axios = require("axios");

let sensores: any[] = [];

const cambiarEstadoPuesto = async (data: any) => {
  var config = {
    method: "put",
    maxBodyLength: Infinity,
    url: "http://localhost:3000/api/editar&location&estado",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };
  axios(config)
    .then((response: any) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error: any) => {
      console.log(error);
    });
};

const puerto = new Serialport({
  path: "COM7",
  baudRate: 9600,
});
const parser = puerto.pipe(new DelimiterParser({ delimiter: "\n" }));

var data = JSON.stringify({
  code: "1",
});

parser.on("open", function () {
  console.log("Conexión success");
});

parser.on("data", function (data: any) {
  var enc = new TextDecoder("utf-8");
  var arr = new Uint8Array(data);
  var ready = enc.decode(arr);
  let a = ready.split("-");

  let distancia: any;
  distancia = a[1]?.split("\r")[0];

  const name = a[0];
  let state = 0;
  if (distancia < 40) state = 1;
  else state = 0;
  const datos = {
    state,
    name,
  };

  let sensor = sensores.find((sensor) => sensor.name == datos.name);
  if (sensor == undefined) sensores.push(datos);
  else {
    let index_sensor = sensores.findIndex((sensor) => sensor.name == datos.name);
    if (datos.state != sensor.state) {
      cambiarEstadoPuesto(datos);
      sensores[index_sensor] = datos;
    }
  }
});

puerto.on("error", function (err: any) {
  console.log(err);
});
