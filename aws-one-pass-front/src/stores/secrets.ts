import { defineStore } from "pinia";
export const useSecretStore = defineStore("secrets", {
  state: () => ({
    secrets: [
      {
        name: "Access personal Web page",
        username: "alejandro.castaneda",
        password: "Alejo1026150902?",
        url: "https://alejandro.awslearn.cloud",
        vault: "Personal",
        updated_at: "2023-10-10 23:00",
        created_at: "2023-10-10 23:00",
        selected: false,
      },
      {
        name: "SSO personal",
        username: "alejandro.castaneda",
        password: "Alejo1026150902?",
        url: "https://alejandro.awslearn.cloud",
        vault: "Personal",
        updated_at: "2023-10-10 23:00",
        created_at: "2023-10-10 23:00",
        selected: false,
      },
      {
        name: "SSO portal",
        username: "alejandro.castaneda",
        password: "Alejo1026150902?",
        url: "https://alejandro.awslearn.cloud",
        vault: "Ibcobros",
        updated_at: "2023-10-10 23:00",
        created_at: "2023-10-10 23:00",
        selected: false,
      },
    ],
    secret: null,
  }),
  actions: {
    setSecret(secret) {
      this.secret = secret;
    },
  },
});
