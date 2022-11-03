<template>
  <v-card>
    <v-img src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg" style="height: 100%">
      <v-container fluid>
        <v-row justify="center" class="pt-4 ml-16 mr-2">
          <v-col cols="12" lg="12" sm="12" md="12">
            <v-card elevation="4">
              <v-card-text class="text-title primary--text mt-0">
                <h3 class="text-start">
                  <v-icon color="primary" class="mb-1">mdi-calendar-month</v-icon>
                  Calendario > Bienvenido {{ name_complete }}
                </h3>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" lg="12" md="12" sm="12">
            <v-card elevation="4" @click="$router.push('/scan-point')">
              <v-alert border="top" colored-border type="info" elevation="4">
                <h4>Bienvenidos estamos trabajando en algunas funcionalidades</h4>
                <lottie-animation
                  :animationData="welcome"
                  class="mx-auto botone"
                  style="height: 150px"
                  ref="anim_user"
                  :autoPlay="true"
                  id="anim_user"
                  :loop="true"
                  :speed="2"
                  content
                />
              </v-alert>
            </v-card>
          </v-col>
          <v-col cols="12" sm="12" md="12" align="center">
            <v-sheet height="64">
              <v-toolbar flat>
                <v-btn outlined class="mr-4" color="grey darken-2" @click="setToday"> Hoy </v-btn>
                <v-btn fab text small color="grey darken-2" @click="prev">
                  <v-icon small> mdi-chevron-left </v-icon>
                </v-btn>
                <v-btn fab text small color="grey darken-2" @click="next">
                  <v-icon small> mdi-chevron-right </v-icon>
                </v-btn>
                <v-toolbar-title v-if="$refs.calendar">
                  {{ $refs.calendar.title }}
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-menu bottom right>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn outlined color="grey darken-2" v-bind="attrs" v-on="on">
                      <span>{{ typeToLabel[type] }}</span>
                      <v-icon right> mdi-menu-down </v-icon>
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item @click="type = 'day'">
                      <v-list-item-title>Día</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="type = 'week'">
                      <v-list-item-title>Semana</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="type = 'month'">
                      <v-list-item-title>Mes</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="type = '4day'">
                      <v-list-item-title>4 Dias</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-toolbar>
            </v-sheet>
            <v-sheet height="400">
              <v-calendar
                ref="calendar"
                v-model="focus"
                color="primary"
                :events="events"
                :event-color="getEventColor"
                :type="type"
                @click:event="showEvent"
                @click:more="viewDay"
                @click:date="viewDay"
                @change="updateRange"
              ></v-calendar>
              <v-menu v-model="selectedOpen" :close-on-content-click="false" :activator="selectedElement" offset-x>
                <v-card color="grey lighten-4" min-width="350px" flat>
                  <v-toolbar :color="selectedEvent.color" dark>
                    <v-btn icon>
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                    <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn icon>
                      <v-icon>mdi-heart</v-icon>
                    </v-btn>
                    <v-btn icon>
                      <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                  </v-toolbar>
                  <v-card-text>
                    <span v-html="selectedEvent.details"></span>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn text color="secondary" @click="selectedOpen = false"> Cancelar </v-btn>
                  </v-card-actions>
                </v-card>
              </v-menu>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-img>
    <ALERT @cancelAlert="cancelAlert()" @confirm="confirm()" @exitEsc="cancel()" @cancel="cancel()" v-if="alert.state" :alert="alert"></ALERT>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { current_user } from "@/global";
import { Alert } from "@/mixins/alert";
import moment from "moment";

export default {
  mixins: [Alert],
  data: () => ({
    object_records: {
      state: false,
    },
    focus: "",
    type: "month",
    typeToLabel: {
      month: "Mes",
      week: "Semana",
      day: "Dia",
      "4day": "4 Dias",
    },
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    events: [],
    colors: ["blue", "indigo", "deep-purple", "cyan", "green", "orange", "grey darken-1"],
    names: ["Meeting", "Holiday", "PTO", "Travel", "Event", "Birthday", "Conference", "Party"],
    name: `${current_user.name} ${current_user.last_name}`,
    zones: [],
  }),
  computed: {
    name_complete() {
      let name = this.name.split(" ");
      name = name.map((p) => p[0].toUpperCase() + p.substring(1));
      return name.join(" ");
    },
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({}),
    cancel() {
      this.deletAlert();
    },
    redirect() {
      let name = "enanohpta";
      window.open(`http://localhost:3000/login/${name}`);
    },
    fib(n) {
      if (n < 20) return 1;
      else return n - 1 + (n - 2);
    },

    viewDay({ date }) {
      this.focus = date;
      this.type = "day";
    },
    getEventColor(event) {
      return event.color;
    },
    setToday() {
      this.focus = "";
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        requestAnimationFrame(() => requestAnimationFrame(() => (this.selectedOpen = true)));
      };

      if (this.selectedOpen) {
        this.selectedOpen = false;
        requestAnimationFrame(() => requestAnimationFrame(() => open()));
      } else {
        open();
      }

      nativeEvent.stopPropagation();
    },
    updateRange({ start, end }) {
      const events = [];

      const min = new Date(`${start.date}T00:00:00`);
      const max = new Date(`${end.date}T23:59:59`);
      const days = (max.getTime() - min.getTime()) / 86400000;
      const eventCount = this.rnd(days, days + 20);

      for (let i = 0; i < eventCount; i++) {
        const allDay = this.rnd(0, 3) === 0;
        const firstTimestamp = this.rnd(min.getTime(), max.getTime());
        const first = new Date(firstTimestamp - (firstTimestamp % 900000));
        const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000;
        const second = new Date(first.getTime() + secondTimestamp);

        events.push({
          name: this.names[this.rnd(0, this.names.length - 1)],
          start: first,
          end: second,
          color: this.colors[this.rnd(0, this.colors.length - 1)],
          timed: !allDay,
        });
      }

      this.events = events;
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a;
    },
  },
  created() {
    this.$refs.calendar.checkChange();
  },
};
</script>
