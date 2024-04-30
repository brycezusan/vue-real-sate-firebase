<script setup>
const props = defineProps({
  propiedad: {
    type: Object,
    required: true,
  },
  price: {
    type: Function,
  },
});
</script>
<template>
  <v-col cols="12" md="6" lg="4">
    <v-card>
      <v-img :src="propiedad.imagen" height="240" cover />
      <v-card-title class="text-center">
        {{ propiedad.title }}
      </v-card-title>
      <v-card-text class="text-truncate">
        {{ propiedad.description }}
      </v-card-text>
      <v-card-text class="text-h5 font-weight-bold">
        Precio: {{ price(propiedad.price) + "0" }}
      </v-card-text>

      <template v-slot:actions>
        <v-btn
          block
          color="info"
          variant="tonal"
          :to="{ name: 'propiedad', params: { id: propiedad.id } }"
        >
          Mas Información
        </v-btn>
      </template>
    </v-card>
  </v-col>
</template>
