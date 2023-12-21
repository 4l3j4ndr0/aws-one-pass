<template>
  <q-card style="cursor: pointer" class="q-ma-sm" v-for="item in props.items">
    <q-card-section
      @click="onIntemSelect(item)"
      :class="item.selected ? 'bg-grey-7 text-white' : ''"
    >
      <div style="display: inline">
        <q-chip
          size="sm"
          color="blue-8"
          text-color="white"
          icon="private_connectivity"
        >
          <b>{{ item.vault.toUpperCase() }}</b>
        </q-chip>
        {{ `${item.name} ` }}
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { ref, defineEmits, computed } from "vue";
const props = defineProps(["items"]);
const emit = defineEmits(["update:items", "onItemSelect"]);
import mixin from "../mixins/mixin";
import { useSecretStore } from "src/stores/secrets";
const { showLoading, hideLoading } = mixin();
const secrets = useSecretStore();
const onIntemSelect = (item: any) => {
  showLoading("Loading parameter.");
  secrets
    .getSecret(item.id)
    .then((response) => {
      hideLoading();
    })
    .catch((e) => {
      hideLoading();
    });

  const itemsNew = props.items.map((i: any) => {
    if (item.name !== i.name) {
      i.selected = false;
      return i;
    }
    i.selected = true;
    return i;
  });
  emit("update:items", itemsNew);
};
</script>
