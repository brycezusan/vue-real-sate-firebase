import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { useFirebaseAuth } from "vuefire";
import { onAuthStateChanged } from "firebase/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path:"/propiedades/:id",
      name: "propiedad",
      component : ()=> import("../views/PropiedadView.vue")
    },
    {
      path: "/login",
      name: "access",
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/admin",
      name: "admin",
      component: () => import("../views/admin/AdminLayout.vue"),
      meta: { requiresAuth: true },

      children: [
        {
          path: "propiedades",
          name: "admin-properties",
          component: () => import("../views/admin/AdminView.vue"),
        },
        {
          path: "nueva-propiedad",
          name: "new-property",
          component: () => import("../views/admin/NuevaPropiedadView.vue"),
        },
        {
          path: "editar-propiedad/:id",
          name: "edit-property",
          component: () => import("../views/admin/EditarPropiedadView.vue"),
        },
      ],
    },
  ],
});

// Guard de navegacion
router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((url) => url.meta.requiresAuth);
  if (requiresAuth) {
    // ! comprobamos que el usuario se encuentre autenticado
    try {
      await authenticaUser();
      next();
    } catch (error) {
      console.log(error);
      next({ name: "access" });
    }
  } else {
    // * Mostramos la vista
    next();
  }
});

function authenticaUser() {
  const auth = useFirebaseAuth();
  return new Promise((resolve, reject) => {
    // ? forma Promise normal
    onAuthStateChanged(auth, (user) => {
      if (user) {
        resolve(user);
      } else {
        reject();
      }
    });
    // // ? forma Promise Observer
    // const unsubscribe = onAuthStateChanged(auth, (user) => {
    //   unsubscribe();
    //   if (user) {
    //     resolve(user);
    //   } else {
    //     reject();
    //   }
    // });
  });
}

export default router;
