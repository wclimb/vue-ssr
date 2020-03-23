function getTitle(vm) {
  let title = vm.$options.title;
  if (title) {
    return typeof title === "function" ? title.call(vm) : title;
  }
}

const server = {
  created() {
    const title = getTitle(this);
    if (title) {
      this.$ssrContext.title = `${title}`;
    }
  }
};
const client = {
  beforeMount() {
    const title = getTitle(this);
    if (title) {
      document.title = title;
    }
  }
};
export default process.env.VUE_ENV === "server" ? server : client;
