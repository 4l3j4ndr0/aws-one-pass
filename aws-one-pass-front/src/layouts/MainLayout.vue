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
            placeholder="Search passwords"
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
      <q-tabs align="left">
        <q-list class="row">
          <EssentialLink
            v-for="link in essentialLinks"
            :key="link.title"
            v-bind="link"
          />
        </q-list>
      </q-tabs>
    </q-header>

    <!-- <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="bg-primary text-white"
    >
      <q-list>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer> -->

    <q-page-container class="bg-grey-2">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from "vue";
import EssentialLink, {
  EssentialLinkProps,
} from "components/EssentialLink.vue";
import { useUserStore } from "../stores/User";

const user = useUserStore();
const search = ref("");

const essentialLinks: EssentialLinkProps[] = [
  {
    title: "Passwords and access",
    icon: "password",
    link: "/",
  },
  {
    title: "Manage users",
    icon: "manage_accounts",
    link: "/users",
  },
];

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
