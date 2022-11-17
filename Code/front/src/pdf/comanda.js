import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import moment from "moment";

export default function (items, logo) {
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
        subject: "Información de parqueo",
        keywords: "keywords for document",
      },
      pageMargins: [70, 80, 10, 10],
      header: function () {
        return {
          margin: [40, 30, 40, 0],
          stack: [
            {
              columns: [
                {
                  margin: [50, 20, 0, 0],
                  stack: [{ text: "IZZI PARKING" }],
                  fontSize: 20,
                  width: "110%",
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
      alignment: "center",
      columns: [
        {
          table: {
            bold: true,
            widths: ["68%"],
            body: [
              [
                {
                  text: `NIT:900.190.679-9 REGIMEN COMUN RES NO: 07000085880 FECHA ${moment().format(
                    "YYYY-MM-DD"
                  )},FACT IN1.35614-1000 HORARIO 24 HRS,  CLL 13 NO 1E-126 CAOBOS`,
                  alignment: "center",
                  bold: true,
                  border: [false, false, false, false],
                },
              ],
            ],
          },

          width: "110%",
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
                { text: " Fecha ingreso ", bold: true, border: [false, false, false, false] },
                { text: item.date_init, border: [false, false, false, false] },
              ],
              [
                { text: " Hora ingreso", bold: true, border: [false, false, false, false] },
                { text: item.time_init, border: [false, false, false, false] },
              ],
              [
                { text: " Fecha salida ", bold: true, border: [false, false, false, false] },
                { text: item.date_end, border: [false, false, false, false] },
              ],
              [
                { text: " Hora salida", bold: true, border: [false, false, false, false] },
                { text: item.time_end, border: [false, false, false, false] },
              ],
            ],
          },

          width: "110%",
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

          width: "110%",
        },
      ],
    },
    {
      marginTop: 15,
      columns: [
        {
          fontSize: 8,
          table: {
            widths: ["68%"],
            body: [
              [
                {
                  text: "IZZI PARKING NO SE HACE RESPONSABLE POR DAÑOS, PERDIDAS O ROBOS QUE SE EFECTÚEN DENTRO DEL ESTABLECIMIENTO CUANDO SE ESTE HACIENDO USO DE LA APLICACIÓN. ",
                  alignment: "center",
                  bold: true,
                  border: [false, false, false, false],
                },
              ],
            ],
          },

          width: "110%",
        },
        {},
      ],
    },
  ];
}
