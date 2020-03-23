import Vue from "vue";
import { createApp } from "./app";
import ProgressBar from "./components/ProgressBar.vue";
const { app, router, store, event } = createApp();

// global progress bar
const bar = (Vue.prototype.$bar = new Vue(ProgressBar).$mount());
document.body.appendChild(bar.$el);

Vue.mixin({
  beforeRouteUpdate(to, from, next) {
    const { asyncData } = this.$options;
    if (asyncData) {
      asyncData({
        store: this.$store,
        route: to,
        event
      })
        .then(next)
        .catch(next);
    } else {
      next();
    }
  }
});

if (window.__INITIAL_STATE__) {
  console.log(event._data, window.__INITIAL_STATE__);
  store.replaceState(window.__INITIAL_STATE__);
  // event._data = window.__INITIAL_STATE__;
}

router.onReady(() => {
  router.beforeResolve((to, from, next) => {
    const matched = router.getMatchedComponents(to);
    const prevMatched = router.getMatchedComponents(from);
    let diffed = false;
    const activated = matched.filter((c, i) => {
      return diffed || (diffed = prevMatched[i] !== c);
    });
    const asyncDataHooks = activated.map(c => c.asyncData).filter(_ => _);
    if (!asyncDataHooks.length) {
      return next();
    }

    bar.start();
    Promise.all(asyncDataHooks.map(hook => hook({ store, route: to, event })))
      .then(() => {
        bar.finish();
        next();
      })
      .catch(next);
  });

  // actually mount to DOM
  app.$mount("#app");
});

// service worker
if ("https:" === location.protocol && navigator.serviceWorker) {
  navigator.serviceWorker.register("/service-worker.js");
}
