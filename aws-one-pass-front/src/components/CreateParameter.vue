<template>
  <q-dialog
    v-model="general.openCreateModal"
    @before-hide="() => (parameter = resetValues())"
  >
    <q-card class="justify-center" style="width: 700px; max-width: 80vw">
      <q-card-section>
        <q-form ref="myForm" @submit="onSubmit" class="q-gutter-md">
          <q-select
            ref="vaultSelect"
            v-model="parameter.vault"
            use-input
            input-debounce="0"
            :options="vaults"
            @filter="filterVaults"
            lazy-rules
            new-value-mode="add"
            :rules="[(val) => (val && val.length > 0) || 'Required.']"
          >
            <template v-slot:no-option>
              <q-btn
                color="primary"
                no-caps
                :label="`Create new vault: ${parameter.vault}`"
              />
            </template>
          </q-select>

          <q-input
            dense
            v-model="parameter.name"
            label="Name"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Required.']"
          />
          <q-input
            dense
            v-model="parameter.username"
            label="Username"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Required.']"
          >
            <template v-slot:append>
              <!-- <q-btn round dense flat icon="content_copy" /> -->
            </template>
          </q-input>
          <q-input
            dense
            v-model="parameter.content"
            label="Password"
            type="password"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Required.']"
          >
            <template v-slot:prepend>
              <q-icon dense name="visibility_off" />
            </template>
            <!-- <template v-slot:append>
              <q-btn round dense flat icon="content_copy" />
            </template> -->
          </q-input>
          <q-input
            dense
            v-model="parameter.website"
            label="Web site"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Required.',
              (val) =>
                /^(https?):\/\/[^\s/$.?#].[^\s]*$/i.test(val) ||
                'Invalid value',
            ]"
          >
            <template v-slot:append>
              <q-btn round dense flat icon="language" />
              <!-- <q-btn round dense flat icon="content_copy" /> -->
            </template>
          </q-input>

          <div style="text-align: center">
            <q-btn
              style="width: 80%"
              label="Create"
              type="submit"
              color="primary"
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useSecretStore } from "src/stores/secrets";
import { useGeneralStore } from "src/stores/general";
import mixin from "../mixins/mixin";
const { showLoading, hideLoading, showNoty } = mixin();
const myForm: any = ref(null);
const vaultSelect: any = ref(null);
const secret = useSecretStore();
const general = useGeneralStore();
const vaults = ref([]);
const resetValues = () => {
  return ref({
    type: "credentials",
    name: null,
    vault: null,
    username: null,
    content: null,
    website: null,
  });
};
const parameter: any = resetValues();
const onSubmit = () => {
  showLoading("Creating parameter...");
  myForm.value.validate().then((success: any) => {
    if (success) {
      secret
        .createSecret({
          type: parameter.value.type,
          vault: parameter.value.vault,
          name: parameter.value.name,
          username: parameter.value.username,
          content: parameter.value.content,
          website: parameter.value.website,
        })
        .then((response) => {
          hideLoading();
          showNoty("Credential created.");
          secret.getSecrets();
          general.setOpenCreateModal(false);
        })
        .catch((e) => {
          hideLoading();
          showNoty("error", e);
        });
    } else {
      // oh no, user has filled in
      // at least one invalid value
    }
  });
};

onMounted(() => {
  vaults.value = secret.vaults;
});
const filterVaults = (val: any, update: any, abort: any) => {
  update(() => {
    const needle = val.toLowerCase();
    vaults.value = secret.vaults.filter(
      (v: string) => v.toLowerCase().indexOf(needle) > -1
    );
  });
};
</script>
