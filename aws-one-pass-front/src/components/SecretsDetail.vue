<template>
  <q-card class="justify-center">
    <q-card-section>
      <q-form ref="myForm" @submit="onSubmit" class="q-gutter-md">
        <q-btn-dropdown
          dense
          color="orange-10"
          :label="secret.vault"
          style="width: 100%"
          icon="vpn_key"
        >
          <q-list>
            <q-item
              clickable
              v-close-popup
              @click="secret.vault = item"
              v-for="item in vault.vaults"
            >
              <q-item-section>
                <q-item-label>{{ item.toUpperCase() }}</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable v-close-popup @click="onItemClick">
              <q-item-section>
                <q-item-label>ADD NEW VAULT</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
        <q-input readonly dense v-model="secret.name" label="Identifier name" />
        <q-input
          dense
          v-model="secret.username"
          label="Username"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Required.']"
        />
        <q-input
          dense
          v-model="secret.password"
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
          v-model="secret.url"
          label="Web site"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Required.']"
        >
          <template v-slot:append>
            <q-btn round dense flat icon="language" />
          </template>
        </q-input>

        <div style="text-align: center">
          <q-btn
            style="width: 80%"
            label="Save"
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
import { useVaultStore } from "../stores/vaults";
const props = defineProps(["secret"]);
const { secret } = toRefs(props);
const vault = useVaultStore();
</script>
