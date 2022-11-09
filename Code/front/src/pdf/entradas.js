var dd = {
  pageMargins: [200, 95, 20, 60],
  header: function (currentPage, pageCount, pageSize) {
    var width_page = pageSize.width - 40;

    return {
      margin: [40, 30, 40, 0],
      stack: [
        {
          columns: [
            {
              margin: [200, 20, 0, 0],
              stack: [{ text: "Izzi parking" }],
              width: "100%",
              fontSize: 30,
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
          stack: llenarFormato(),
        },
      ],
    },
  ],
};

function llenarFormato() {
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
                  text: " NIT:900.190.679-9,REGIMEN COMUN, RES NO: 07000085880, FECHA22/11-2010,FACT IN1.35614-1000 HORARIO 24 HRS,  CLL 13 NO 1E-126 CAOBOS",
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
          table: {
            widths: ["30%", "35%", "35%"],
            body: [
              [
                { text: " Cajero No:", bold: true, border: [false, false, false, false] },

                { text: "01 Alvaro", border: [false, false, false, false] },
              ],
              [
                { text: " Tiquete No:", bold: true, border: [false, false, false, false] },
                { text: "78945632454586", border: [false, false, false, false] },
              ],
              [
                { text: " Entrada ", bold: true, border: [false, false, false, false] },
                { text: "22/09/2022", border: [false, false, false, false] },
              ],
              [
                { text: " Hora", bold: true, border: [false, false, false, false] },
                { text: "10:20", border: [false, false, false, false] },
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
          table: {
            widths: ["30%", "35%", "35%"],
            body: [
              [
                { text: " Tipo veh.:", bold: true, border: [false, false, false, false] },

                { text: "MOTOS", border: [false, false, false, false] },
              ],
              [
                { text: " Marca:", bold: true, border: [false, false, false, false] },
                { text: "YAMAHA ", border: [false, false, false, false] },
              ],
              [
                { text: "Placa", bold: true, border: [false, false, false, false] },
                { text: "FJT 759", border: [false, false, false, false] },
              ],
              [
                { text: " Nombre", bold: true, border: [false, false, false, false] },
                { text: "Alvaro R.", border: [false, false, false, false] },
              ],
              [
                { text: " Cedula:", bold: true, border: [false, false, false, false] },
                { text: "412121836", border: [false, false, false, false] },
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
          table: {
            widths: ["68%"],
            body: [
              [
                {
                  text: " IZZI PARKING NO SE HACE RESPONSABLE POR DAÑOS O PERDIDAS CAUSADS POR MOTIN,INCENDIO,TERREMOTO,ATRAACOS, Y DEMAS PENDEJADAS QUE SE LE OCURRA >:v ",
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
