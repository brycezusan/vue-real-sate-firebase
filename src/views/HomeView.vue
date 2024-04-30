<script setup>
import Propiedad from "@/components/Propiedad.vue";
import { useProperties } from "@/composables/useProperties";

const { piscina , propertiesCollection, formatCurrency } = useProperties();
</script>

<template>
  <h1
    class="text-h4 text-lg-h3 text-center font-weight-bold my-8 text-blue-accent-1"
  >
    Nuestras Propiedades
  </h1>

  <div class="d-flex justify-end  my-4 pr-10">
    <v-checkbox
      v-model="piscina"
    >
      Piscina
    </v-checkbox>
  </div>

  <v-card flat class="pb-16">
    <v-row>
      <Propiedad
        v-for="propiedad in propertiesCollection"
        :propiedad="propiedad"
        :key="propiedad?.id"
        :price="formatCurrency"
      />
    </v-row>
  </v-card>
</template>
