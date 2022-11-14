<template>
  <v-container fluid>
    <v-row justify="center" class="pt-4 ml-16 mr-2">
      <v-col cols="12" lg="12" sm="12" md="12">
        <v-card elevation="4">
          <v-card-text class="text-title primary--text mt-0">
            <h2 class="text-start">
              <v-icon color="primary" class="mb-1">mdi-video</v-icon>
              Ayuda > Video guías
            </h2>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="6" lg="6" sm="6" md="6" v-for="(item, i) in data" :key="i">
        <v-card elevation="12">
          <v-card-text class="primary--text">
            <v-list>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="text-title">
                    <v-chip color="primary">
                      {{ item.title }}
                    </v-chip>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item class="ml-0">
                <v-list-item-title class="link">
                  <iframe
                    width="500"
                    height="250"
                    :src="item.video"
                    title="Cómo registrarse e iniciar sesión"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  ></iframe>
                </v-list-item-title>
              </v-list-item>

              <v-list-item class="ml-0">
                <v-list-item-title class="text-title"> {{ item.descrip }} </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
      <v-btn color="primary" fab dark  fixed bottom right @click="chat.state = true">
        <v-icon>mdi-face-agent</v-icon>
      </v-btn>
    </v-row>
    <Chat :chat="chat" v-if="chat.state" />
  </v-container>
</template>
<script>
import Chat from "../../components/help/Chat.vue";
export default {
  name: "help",
  components: {
    Chat,
  },
  data() {
    return {
      chat: {
        state: false,
      },
      data: [
        {
          title: "Guía #1: Como registrarse e Iniciar sesión en IZZI PARKING",
          video: "https://www.youtube.com/embed/_QAN0ozZlE4",
          descrip:
            "Descripción: Como primer paso se hará click en el botón de crear cuenta donde se desplegará una ventana donde se diligenciaran los datos que estén para poder así crear la cuenta y así seguir a iniciar sesión con el correo y con la contraseña asignada  ",
        },
        {
          title: "Guía #2: Como realizar reservas en IZZI PARKING",
          video: "https://www.youtube.com/embed/EWusa3CS9aM",
          descrip:
            "Descripción: Ya dentro del aplicativo nos dirigiremos a el menú lateral y le daremos click a las reservas donde tendremos que llenar unos datos. Adicional como administrador podremos visualizar las reservas en el calendario.",
        },
        {
          title: "Guía #3: Como configurar tu perfil en IZZI PARKING",
          video: "https://www.youtube.com/embed/Jum3MVMfvoM",
          descrip:
            "Descripción: Ya dentro del aplicativo nos dirigiremos a el menú lateral y le daremos click al botón de perfil y en ese apartado podremos configurar nuestro perfil y realizar cambios ",
        },
        {
          title: "Guía #4: Como visualizar puestos disponibles en IZZI PARKING",
          video: "https://www.youtube.com/embed/aLAGiwlJ30s",
          descrip:
            "Descripción: Ya dentro del aplicativo nos dirigiremos a el menú lateral y le daremos click al botón de gestión de puestos y a continuación al de puestos disponibles donde nos mostrará los apartados de los parqueaderos de carro y moto, donde se señalara que los verdes son disponibles, rojos ocupados y amarillos reservados.",
        },
      ],
    };
  },
};
</script>
