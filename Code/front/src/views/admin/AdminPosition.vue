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
                  <v-btn
                    elevation="0"
                    color="primary"
                    class="botone"
                    dark
                    @click="createZone()"
                    large
                    >Crear</v-btn
                  >
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
                <v-card
                  class="ma-2 text-title"
                  dark
                  width="80"
                  color="green"
                  label
                  text-color="white"
                >
                  <v-icon left> mdi-checkbox-multiple-marked-circle </v-icon>
                  Libre
                </v-card>
              </v-col>
              <v-col cols="2" lg="2" sm="2" md="2">
                <v-card
                  class="ma-2 text-title"
                  dark
                  width="120"
                  close
                  color="red"
                  label
                  text-color="white"
                >
                  <v-icon left> mdi-close-octagon </v-icon>
                  Ocupado
                </v-card>
              </v-col>
              <v-col cols="2" lg="2" sm="2" md="2">
                <v-card
                  class="ma-2 text-title"
                  dark
                  width="130"
                  color="orange"
                  label
                  text-color="white"
                >
                  <v-icon left> mdi-gesture-spread </v-icon>
                  Reservado
                </v-card>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <v-row>
          <v-col cols="12" sm="12" v-for="(indice, i) in getVehicle('vehicle')" :key="i">
            <v-card elevation="24" color="primary" dark class="mx-auto ma-4" width="300">
              <h3 class="white--text text-center text-md-h5 ma-1 text-caption zoomIt">
                {{ indice.type }}
              </h3>
            </v-card>
            <v-card elevation="24" class="mx-auto">
              <v-list flat transition="fab-transition">
                <v-list-item-group shaped>
                  <v-row justify="space-around" class="ma-5">
                    <v-list rounded flat transition="scale-transition">
                      <v-list-item-group>
                        <v-row justify="space-around">
                          <v-menu
                            v-for="(item, i) in getZone('zone').filter(
                              (e) => e.type == indice.type
                            )"
                            :key="i"
                            offset-y
                          >
                            <template v-slot:activator="{}">
                              <v-hover v-slot="{ hover }" open-delay="10">
                                <v-card
                                  :elevation="hover ? 24 : 0"
                                  @click="editZone(item)"
                                  style="margin: 2px"
                                  color="white"
                                  height="47"
                                  width="92"
                                  outline
                                  shaped
                                >
                                  <v-divider></v-divider>
                                  <v-btn
                                    :color="
                                      item.state == 0 ? 'green' : item.state == 1 ? 'red' : 'orange'
                                    "
                                    class="mx-4 my-2 zoomIt"
                                    width="20"
                                    text
                                  >
                                    <v-icon>{{ selectIcon(item) }} </v-icon>
                                    <h4>-{{ item.name }}</h4>
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
    <ALERT
      v-if="alert.state"
      :alert="alert"
      @exitEsc="cancel()"
      @cancel="cancel()"
      @confirm="confirm()"
    ></ALERT>
    <ZoneEdit v-if="zone.state_dialog" :zone="zone"></ZoneEdit>
  </v-app>
</template>
<script>
import ZoneEdit from "../../components/zone/ZoneEdit.vue";
import { INPUT, AUTOCOMPLETE } from "@/mixins/global";
import { mapActions, mapGetters } from "vuex";
import { Alert } from "@/mixins/alert";

export default {
  mixins: [INPUT, AUTOCOMPLETE, Alert],
  components: {
    ZoneEdit,
  },
  data() {
    return {
      validate: false,
      zone: {
        state_dialog: false,
        name: "",
        type: "",
        state: "",
        _id: "",
      },
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
          item_value: "type",
          item_text: "type",
          items: [
            // { id: "0", text: "Moto" },
            // { id: "1", text: "Carro" },
          ],
          rules: [(v) => !!v || "Dato obligatorio"],
        },
      },
      dialog: false,
      dialogDelete: false,
      selectedItem: 0,
      search: "",

      term: "",
    };
  },
  async created() {
    await this._loadStation();
    await this._getZones();
    await this._getVehicles();
    this.form.type.items = this.getVehicle("vehicle");
    console.log(this.getZone("zone"));
  },
  mounted() {},
  computed: {
    ...mapGetters({
      _getStation: "parking/_getStation",
      getZone: "zone/getZone",
      getVehicle: "vehicle/getVehicle",
    }),
  },
  watch: {},
  methods: {
    ...mapActions({
      _getVehicles: "vehicle/_getVehicles",
      _loadStation: "parking/_loadStation",
      _postZone: "zone/_postZone",
      _getZones: "zone/_getZones",
      boton_: "zone/boton",
    }),
    selectIcon(item) {
      switch (true) {
        case item.type == "MOTO":
          return "mdi-atv";
        case item.type == "CARRO":
        case item.type == "AUTOMOVIL":
          return "mdi-car-back";
        default:
          return "mdi-car-back";
      }
    },

    cancel() {
      this.deletAlert();
    },
    editZone(item) {
      console.log(item);
      this.zone.state_dialog = true;
      this.zone.name = item.name;
      this.zone.type = item.type;
      this.zone.state = item.state;
      this.zone._id = item._id;
    },
    async createZone() {
      const data = {
        type: this.form.type.value,
        name: this.form.name.value,
        state: "0",
      };
      const RES = this.validate && (await this._postZone({ data }));
      if (RES.S) {
        this.sendAlert(RES.S, RES.alert);
        this.$refs.form.reset();
      }

      RES.msg && this.sendAlert(RES.msg, "error");
    },
  },
};
</script>
