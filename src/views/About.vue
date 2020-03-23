<template>
  <div>
    about
    <button @click="fn">12311</button>
    <ul>
      <li v-for="item in nav" :key="item">{{ item }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'item-view',
  data() {
    return {
      // list: [1]
    };
  },
  title() {
    return 'about';
  },
  computed: {
    nav() {
      return this.$store.state.nav;
    }
  },
  asyncData({ store, event }) {
    // return event.setNav([1, 2, 3,4,4]);
    return store.commit('changeNav', [3, 4, 6, 9]);
  },
  created() {
    // this.list = this.$event.nav;
  },
  beforeMount() {
    console.log('beforeMount');
    // this.nav = this.$store.state.nav;
  },
  mounted() {
    console.log('mounted1');
  },
  watch: {
    list() {
      // this;
    }
  },
  methods: {
    fn() {
      this.$store.commit('changeNav', [1, 2]);
    }
  }
};
</script>

<style >
</style>