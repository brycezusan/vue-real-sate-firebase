<script setup>
import { RouterView } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const auth = useAuthStore();
</script>

<template>
  <v-card class="mx-auto pt-10" color="white" max-width="1280" variant="flat">
    <v-layout>
      <v-app-bar
        color="teal-darken-3"
        image="https://picsum.photos/1920/1080?random"
        density="prominent"
      >
        <template v-slot:image>
          <v-img
            gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"
          ></v-img>
        </template>

        <template v-slot:prepend>
          <v-btn :to="{ name: 'home' }">Vuetify - Bienes Raices</v-btn>
        </template>
        <template v-slot:append>
          <div v-if="auth.isAuth">
            <v-btn :to="{ name: 'admin-properties' }">Admin</v-btn>
            <v-btn @click="auth.logout">Cerrar Sesión</v-btn>
          </div>
          <div v-else>
            <v-btn :to="{ name: 'home' }">Inicio</v-btn>
            <v-btn :to="{ name: 'access' }">Login</v-btn>
          </div>
        </template>
      </v-app-bar>
      <v-main>
        <v-container fluid>
          <RouterView />
        </v-container>
      </v-main>
    </v-layout>
  </v-card>
</template>

<style>
.v-toolbar__content {
  margin-inline: auto;
  max-width: 1280px;
}
</style>
