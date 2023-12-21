<template>
  <q-card class="justify-center">
    <q-card-section>
      <q-form ref="myForm" @submit="onSubmit" class="q-gutter-md">
        <div style="text-align: center">
          <q-chip color="blue-8" text-color="white" icon="private_connectivity"
            ><b>{{ secret.vault.toUpperCase() }}</b></q-chip
          >
        </div>
        <q-input readonly dense v-model="secret.name" label="Identifier name" />
        <q-input
          dense
          v-model="secret.username"
          label="Username"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Required.']"
        >
          <template v-slot:append>
            <q-btn round dense flat icon="content_copy" />
          </template>
        </q-input>
        <q-input
          dense
          v-model="secret.content"
          label="Password"
          type="password"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Required.']"
        >
          <template v-slot:prepend>
            <q-icon dense name="visibility_off" />
          </template>
          <template v-slot:append>
            <q-btn round dense flat icon="content_copy" />
          </template>
        </q-input>
        <q-input
          dense
          v-model="secret.website"
          label="Web site"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Required.']"
        >
          <template v-slot:append>
            <q-btn round dense flat icon="language" />
            <q-btn round dense flat icon="content_copy" />
          </template>
        </q-input>

        <div style="text-align: center">
          <q-btn
            style="width: 80%"
            label="Update information"
            type="submit"
            color="primary"
          />
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { ref, toRefs } from "vue";
import { useSecretStore } from "src/stores/secrets";
import mixin from "../mixins/mixin";
const { showLoading, hideLoading, showNoty } = mixin();
const myForm: any = ref(null);
const props = defineProps(["secret"]);
const s = useSecretStore();
const { secret } = toRefs(props);
const onSubmit = () => {
  myForm.value.validate().then((success: any) => {
    if (success) {
      showLoading("Updating parameter...");
      s.updateSecret()
        .then((response) => {
          hideLoading();
          showNoty("success", "The parameter was updated success.");
        })
        .catch((e) => {
          hideLoading();
        });
    } else {
      // oh no, user has filled in
      // at least one invalid value
    }
  });
};
</script>
