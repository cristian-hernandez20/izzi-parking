<template>
  <v-dialog v-model="chat.state" max-width="840px" max-height="500">
    <v-card>
      <v-footer class="sticky" color="primary">
        <h3 class="white--text">CHAT IZZI-PARKING</h3>
        <v-spacer></v-spacer>
        <v-btn @click="chat.state = false">salir</v-btn>
      </v-footer>
      <div>
        <iframe src="http://localhost:3001/login" height="500" containe width="840"></iframe>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    chat: Object,
  },
  data() {
    return {};
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
