<template>
  <div>
    12
    {{ c }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      c: 122
    };
  },
  title: 'test',
  asyncData({ store }) {},
  beforeMount() {
    console.log('beforeMount');
  }
};
</script>

<style >
</style>