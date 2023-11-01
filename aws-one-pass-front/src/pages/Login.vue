<template>
    <q-layout>
      <q-page-container>
        <q-page class="flex bg-image flex-center">
          <q-card>
            <q-card-section>
                <img src="logo.png">
            </q-card-section>
            <q-card-section>
              <q-form
                class="q-gutter-md"
              >
                <!-- <q-input
                  v-model="username"
                  label="email"
                  lazy-rules
                />
  
                <q-input
                  type="password"
                  v-model="password"
                  label="Password"
                  lazy-rules
  
                /> -->
  
                <div style="text-align: center;">
                  <q-btn label="Login" to="/" type="button" color="primary"/>
                </div>
              </q-form>
            </q-card-section>
          </q-card>
        </q-page>
      </q-page-container>
    </q-layout>
  </template>
  <script setup lang="ts">
  import { ref } from 'vue';
  const username = ref(null)
  const password = ref(null)
  </script>

<style>

.bg-image {
  background-image: linear-gradient(135deg, #e09711 0%, #411329 100%);
}
</style>