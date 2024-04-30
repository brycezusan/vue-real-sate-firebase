import { computed, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { defineStore } from "pinia";
import { useFirebaseAuth } from "vuefire";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

export const useAuthStore = defineStore("auth", () => {

  // * imports
  const router = useRouter();
  const auth = useFirebaseAuth();

  // * States
  const authUser = ref(null);
  const errorMsg = ref("");
  const errorCodes = {
    "auth/invalid-credential": "Usuario o contraseña no valida",
  };

  
  onMounted(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        authUser.value = user;
      } else {
        // User is signed out
        console.log("no tenemos inicio de sesion");
      }
    });
  });

  // * Actions
  function iniciarSesion({ email, password }) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        errorMsg.value = "";
        // Signed in
        const user = userCredential.user;
        authUser.value = user;
        router.push({ name: "admin-properties" });
      })
      .catch((error) => {
        errorMsg.value = errorCodes[error.code];
      });
  }

  function logout() {
    signOut(auth)
      .then(() => {
        console.log("cerrando sesion");
        authUser.value = null;
        router.push({ name: "access" });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // * Getters
  const hasError = computed(() => {
    return errorMsg.value;
  });

  const isAuth = computed(() => {
    return authUser.value;
  });

  return {
    iniciarSesion,
    logout,
    errorMsg,
    hasError,
    isAuth,
  };
});
