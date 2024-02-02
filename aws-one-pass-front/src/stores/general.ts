import { defineStore } from "pinia";
export const useGeneralStore = defineStore("general", {
  state: () => ({
    openCreateModal: false,
    loading: {
      active: false,
      message: "Please wait...",
    },
  }),
  actions: {
    setOpenCreateModal(value: boolean) {
      this.openCreateModal = value;
    },
    setLoading(value: any) {
      this.loading = value;
    },
  },
});
