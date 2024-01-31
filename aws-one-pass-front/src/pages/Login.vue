<template>
  <q-layout>
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
                  to="/"
                  type="button"
                  color="primary"
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
import { Amplify } from "aws-amplify";
import { signIn, type SignInInput } from "aws-amplify/auth";
Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: "us-east-1_CrfiTvV5w",
      userPoolClientId: "3tm7me8194ksbch0u9eicai0b8",
    },
  },
});
import { ref } from "vue";
const loginForm: any = ref(null);
const username = ref(null);
const password = ref(null);

const onSubmit = () => {
  loginForm.value.validate().then((success: any) => {
    if (success) {
    }
  });
};
</script>

<style>
.bg-image {
  background-image: linear-gradient(135deg, #e09711 0%, #411329 100%);
}
</style>
