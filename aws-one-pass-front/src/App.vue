<template>
  <router-view />
</template>

<script setup lang="ts">
import { onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "./stores/User";
import { LocalStorage, Platform, useQuasar } from "quasar";
import mixin from "./mixins/mixin";
const user = useUserStore();
const route = useRoute();
const router = useRouter();
const { showLoading, hideLoading } = mixin();
const $q: any = useQuasar();

watch(user, (val) => {
  if (val.$state.token) {
    hideLoading();
  }
});

onMounted(async () => {
  if ($q.platform.is.bex) {
    console.log("BEX::::", $q.bex);
    router.push("/login");
  } else {
    showLoading("Loading information...");
    const token = LocalStorage.getItem("token");
    if (token) {
      user.setToken(token);
      return;
    }
    const urlSigIn = `${process.env.COGNITO_URL}/oauth2/authorize?response_type=code&client_id=${process.env.COGNITO_CLIENT_ID}&redirect_uri=${process.env.BASE_URL}`;
    if ($q.platform.is.bex) {
      document.body.style.width = "700px";
      if (!token) {
        window.open(urlSigIn);
      }
    } else {
      const queryParams = new URLSearchParams(window.location.search);
      if (queryParams.get("code")) {
        user.setAccessCode(queryParams.get("code"));
        router.replace("/");
      } else {
        window.location.replace(urlSigIn);
      }
    }
  }
});
</script>
