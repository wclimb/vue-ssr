import Vue from "vue";
export default new Vue({
  data() {
    return {
      nav: []
    };
  },
  methods: {
    getNav() {
      return this.nav;
    },
    setNav(data) {
      this.nav = data;
    }
  }
});
