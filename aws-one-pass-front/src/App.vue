<template>
  <router-view />
</template>

<script setup lang="ts">
import { onBeforeMount, onBeforeUnmount, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "./stores/User";
import { LocalStorage, useQuasar } from "quasar";
import { Hub } from "aws-amplify/utils";
import mixin from "./mixins/mixin";
const user = useUserStore();
const route = useRoute();
const router = useRouter();
const { showLoading, hideLoading } = mixin();
const $q: any = useQuasar();

watch(user, (val) => {
  if (val.$state.token) {
    hideLoading();
    router.push("/");
  }
});

onBeforeMount(async () => {
  Hub.listen("auth", ({ payload }) => {
    console.log("PAYLOAD::::", payload);
    switch (payload.event) {
      case "signedIn":
        console.log("user have been signedIn successfully.");
        user.currentSession();
        break;
      case "signedOut":
        console.log("user have been signedOut successfully.");
        if (!$q.platform.is.bex) {
          window.location.reload();
        }
        break;
      case "tokenRefresh":
        console.log("auth tokens have been refreshed.");
        break;
      case "tokenRefresh_failure":
        console.log("failure while refreshing auth tokens.");
        break;
      case "signInWithRedirect":
        console.log("signInWithRedirect API has successfully been resolved.");
        break;
      case "signInWithRedirect_failure":
        console.log("failure while trying to resolve signInWithRedirect API.");
        break;
      case "customOAuthState":
        console.log("custom state returned from CognitoHosted UI");
        break;
    }
  });

  if (!$q.platform.is.bex) {
    showLoading("Loading information...");
    const token: any = LocalStorage.getItem("token");
    if (token) {
      user.setToken(token);
      return;
    }
    const urlSigIn = `${process.env.COGNITO_URL}/oauth2/authorize?response_type=code&client_id=${process.env.COGNITO_CLIENT_ID}&redirect_uri=${process.env.BASE_URL}`;
    if ($q.platform.is.bex) {
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
