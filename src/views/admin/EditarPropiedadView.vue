<script setup>
import { watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useImage } from "@/composables/useImage";
import { useLocation } from "@/composables/useLocation";
import { useProperty } from "@/composables/useProperty";
import { EditPropertieSchema } from "@/schemas";
import { useForm, useField } from "vee-validate";

// * Leaflet
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet";

const route = useRoute();
const router = useRouter();
const { id } = route.params;

const { propiedad, updateProperty } = useProperty(id);

const { url, uploadImage, imageUrlPath } = useImage();
const { zoom, center, pin } = useLocation();

const items = [1, 2, 3, 4, 5];

const { defineField, errors, handleSubmit } = useForm({
  validationSchema: EditPropertieSchema,
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

watch(propiedad, (propiedad) => {
  pool.value.value = propiedad.pool;
  title.value = propiedad.title;
  price.value = propiedad.price;
  bedrooms.value = propiedad.bedrooms;
  bathrooms.value = propiedad.bathrooms;
  description.value = propiedad.description;
  parking.value = propiedad.parking;
  center.value = propiedad.ubicacion;
});

const onSubmit = handleSubmit(async (values) => {
  const { imagen, ...data } = values;

  if (imageUrlPath.value) {
    const propiedad = {
      ...propiedad,
      ubicacion: center.value,
      imagen: url.value,
    };
    await updateProperty(propiedad);
  } else {
    const propiedad = { ...data, ubicacion: center.value };
    await updateProperty(propiedad);
  }

  router.push({ name: "admin-properties" });
});
</script>
<template>
   
  <div class="d-flex flex-column justify-center w-75 mx-auto">
    <div class="my-10 d-flex justify-end">
      <v-btn color="blue" flat :to="{ name: 'admin-properties' }" width="200">
        Propiedades
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

            <div>
              <p class="font-weight-bold">Imagen de Propiedad:</p>
              <img
                v-if="imageUrlPath"
                class="w-50"
                :src="imageUrlPath"
                alt="imagen subida de referencia"
              />
              <img
                v-else
                class="w-50"
                :src="propiedad?.imagen"
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

        <v-textarea
          label="Descripcion"
          no-resize
          rows="3"
          v-model="description"
          v-bind="descriptionAttrs"
          :error-messages="[errors.description]"
          hide-details
        />

        <h5 class="text-h5 font-weight-bold text-center my-10">Ubicacion</h5>
        <div class="my-4" style="height: 450px">
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

        <div class="d-flex justify-center my-6 w-75 mx-auto">
          <v-btn @click="onSubmit" x-large color="warning" block
            >Agregar Propiedad</v-btn
          >
        </div>
      </v-form>
    </v-card>
  </div>
</template>
