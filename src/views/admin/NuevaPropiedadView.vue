<script setup>
import { useImage } from "@/composables/useImage";
import { useLocation } from "@/composables/useLocation";
import { useFireStore } from "@/stores/firestore";
import { NewPropertieSchema } from "@/schemas";
import { useForm, useField } from "vee-validate";
// * Leaflet
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet";

const { url, uploadImage, imageUrlPath } = useImage();
const { zoom, center, pin } = useLocation();

const store = useFireStore();
const items = [1, 2, 3, 4, 5];

const { defineField, errors, handleSubmit } = useForm({
  validationSchema: NewPropertieSchema,
});

const [title, titleAttrs] = defineField("title");
const [image, imageAttrs] = defineField("image");
const [price, priceAttrs] = defineField("price");
const [bedrooms, bedroomsAttrs] = defineField("bedrooms");
const [bathrooms, bathroomsAttrs] = defineField("bathrooms");
const [description, descriptionAttrs] = defineField("description");
const [parking, parkingAttrs] = defineField("parking");
const pool = useField("pool", null, {
  initialValue: false,
});

const onSubmit = handleSubmit((values) => {
  const data = { ...values, imagen: url.value, ubicacion: center.value };
  store.addProperty(data);
});
</script>

<template>
  <div class="d-flex flex-column justify-center w-75 mx-auto">
    <div class="my-10 d-flex justify-end">
      <v-btn color="blue" flat :to="{ name: 'admin-properties' }" width="200">
        Admin
      </v-btn>
    </div>
    <v-card
      class="mx-auto w-100"
      title="Registrar Nueva Propiedad"
      subtitle="Ingresa los datos correspondientes"
      flat
    >
      <v-form>
        <v-text-field
          label="Titulo o Nombre"
          class="my-3"
          v-model="title"
          v-bind="titleAttrs"
          :error-messages="[errors.title]"
        />
        <v-row>
          <v-col cols="12" sm="6">
            <v-file-input
              show-size
              counter
              label="Imagen de propiedad"
              v-model="image"
              v-bind="imageAttrs"
              :error-messages="[errors.image]"
              @change="uploadImage"
            />

            <div v-if="imageUrlPath">
              <p class="font-weight-bold">Imagen de Propiedad:</p>
              <img
                class="w-50"
                :src="imageUrlPath"
                alt="imagen subida de referencia"
              />
            </div>
          </v-col>
          <v-col>
            <v-text-field
              type="Number"
              label="Precio"
              prefix="$"
              v-model="price"
              v-bind="priceAttrs"
              :error-messages="[errors.price]"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="4">
            <v-select
              label="Habitaciones"
              :items="items"
              v-model="bedrooms"
              v-bind="bedroomsAttrs"
              :error-messages="[errors.bedrooms]"
            />
          </v-col>
          <v-col cols="12" sm="4">
            <v-select
              label="Baños"
              :items="items"
              v-model="bathrooms"
              v-bind="bathroomsAttrs"
              :error-messages="[errors.bathrooms]"
            />
          </v-col>
          <v-col cols="12" sm="4">
            <v-select
              label="Estacionamiento"
              :items="items"
              v-model="parking"
              v-bind="parkingAttrs"
              :error-messages="[errors.parking]"
            />
          </v-col>
        </v-row>
        <v-checkbox v-model="pool.value.value" label="piscina" color="orange" />
        <h5 class="text-h5 font-weight-bold text-center">Ubicacion</h5>
        <div class="my-8" style="height: 450px">
          <LMap
            v-model:zoom="zoom"
            :center="center"
            :use-global-leaflet="false"
          >
            <LTileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            ></LTileLayer>
            <LMarker @mouseout="pin" :lat-lng="center" draggable />
          </LMap>
        </div>

        <v-textarea
          label="Descripcion"
          no-resize
          rows="3"
          v-model="description"
          v-bind="descriptionAttrs"
          :error-messages="[errors.description]"
          hide-details
        />

        <div class="d-flex justify-center my-6 w-75 mx-auto">
          <v-btn @click="onSubmit" x-large color="warning" block
            >Agregar Propiedad</v-btn
          >
        </div>
      </v-form>
    </v-card>
  </div>
</template>
