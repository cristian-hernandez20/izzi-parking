<template>
  <v-container filled>
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
            <v-card class="ma-2 text-title" dark width="120" close color="red" label text-color="white">
              <v-icon left> mdi-close-octagon </v-icon>
              Ocupado
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
                      <v-menu v-for="(item, i) in getZone('zone').filter((e) => e.type == 1)" :key="i" offset-y>
                        <template v-slot:activator="{}">
                          <v-hover v-slot="{ hover }" open-delay="10">
                            <v-card :elevation="hover ? 24 : 0" style="margin: 2px" color="white" height="47" width="92" outline shaped>
                              <v-divider></v-divider>
                              <v-btn :color="item.state == 0 ? 'green' : item.state == 1 ? 'red' : 'orange'" class="mx-4 my-2 zoomIt" width="20" text>
                                <v-icon>mdi-car </v-icon>
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
                      <v-menu v-for="(item, i) in getZone('zone').filter((e) => e.type == 0)" :key="i" offset-y>
                        <template v-slot:activator="{}">
                          <v-hover v-slot="{ hover }" open-delay="10">
                            <v-card :elevation="hover ? 24 : 0" style="margin: 2px" color="white" height="47" width="92" outline shaped>
                              <v-divider></v-divider>
                              <v-btn :color="item.state == 0 ? 'green' : item.state == 1 ? 'red' : 'orange'" class="mx-4 my-2 zoomIt" width="20" text>
                                <v-icon>mdi-atv </v-icon>
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
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Puestos-disponibles",
  data() {
    return {};
  },
  computed: {
    ...mapGetters({ _getStation: "parking/_getStation", getZone: "zone/getZone" }),
  },
  components: {},
  mounted() {
    this._loadZones();
  },
  methods: {
    ...mapActions({
      _loadZones: "zone/_getZones",
    }),
  },
};
</script>
