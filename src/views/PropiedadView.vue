<script setup>
import { useRoute } from "vue-router";
import { useProperty } from "@/composables/useProperty";
import { useLocation } from "@/composables/useLocation";
// * Leaflet
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker, LPopup } from "@vue-leaflet/vue-leaflet";

const route = useRoute();
const { id } = route.params;
const { propiedad } = useProperty(id);
const { center, zoom } = useLocation();
</script>
<template>
  <h1 class="text-center text-h4 text-blue-accent-4 font-weight-bold">
    Detalles de propiedad
  </h1>

  <v-card flat class="card py-16 mx-lg-auto">
    <v-card-title class="text-h5 text-lg-h3 font-weight-light text-center">
      {{ propiedad?.title }}</v-card-title
    >

    <v-img :src="propiedad?.imagen" height="450" cover />
    <div
      class="bg-blue-grey-lighten-5 d-flex flex-column flex-md-row align-center"
    >
      <v-card-text class="font-weight-bold">
        Habitaciones :
        <span class="font-weight-medium">{{ propiedad?.bedrooms }}</span>
      </v-card-text>
      <v-card-text class="font-weight-bold">
        Baños :
        <span class="font-weight-medium">{{ propiedad?.bathrooms }}</span>
      </v-card-text>
      <v-card-text class="font-weight-bold">
        Estacionamientos:
        <span class="font-weight-medium"> {{ propiedad?.parking }}</span>
      </v-card-text>
      <v-card-text class="font-weight-bold">
        Piscina:
        <span class="font-weight-medium">{{
          propiedad?.pool ? "Ok" : "No"
        }}</span>
      </v-card-text>
    </div>
    <div class="text-center mt-4">
      {{ propiedad?.description }}
    </div>

    <div class="my-8" style="height: 450px">
      <LMap v-model:zoom="zoom" :center="center" :use-global-leaflet="false">
        <LMarker :lat-lng="center">
          <LPopup>
            {{ propiedad?.title }}
          </LPopup>
        </LMarker>
        <LTileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        ></LTileLayer>
      </LMap>
    </div>
  </v-card>
</template>

<style scoped>
.card {
  width: calc(100% - 10%);
  margin-inline: auto;
}
</style>
