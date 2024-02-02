<template>
  <q-layout
    view="lHh Lpr lFf"
    v-if="user.token"
    :style="$q.platform.is.bex ? 'min-width: 750px; min-height: 400px' : ''"
  >
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
            <template v-slot:append v-if="search && search !== ''">
              <q-icon
                style="cursor: pointer"
                name="close"
                @click="
                  () => {
                    search = '';
                  }
                "
              />
            </template>
          </q-input>
        </div>
        <q-toolbar-title></q-toolbar-title>
        <q-btn
          @click="closeSession()"
          flat
          round
          dense
          icon="fas fa-sign-out-alt"
        />
      </q-toolbar>
    </q-header>

    <q-page-container class="bg-grey-2">
      <router-view />
    </q-page-container>
    <q-inner-loading
      :showing="general.loading.active"
      :label="general.loading.message"
      label-style="font-size: 1.1em"
    />
  </q-layout>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { debounce } from "quasar";
import { useUserStore } from "../stores/User";
import { useSecretStore } from "../stores/secrets";
import { useGeneralStore } from "../stores/general";
import { useRouter } from "vue-router";
import mixin from "../mixins/mixin";
const { showLoading, hideLoading } = mixin();
const router = useRouter();
const general = useGeneralStore();
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

const closeSession = async () => {
  showLoading("Login out...");
  await user.logOut();
  hideLoading();
  router.push("/login");
};
</script>
