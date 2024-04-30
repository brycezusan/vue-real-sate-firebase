<script setup>
import { useProperties } from "@/composables/useProperties";

const { propertiesCollection, formatCurrency , deleteItem } = useProperties();
</script>

<template>
  <div class="my-10 d-flex justify-end">
    <v-btn color="blue" :to="{ name: 'new-property' }"> Nueva Propiedad </v-btn>
  </div>
  <div flat class="mx-auto w-100 grilla pb-16">
    <v-list-item
      v-for="propiedad in propertiesCollection"
      :key="propiedad.id"
      border
    >
      <template v-slot:prepend>
        <v-list-item-media start>
          <img width="220" :src="propiedad?.imagen" />
        </v-list-item-media>
      </template>
      <v-list-item-title class="font-weight-bold text-h6">{{
        propiedad.title
      }}</v-list-item-title>
      <v-list-item-title
        class="font-weight-medium text-body text-grey-darken-1"
        >{{ formatCurrency(propiedad?.price) }}</v-list-item-title
      >

      <template v-slot:append>
        <div class="d-flex flex-md-column ga-4">
          <v-btn
            :to="{ name: 'edit-property', params: { id: propiedad.id } }"
            color="info"
            flat
            >Editar</v-btn
          >
          <v-btn @click="deleteItem(propiedad.id , propiedad.imagen)" color="error" flat
            >Eliminar</v-btn
          >
        </div>
      </template>
    </v-list-item>
  </div>
</template>

<style>
.grilla {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
  gap: 1rem;
}
</style>
