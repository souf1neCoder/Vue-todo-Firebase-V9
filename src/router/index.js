import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Todolist from "../views/Todolist.vue";
import Sign from "../views/Sign.vue";
import { auth } from "@/firebase.js";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      requiresAuth: true,
      title:"Dodo"
    },
  },
  {
    path: "/dodolist",
    name: "Todolist",
    component: Todolist,
    meta: {
      requiresAuth: true,
      title:"Tasks"
    },
  },
  {
    path: "/auth",
    name: "Sign",
    component: Sign,
    meta:{
      title:"Authentication"
    }
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
router.beforeEach((to, from, next) => {
  if (to.path === "/auth" && auth.currentUser) {
   
      next("/");
    
    return;
  }
  if (
    to.matched.some((record) => record.meta.requiresAuth) &&
    !auth.currentUser
  ) {
    next("/auth");
    return;
  }
  document.title = `${to.meta.title}`;
  next();
});
export default router;
