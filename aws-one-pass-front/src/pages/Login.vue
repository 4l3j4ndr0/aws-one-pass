<template>
  <q-layout
    :style="$q.platform.is.bex ? 'min-width: 750px; min-height: 500px' : ''"
  >
    <q-page-container>
      <q-page class="flex bg-image flex-center">
        <q-card>
          <q-card-section>
            <img src="logo.png" />
          </q-card-section>
          <q-card-section>
            <q-form class="q-gutter-md" @submit="onSubmit" ref="loginForm">
              <q-input
                v-model="username"
                label="Username"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0) || 'The username is required',
                ]"
              />

              <q-input
                type="password"
                v-model="password"
                label="Password"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Password is requiered',
                  (val) => val.length >= 8 || 'Minimum characters 8',
                ]"
              />

              <div style="text-align: center">
                <q-btn
                  style="width: 50%"
                  no-caps
                  label="Login"
                  type="submit"
                  color="primary"
                  :loading="loading"
                />
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useUserStore } from "../stores/User";

const user = useUserStore();
const loginForm: any = ref(null);
const username = ref("");
const password = ref("");
const loading = ref(false);
const onSubmit = async () => {
  loginForm.value.validate().then(async (success: any) => {
    if (success) {
      loading.value = true;
      await user.logIn(username.value, password.value);
      loading.value = false;
    }
  });
};
</script>

<style>
.bg-image {
  background-image: linear-gradient(135deg, #e09711 0%, #411329 100%);
}
</style>
