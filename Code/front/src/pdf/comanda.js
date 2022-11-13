import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import moment from "moment";

let structureImage = (image) => {
  let format = { width: "12%", margin: [-60, -30, 0, 2], alignment: "start" };
  if (!image) format.stack = [{ text: "" }];
  else {
    format.fit = [100, 100];
    format.image = image;
  }

  return { ...format };
};
let tableBody = (listado = []) => {
  let items_pdf = [];

  listado.forEach((item) => items_pdf.push(formatItem(item)));

  return items_pdf;
};
export default function (items, logo) {
  console.log(items, logo);
  return new Promise((resolve) => {
    var dd = {
      watermark: { text: "IZZI PARKING", color: "black", opacity: 0.2 },
      pageSize: {
        width: 300,
        height: 500,
      },
      info: {
        title: "Ticket",
        author: "eonia",
        subject: "Informacion de parqueo",
        keywords: "keywords for document",
      },
      pageMargins: [70, 80, 10, 10],
      header: function (currentPage, pageCount, pageSize) {
        var width_page = pageSize.width - 40;

        return {
          margin: [40, 30, 40, 0],
          stack: [
            {
              columns: [
                structureImage(logo),
                {
                  margin: [20, 20, 0, 0],
                  stack: [{ text: "IZZI PARKING" }],
                  fontSize: 20,
                  width: "100%",
                },
              ],
            },
          ],
        };
      },
      content: [
        {
          stack: [
            {
              stack: llenarFormato(items),
            },
          ],
        },
      ],
    };
    pdfMake.createPdf(dd).open();
    resolve(true);
  });
}

function llenarFormato(item) {
  return [
    {
      columns: [
        {
          table: {
            bold: true,
            widths: ["68%"],
            body: [
              [
                {
                  // text: " NIT:900.190.679-9,REGIMEN COMUN, RES NO: 07000085880, FECHA22/11-2010,FACT IN1.35614-1000 HORARIO 24 HRS,  CLL 13 NO 1E-126 CAOBOS",
                  text: `NIT:900.190.679-9,REGIMEN COMUN, RES NO: 07000085880, FECHA ${moment().format(
                    "YYYY-MM-DD"
                  )},FACT IN1.35614-1000 HORARIO 24 HRS,  CLL 13 NO 1E-126 CAOBOS`,
                  alignment: "center",
                  bold: true,
                  border: [false, false, false, false],
                },
              ],
            ],
          },

          width: "90%",
        },
        {},
      ],
    },
    {
      alignment: "center",
      marginTop: 15,
      columns: [
        {
          fontSize: 9,
          table: {
            widths: ["30%", "35%", "35%"],
            body: [
              [
                { text: "Encargado:", bold: true, border: [false, false, false, false] },

                { text: item.name, border: [false, false, false, false] },
              ],
              [
                { text: " Tiquete No:", bold: true, border: [false, false, false, false] },
                { text: item.id_ticket.slice(0, 10), border: [false, false, false, false] },
              ],
              [
                { text: " Fecha de ingreso ", bold: true, border: [false, false, false, false] },
                { text: item.date_init, border: [false, false, false, false] },
              ],
              [
                { text: " Hora de ingreso", bold: true, border: [false, false, false, false] },
                { text: item.time_init, border: [false, false, false, false] },
              ],
            ],
          },

          width: "90%",
        },
        {},
      ],
    },
    {
      alignment: "center",
      marginTop: 15,
      columns: [
        {
          fontSize: 9,
          table: {
            widths: ["30%", "35%", "35%"],
            body: [
              [
                { text: " Tipo veh:", bold: true, border: [false, false, false, false] },

                { text: item.type_vehicle, border: [false, false, false, false] },
              ],
              // [
              //   { text: " Marca:", bold: true, border: [false, false, false, false] },
              //   { text: "YAMAHA ", border: [false, false, false, false] },
              // ],
              [
                { text: "Placa", bold: true, border: [false, false, false, false] },
                { text: item.placa, border: [false, false, false, false] },
              ],
              [
                { text: " Puesto", bold: true, border: [false, false, false, false] },
                { text: item.puesto, border: [false, false, false, false] },
              ],

              [
                { text: " Tarifa hora:", bold: true, border: [false, false, false, false] },
                { text: item.fare, border: [false, false, false, false] },
              ],
            ],
          },

          width: "90%",
        },
      ],
    },
    {
      marginTop: 15,
      columns: [
        {
          fontSize: 5,
          table: {
            widths: ["68%"],
            body: [
              [
                {
                  text: " IZZI PARKING NO SE HACE RESPONSABLE POR DAÑOS O PERDIDAS CAUSADS POR MOTIN,INCENDIO,TERREMOTO,ATRACOS ETC... ",
                  alignment: "center",
                  bold: true,
                  border: [false, false, false, false],
                },
              ],
            ],
          },

          width: "90%",
        },
        {},
      ],
    },
  ];
}

function cuadroCanvasLetter(condicion) {}

function llenarDiagnosticos(col) {}
