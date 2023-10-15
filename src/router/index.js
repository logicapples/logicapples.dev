/** @format */

import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ContactView from "../views/ContactView.vue";
import ContentDeliveryNetworkView from "../views/ContentDeliveryNetworkView.vue";
import priceGetterView from "../views/priceGetterView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: ContentDeliveryNetworkView,
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/priceGetter",
      name: "priceGetter",
      component: priceGetterView,
    },
  ],
});

export default router;
