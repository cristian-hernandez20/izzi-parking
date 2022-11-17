import pdfFonts from "pdfmake/build/vfs_fonts";
import pdfMake from "pdfmake/build/pdfmake";
import { formarNumber_ } from "../global";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import moment from "moment";

var estructure_image = (image) => {
  let format = { width: "15%", margin: [-5, 5, 0, 0] };
  if (!image) format.stack = [{ text: "" }];
  else {
    format.fit = [50, 50];
    format.image = image;
  }

  return { ...format };
};

var tableBody = (listado = []) => {
  let items_pdf = [];
  console.log(listado);

  listado.forEach((item) => items_pdf.push(format_item(item)));

  console.log("------------", items_pdf);

  return items_pdf;
};
var format_item = (item) => {
  return [
    { text: item.date_init, fontSize: 7, alignment: "center" },
    { text: item.time_init, fontSize: 7, alignment: "center" },
    { text: item.type_vehicle, fontSize: 7, alignment: "center" },
    { text: item.placa, fontSize: 7, bold: true, alignment: "left" },
    { text: item.puesto, fontSize: 7, bold: true, alignment: "center" },
    { text: item.date_end, fontSize: 7, alignment: "center" },
    { text: item.time_end, fontSize: 7, alignment: "center" },
  ];
};
export default function ({ items, header, fecha_ini, fecha_fin }) {
  console.log(header);
  return new Promise((resolve) => {
    let headers = ["Fecha inicio", "Hora ingreso", "Tipo vehículo", "Placa", "Puesto", "Fecha salida", "Hora salida"].map((el) => {
      return { text: el, fontSize: 9, bold: true, alignment: "center" };
    });
    var dd = {
      info: {
        title: "Reportes IZZI-PARKING",
        author: "Cristian",
      },
      userPassword: "IZZIPARKING",
      watermark: { text: "IZZI PARKING", color: "gray", opacity: 0.2 },
      pageMargins: [20, 95, 20, 60],
      header: function (currentPage, pageCount) {
        return [
          {
            margin: [40, 30, 40, 0],
            columns: [
              estructure_image(header.logo),
              {
                alignment: "start",
                stack: [
                  { text: header.name, bold: true, fontSize: 16 },
                  { text: "REPORTES DE INGRESOS IZZI PARKING", bold: true, fontSize: 12 },
                  {
                    text: header.author + " " + header.document,
                    bold: true,
                    fontSize: 9,
                  },
                  {
                    text: `Fecha de impresión: ${moment().format("DD/MM/YYYY")} Hora de impresión: ${moment().format("LTS")}`,
                    bold: true,
                    fontSize: 9,
                  },
                ],
              },
              {
                width: "20%",
                alignment: "right",
                stack: [{ text: `Página ${currentPage}/${pageCount}`, bold: true, fontSize: 10 }],
              },
            ],
          },
          {
            canvas: [
              {
                type: "rect",
                x: 20,
                y: -55,
                w: 555,
                h: 65,
              },
            ],
          },
        ];
      },
      content: [
        {
          style: "tableExample",
          marginTop: 25,
          fillColor: "#EEEEEF",
          table: {
            widths: ["15%", "15%", "15%", "15%", "15%", "15%", "10%"],
            body: [headers, ...tableBody(items)],
          },
          width: "100%",
        },
      ],
    };
    try {
      pdfMake.createPdf(dd).download("Reportes IZZI-PARKING");
      pdfMake.createPdf(dd).open();
    } catch (error) {
      console.error(error);
    }
    resolve(true);
  });
}
