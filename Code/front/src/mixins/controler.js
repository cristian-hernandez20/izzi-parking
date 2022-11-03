export const controller = {
  methods: {
    nextAction(form, record, func1, func2) {
      let keys = Object.keys(form);
      let indice = keys.lastIndexOf(record);
      switch (event.keyCode) {
        case 9:
        case 13:
          if (indice === keys.length - 1) func2;
          else if (func1 == true) {
            this.$refs[`${keys[indice + 1]}`].focus();
          }
          break;
        case 27:
          if (indice === 0) func1;
          else this.$refs[`${keys[indice - 1]}`].focus();
          break;
      }
    },
  },
};
  