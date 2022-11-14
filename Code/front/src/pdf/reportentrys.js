import pdfFonts from "pdfmake/build/vfs_fonts";
import pdfMake from "pdfmake/build/pdfmake";
import { formarNumber_ } from "../global";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import moment from "moment";

var estructure_image = (image) => {
  let format = { width: "15%" };
  if (!image) format.stack = [{ text: "" }];
  else {
    format.fit = [40, 40];
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
  // let bruto = formarNumber_(item.bruto);

  // bruto = bruto == "0" ? "" : bruto;
  // let neto = formarNumber_(item.neto);

  // neto = neto == "0" ? "" : neto;
  // let iva = formarNumber_(item.iva);
  // iva = iva == "0" ? "" : iva;

  return [
    { text: item.date_init, fontSize: 7, alignment: "center" },
    { text: item.time_init, fontSize: 7, alignment: "center" },
    { text: item.type_vehicle, fontSize: 7, alignment: "center" },
    { text: item.placa, fontSize: 7, bold: true, alignment: "left" },
    { text: item.puesto, fontSize: 7, bold: true, alignment: "center" },
    { text: item.fare, fontSize: 7, alignment: "center" },
  ];
};
export default function ({ items, header, fecha_ini, fecha_fin }) {
  console.log(items);
  return new Promise((resolve) => {
    let headers = ["Fecha inicio", "Hora ingreso", "Tipo vehiculo", "Placa", "Puesto", "Valor I.V.A"].map((el) => {
      return { text: el, fontSize: 9, bold: true, alignment: "center" };
    });
    var dd = {
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
                stack: [
                  { text: header.name, bold: true, fontSize: 16 },
                  { text: "MOVIMIENTO POR COMPROBANTE ROOM SERVICE", bold: true, fontSize: 12 },
                  {
                    text: `Desde:  Hasta: `,
                    bold: true,
                    fontSize: 9,
                  },
                  { text: `Fecha de impresión: ${moment().format("YYYY/MM/DD")}`, bold: true, fontSize: 9 },
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
          table: {
            widths: ["auto", "auto", "auto", "auto", "auto", "auto", "auto"],
            body: [headers, ...tableBody(items)],
          },
        },
      ],
    };
    try {
      pdfMake.createPdf(dd).open();
    } catch (error) {
      console.error(error);
    }
    resolve(true);
  });
}
