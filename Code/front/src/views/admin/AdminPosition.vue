<template>
  <v-app>
    <v-container>
      <v-row justify="center" class="pt-4 ml-16 mr-2">
        <v-col cols="12" lg="12" sm="12" md="12">
          <v-card elevation="4">
            <v-card-text class="text-title primary--text mt-0">
              <h2 class="text-start">
                <v-icon color="primary" class="mb-1">mdi-car-back</v-icon>
                Administración de puestos
              </h2>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" lg="12" sm="12" md="12" class="mt-1">
          <v-card elevation="12">
            <v-card-text class="text-title primary--text mt-0">
              <h2 class="text-start">Crear puesto</h2>
            </v-card-text>
            <v-form v-model="validate" ref="form" lazy-validation>
              <v-row justify="start" class="px-5 pt-10">
                <v-col cols="12" lg="3" sm="3" md="3" class="py-0">
                  <INPUT :field="form.name" />
                </v-col>
                <v-col cols="12" lg="3" sm="3" md="3" class="py-0">
                  <AUTOCOMPLETE :field="form.type" />
                </v-col>
                <v-col cols="12" lg="3" sm="3" md="3" class="py-0">
                  <v-btn elevation="0" color="primary" class="botone" dark @click="createZone()" large>Crear</v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-card>
        </v-col>
        <v-col cols="12" lg="12" sm="12" md="12" class="mt-10">
          <v-card elevation="24">
            <v-card-text class="text-title primary--text">
              <h2 class="text-center">Puestos disponibles</h2>
            </v-card-text>
            <v-row justify="center" class="mx-1">
              <v-col cols="2" lg="2" sm="2" md="2">
                <v-card class="ma-2 text-title" dark width="80" color="green" label text-color="white">
                  <v-icon left> mdi-checkbox-multiple-marked-circle </v-icon>
                  Libre
                </v-card>
              </v-col>
              <v-col cols="2" lg="2" sm="2" md="2">
                <v-card class="ma-2 text-title" dark width="80" close color="red" label text-color="white">
                  <v-icon left> mdi-close-octagon </v-icon>
                  Uso.
                </v-card>
              </v-col>
              <v-col cols="2" lg="2" sm="2" md="2">
                <v-card class="ma-2 text-title" dark width="130" color="orange" label text-color="white">
                  <v-icon left> mdi-gesture-spread </v-icon>
                  Reservado
                </v-card>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <v-row>
          <v-col cols="12" sm="12" class="mt-10">
            <v-card elevation="24" color="primary" dark class="mx-auto ma-4" width="300">
              <h3 class="white--text text-center text-md-h5 ma-1 text-caption zoomIt">Parqueadero de carros</h3>
            </v-card>
            <v-card elevation="24" class="mx-auto">
              <v-list flat transition="fab-transition">
                <v-list-item-group shaped>
                  <v-row justify="space-around" class="ma-5">
                    <v-list rounded flat transition="scale-transition">
                      <v-list-item-group>
                        <v-row justify="space-around">
                          <v-menu v-for="(item, i) in _getStation('get_station')" :key="i" offset-y>
                            <template v-slot:activator="{}">
                              <v-hover v-slot="{ hover }" open-delay="10">
                                <v-card :elevation="hover ? 24 : 0" width="92" height="47" shaped outline style="margin: 2px" color="white">
                                  <v-divider></v-divider>
                                  <v-btn
                                    width="20"
                                    text
                                    :color="item.estado == 0 ? 'green' : item.estado == 1 ? 'red' : 'orange'"
                                    class="mx-4 my-2 zoomIt"
                                  >
                                    <v-icon>mdi-car </v-icon>
                                    <h4>-{{ item.text }}</h4>
                                  </v-btn>
                                </v-card>
                              </v-hover>
                            </template>
                          </v-menu>
                        </v-row>
                      </v-list-item-group>
                    </v-list>
                  </v-row>
                </v-list-item-group>
              </v-list>
            </v-card>
          </v-col>
          <v-col cols="12" sm="12">
            <v-card elevation="24" color="primary" dark class="mx-auto ma-4" width="300">
              <h3 class="white--text text-center text-md-h5 ma-1 text-caption zoomIt">Parqueadero de motos</h3>
            </v-card>
            <v-card elevation="24" class="mx-auto">
              <v-list flat transition="fab-transition">
                <v-list-item-group shaped>
                  <v-row justify="space-around" class="ma-5">
                    <v-list rounded flat transition="scale-transition">
                      <v-list-item-group>
                        <v-row justify="space-around">
                          <v-menu v-for="(item, i) in _getStation('get_station')" :key="i" offset-y>
                            <template v-slot:activator="{}">
                              <v-hover v-slot="{ hover }" open-delay="10">
                                <v-card :elevation="hover ? 24 : 0" width="92" height="47" shaped outline style="margin: 2px" color="white">
                                  <v-divider></v-divider>
                                  <v-btn
                                    width="20"
                                    text
                                    :color="item.estado == 0 ? 'green' : item.estado == 1 ? 'red' : 'orange'"
                                    class="mx-4 my-2 zoomIt"
                                  >
                                    <v-icon>mdi-car </v-icon>
                                    <h4>-{{ item.text }}</h4>
                                  </v-btn>
                                </v-card>
                              </v-hover>
                            </template>
                          </v-menu>
                        </v-row>
                      </v-list-item-group>
                    </v-list>
                  </v-row>
                </v-list-item-group>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </v-row>
    </v-container>
    <ALERT v-if="alert.state" :alert="alert" @exitEsc="cancel()" @cancel="cancel()" @confirm="confirm()"></ALERT>
  </v-app>
</template>
<script>
import { INPUT, AUTOCOMPLETE } from "@/mixins/global";
import { mapActions, mapGetters } from "vuex";
import { Alert } from "@/mixins/alert";
import moment from "moment";

export default {
  mixins: [INPUT, AUTOCOMPLETE, Alert],
  data() {
    return {
      validate: false,
      form: {
        name: {
          value: "".toUpperCase(),
          tipo: "name",
          id: "name",
          label: "Nombre de puesto",
          type: "name",
          maxlength: "4",
          rules: [(v) => !!v || "Nombre es requerido"],
        },
        type: {
          value: "",
          id: "type",
          label: "Tipo",
          required: true,
          item_value: "id",
          items: [
            { id: "0", text: "Moto" },
            { id: "1", text: "Carro" },
          ],
          rules: [(v) => !!v || "Dato obligatorio"],
        },
      },
      dialog: false,
      dialogDelete: false,
      selectedItem: 0,
      search: "",
      fecha_ini: false,
      fecha_fin: false,
      hora_ini: false,
      hora_fin: false,
      term: "",
    };
  },
  created() {},
  mounted() {
    this._loadStation();
  },
  computed: {
    ...mapGetters({ _getStation: "parking/_getStation" }),
  },
  watch: {},

  methods: {
    ...mapActions({
      _loadStation: "parking/_loadStation",
      _postZone: "zone/_postZone",
    }),
    cancel() {
      this.deletAlert();
    },
    async createZone() {
      const data = {
        type: this.form.type.value,
        name: this.form.name.value,
      };
      const RES = this.validate && (await this._postZone({ data }));
      if (RES.S) {
        this.sendAlert("z-s", "success");
        this.$refs.form.reset();
      }
      RES.msg && this.sendAlert(RES.msg, "error");
    },
  },
};
</script>
