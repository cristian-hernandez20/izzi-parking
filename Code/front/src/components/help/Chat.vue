<template>
  <v-dialog v-model="estado" max-width="840px" max-height="500">
    <v-card>
      <v-footer class="sticky" color="primary">
        <h3 class="white--text">CHAT IZZI-PARKING</h3>
        <v-spacer></v-spacer>
        <v-btn @click="estado = false">salir</v-btn>
      </v-footer>
      <div>
        <iframe src="http://localhost:3001/login" height="500" containe width="840"></iframe>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      estado: true,
    };
  },
};
</script>

<style>
.sticky {
  position: sticky;
  top: 0px;
  z-index: 1;
}
.scroll {
  overflow-x: scroll;
  overflow-y: hidden;
}
</style>
