<script setup>
import { useAuthStore } from "@/stores/auth";
/**
 * * vee-validate
 * */
import { useForm } from "vee-validate";
import { LoginSchema } from "@/schemas";

const auth = useAuthStore();

const { defineField, errors, handleSubmit } = useForm({
  validationSchema: LoginSchema,
});

const [email, emailAttrs] = defineField("email");
const [password, passwordAttrs] = defineField("password");

const onSubmit = handleSubmit((values) => {
  auth.iniciarSesion(values);
});
</script>

<template>
  <div class="d-flex justify-center py-5">
    <v-card max-width="450" class="mx-auto w-100" flat>
      <v-card-title tag="h3" class="text-h4 font-weight-bold"
        >Iniciar Sesión</v-card-title
      >
      <v-card-subtitle tag="h3" class="text-h6 font-weight-light"
        >Inicia Sesión con tu email</v-card-subtitle
      >
      <v-alert
        v-if="auth.hasError"
        class="mt-2"
        title="Error al iniciar Sesion"
        :text="auth.errorMsg"
        type="error"
      ></v-alert>

      <v-form class="mt-4">
        <v-text-field
          type="email"
          label="Email"
          bg-color="indigo-lighten-5"
          v-model="email"
          v-bind="emailAttrs"
          :error-messages="[errors.email]"
        />

        <v-text-field
          type="password"
          label="Password"
          bg-color="indigo-lighten-5"
          v-model="password"
          v-bind="passwordAttrs"
          :error-messages="[errors.password]"
          class="mt-2"
        />

        <v-btn
          class="mt-2"
          color="indigo-lighten-1"
          size="large"
          elevation="6"
          block
          @click="onSubmit"
          >Iniciar Sesión</v-btn
        >
      </v-form>
    </v-card>
  </div>
</template>
