<template>
  <q-page class="q-pa-sm items-center">
    <q-btn
      @click="$router.push('/users/create')"
      color="primary"
      label="Add new item"
      no-caps
      icon="add"
      push
      class="q-ml-sm"
    />
    <div class="row justify-between">
      <div class="col-sm-7">
        <SecretsList
          @onItemSelect="(s) => secrets.setSecret(s)"
          v-model:items="secrets.secrets"
        ></SecretsList>
      </div>
      <div class="col-sm-5">
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
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from "vue";
import SecretsList from "src/components/SecretsList.vue";
import SecretsDetail from "src/components/SecretsDetail.vue";
import { useSecretStore } from "src/stores/secrets";
const secrets = useSecretStore();
</script>
