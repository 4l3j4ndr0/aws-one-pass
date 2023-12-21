<template>
  <q-page class="q-pa-sm items-center">
    <q-btn
      @click="general.setOpenCreateModal(true)"
      color="primary"
      label="Add new item"
      no-caps
      icon="add"
      push
      class="q-ml-sm"
    />
    <div class="row justify-between">
      <div class="col-sm-7">
        <SecretsList v-model:items="secrets.secrets"></SecretsList>
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
    <CreateParameter></CreateParameter>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import SecretsList from "src/components/SecretsList.vue";
import SecretsDetail from "src/components/SecretsDetail.vue";
import CreateParameter from "src/components/CreateParameter.vue";
import { useSecretStore } from "src/stores/secrets";
import mixin from "../mixins/mixin";
import { useGeneralStore } from "src/stores/general";
const { showLoading, hideLoading } = mixin();
const secrets = useSecretStore();
const general = useGeneralStore();
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
