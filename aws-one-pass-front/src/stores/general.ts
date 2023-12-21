import { defineStore } from "pinia";
export const useGeneralStore = defineStore("general", {
  state: () => ({
    openCreateModal: false,
  }),
  actions: {
    setOpenCreateModal(value: boolean) {
      this.openCreateModal = value;
    },
  },
});
