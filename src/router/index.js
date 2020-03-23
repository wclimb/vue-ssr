import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const Test = () => import("../views/Test.vue");
const About = () => import("../views/About.vue");

export function createRouter() {
  return new Router({
    mode: "history",
    fallback: false,
    scrollBehavior: () => ({ y: 0 }),
    routes: [
      { path: "/test", component: Test },
      { path: "/about", component: About },
      { path: "/", redirect: "/test" }
    ]
  });
}
