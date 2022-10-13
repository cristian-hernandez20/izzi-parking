<template>
  <v-row id="spi" class="sticky" overlay v-if="_stateLoading" justify="center" align="center">
    <v-col cols="12" lg="6" sm="6" md="6" class="py-0 my-0">
      <lottie-animation
        :animationData="require('@/assets/image/loader.json')"
        class="mx-auto zoomIt"
        style="height: 400px"
        :autoPlay="true"
        ref="anim_login"
        id="anim_login"
        :loop="true"
        :speed="2"
        content
      />
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex";
import LottieAnimation from "lottie-web-vue";
export default {
  components: {
    LottieAnimation,
  },
  data: () => ({}),
  computed: {
    ...mapGetters({
      _stateLoading: "_stateLoading",
    }),
  },
};
</script>

<style scoped>
#spi {
  width: 100%;
  height: 100%;
  margin: auto;
  position: absolute;
  z-index: 100 !important;
  backdrop-filter: blur(5px);
}
.sticky {
  position: sticky;
  top: 0px;
  z-index: 1;
}
</style>
