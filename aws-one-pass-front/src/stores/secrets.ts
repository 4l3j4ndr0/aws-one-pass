import { defineStore } from "pinia";
import ApiService from "../Helpers/ApiService";

export const useSecretStore = defineStore("secrets", {
  state: () => ({
    secrets: [],
    vaults: [],
    secret: null,
  }),
  actions: {
    setSecret(secret: any) {
      this.secret = secret;
    },
    getSecrets(action = "getAll", filter = "") {
      return new Promise((resolve: any, reject: any) => {
        ApiService()
          .get(`/secrets?action=${action}&filter=${filter}`)
          .then((response) => {
            console.log("RESPONSE SECRETS:::", response.data);
            this.secrets = response.data;
            this.vaults = response.data.map((i: any) => i.vault);
            this.vaults = this.vaults.filter(
              (value, index, self) => self.indexOf(value) === index
            );
            resolve(response.data);
          })
          .catch((e: any) => {
            console.log("ERROR:::::", e);
            reject(e);
          });
      });
    },
    getSecret(id: string) {
      return new Promise((resolve: any, reject: any) => {
        ApiService()
          .get(`/secrets?action=getOne&id=${id}`)
          .then((response) => {
            console.log("RESPONSE SECRET:::", response.data);
            this.secret = response.data;
            resolve(response.data);
          })
          .catch((e: any) => {
            console.log("ERROR:::::", e);
            reject(e);
          });
      });
    },
    updateSecret() {
      let data: any = this.secret;
      delete data.updated_at;
      return new Promise((resolve: any, reject: any) => {
        ApiService()
          .put(`/secrets`, data)
          .then((response) => {
            console.log("RESPONSE UPDATE SECRET:::", response.data);
            resolve(response.data);
          })
          .catch((e: any) => {
            console.log("ERROR:::::", e);
            reject(e);
          });
      });
    },
    createSecret(secret: any) {
      return new Promise((resolve: any, reject) => {
        ApiService()
          .post("/secrets", secret)
          .then((response) => {
            resolve(response.data);
          })
          .catch((e) => {
            reject(e);
          });
      });
    },
  },
});
