<template>
  <q-card style="cursor: pointer" class="q-ma-sm" v-for="item in props.items">
    <q-card-section
      @click="onIntemSelect(item)"
      :class="item.selected ? 'bg-grey-7 text-white' : ''"
    >
      <div>{{ `${item.name} (${item.vault})` }}</div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { ref, defineEmits, computed } from "vue";
const props = defineProps(["items"]);
const emit = defineEmits(["update:items", "onItemSelect"]);

const onIntemSelect = (item) => {
  emit("onItemSelect", item);
  const itemsNew = props.items.map((i) => {
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
