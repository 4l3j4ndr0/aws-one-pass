<template>
  <q-layout view="lhh LpR lff" container style="height: 100vh">
    <q-drawer side="left" v-model="drawerLeft" bordered :breakpoint="500">
      <q-scroll-area class="fit">
        <div class="q-pa-sm">
          <SecretsList v-model:items="secrets.secrets"></SecretsList>
        </div>
      </q-scroll-area>
    </q-drawer>

    <q-page-container style="background-color: white">
      <q-page class="q-pa-md">
        <transition
          appear
          enter-active-class="animated bounceInUp"
          leave-active-class="animated fadeOut"
        >
          <SecretsDetail
            v-if="secrets.secret"
            :secret="secrets.secret"
          ></SecretsDetail>
        </transition>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import SecretsList from "src/components/SecretsList.vue";
import SecretsDetail from "src/components/SecretsDetail.vue";
import { useSecretStore } from "../stores/secrets";
import mixin from "../mixins/mixin";
const { showLoading, hideLoading } = mixin();
const secrets = useSecretStore();
const drawerLeft = ref(true);
onMounted(() => {
  showLoading("Loading information...");
  secrets
    .getSecrets()
    .then((response) => {
      hideLoading();
    })
    .catch((e) => {
      hideLoading();
    });
});
</script>
