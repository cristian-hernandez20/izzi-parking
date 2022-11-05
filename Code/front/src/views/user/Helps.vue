<template>
  <v-container fluid>
    <v-row justify="center" class="pt-4 ml-16 mr-2">
      <v-col cols="12" lg="12" sm="12" md="12">
          <v-card elevation="4">
            <v-card-text class="text-title primary--text mt-0">
              <h2 class="text-start">
                <v-icon color="primary" class="mb-1">mdi-video</v-icon>
                Ayuda > Video guias
              </h2>
            </v-card-text>
          </v-card>
      </v-col>
      <v-col cols="6" lg="6" sm="6" md="6" v-for=" (item , i) in data" :key="i">
        <v-card elevation="12">
          <v-card-text class="primary--text">
            <v-list>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="text-title">
                    <v-chip  color="primary">
                      {{ item.title}} 
                    </v-chip>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item class="ml-0">
                <v-list-item-title class="link"> <iframe width="500" height="250" :src="item.video" title="Cómo registrarse e iniciar sesión" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> </v-list-item-title>
              </v-list-item>
             
              <v-list-item class="ml-0">
                <v-list-item-title class="text-title">  {{item.descrip}} </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: "help",
  data() {
    return {
      data: [
        {
          title: "Guía#1:Como registrarse, e Iniciar sesión en IZZI PARKING",
          video: "https://www.youtube.com/embed/-CLCwIBzBbs",
          descrip: "Descripción:",
        },
        {
          title: "Guía#2:Como realizar reservas  en IZZI PARKING",
          video: "https://www.youtube.com/embed/-CLCwIBzBbs",
          descrip: "Descripción:",
        },
        {
          title: "Guía#3:Como configurar tu perfil en IZZI PARKING",
          video: "https://www.youtube.com/embed/-CLCwIBzBbs",
          descrip: "Descripción:",
        },
        {
          title: "Guía#4:Como visualizar puestos disponibles en IZZI PARKING",
          video: "https://www.youtube.com/embed/-CLCwIBzBbs",
          descrip: "Descripción",
        },
      ],
    };
  },
};
</script>
  