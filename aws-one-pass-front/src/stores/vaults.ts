import { defineStore } from "pinia";
export const useVaultStore = defineStore("vaults", {
  state: () => ({
    vaults: ["Default", "Personal", "Dev", "Prod"],
    vault: null,
  }),
  actions: {},
});
