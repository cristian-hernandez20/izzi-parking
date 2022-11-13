var dd = {
  pageMargins: [20, F68, 20, 10],
  header: function (currentPage, pageCount, pageSize) {
    var width_page = pageSize.width - 40;

    return {
      margin: [20, 9, 20, 20],
      stack: [
        {
          columns: [
            {
              alignment: "center",
              fontSize: 7,
              table: {
                widths: ["12%", "66%", "9%", "13%"],
                body: [
                  [
                    { text: "sdsdsd", rowSpan: 4 },
                    { text: "IZZI PARKING", border: [false, true, false, false] },
                    { text: "Cod" },
                    { text: "F-E-O-04-F1" },
                  ],
                  [{ text: "sdsdsd" }, { text: "Parqueadero 24 horas", border: [false, false, false, false] }, { text: "VERSION" }, { text: "01" }],
                  [
                    { text: "sdsdsd" },
                    { text: "0214525145845845965", border: [false, false, false, false] },
                    { text: "fecha" },
                    { text: "15-feb-20" },
                  ],
                  [{ text: "sdsdsd" }, { text: "Encargado: Cristian david hernandez" }, { text: "PAG.1", colSpan: 2 }, {}],
                ],
              },
              width: "100%",
            },
          ],
        },

        {},
      ],
    };
  },
  footer: {
    margin: [20, -10, 20, 0],
    columns: [
      {
        text: `Hora de Entrega ${"h2:m2"}`,
        fontSize: 7,
        alignment: "right",
      },
    ],
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
    {},
    {
      columns: [
        {
          fontSize: 7,
          alignment: "center",
          table: {
            widths: ["15%", "10%", "15%", "28%", "16%", "16%"],
            body: [
              [{ text: "Hora:Ingreso/Salida", colSpan: 2 }, {}, { text: "Usuario/Cedula", colSpan: 2 }, {}, { text: "Vehiculo", colSpan: 2 }, {}],
              [{ text: "08:00am" }, { text: "14:24" }, { text: "Santiago" }, { text: "1121963487" }, { text: "Moto" }, { text: "FJT456" }],
              [{ text: "08:00am" }, { text: "14:24" }, { text: "Santiago" }, { text: "1121963487" }, { text: "Moto" }, { text: "FJT456" }],
              [{ text: "08:00am" }, { text: "14:24" }, { text: "Santiago" }, { text: "1121963487" }, { text: "Moto" }, { text: "FJT456" }],
              [{ text: "08:00am" }, { text: "14:24" }, { text: "Santiago" }, { text: "1121963487" }, { text: "Moto" }, { text: "FJT456" }],
              [{ text: "08:00am" }, { text: "14:24" }, { text: "Santiago" }, { text: "1121963487" }, { text: "Moto" }, { text: "FJT456" }],
            ],
          },
          width: "100%",
        },
      ],
    },
  ];
}

function cuadroCanvasLetter(condicion) {}

function llenarDiagnosticos(col) {}
