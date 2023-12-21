<template>
  <q-layout view="lHh Lpr lFf" v-if="user.token">
    <q-header elevated>
      <q-toolbar>
        <div
          v-if="$q.screen.gt.xs"
          style="cursor: pointer"
          @click="$router.push('/')"
        >
          <img style="width: 40%" src="logo.png" />
        </div>

        <div class="row q-mr-lg" style="width: 50%">
          <q-input
            dense
            outlined
            square
            v-model="search"
            placeholder="Search"
            class="bg-white col"
          >
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>
        <q-toolbar-title></q-toolbar-title>

        <q-btn flat round dense icon="fas fa-sign-out-alt" />
      </q-toolbar>
    </q-header>

    <q-page-container class="bg-grey-2">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { debounce } from "quasar";
import EssentialLink, {
  EssentialLinkProps,
} from "components/EssentialLink.vue";
import { useUserStore } from "../stores/User";
import { useSecretStore } from "src/stores/secrets";

const user = useUserStore();
const secret = useSecretStore();
const search = ref("");
const makeRequest = () => {
  secret.getSecrets(
    search.value !== "" ? "getByFilter" : "getAll",
    search.value
  );
};
debounce(makeRequest, 1000);
watch(search, (value) => {
  makeRequest();
});
</script>
