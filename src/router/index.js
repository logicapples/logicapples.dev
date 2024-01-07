/** @format */

import { createRouter, createWebHistory } from "vue-router";
import ContentDeliveryNetworkView from "../views/ContentDeliveryNetworkView.vue";
import Home from "../components/HomeComponent.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/cdn",
      name: "cdn",
      component: ContentDeliveryNetworkView,
    },
    {
      path: "/priceGetter",
      name: "priceGetter",
      component: () => import("../views/priceGetterView.vue"),
    },
  ],
});

export default router;
