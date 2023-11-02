import { defineStore } from "pinia";
import ApiService from "../Helpers/ApiService";
import { LocalStorage } from "quasar";
export const useUserStore = defineStore("user", {
  state: () => ({
    users: [],
    user: null,
    token: null,
    access_code: null,
  }),
  actions: {
    getTokenCognito() {
      return new Promise((resolve, reject) => {
        ApiService()
          .getCognitoToken(this.access_code)
          .then((token) => {
            LocalStorage.set("token", token);
            window.location.href = window.location.origin;
          });
      });
    },
    logOut() {
      return new Promise((resolve, reject) => {
        ApiService()
          .get("/api/logout")
          .then((response) => {
            this.token = null;
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    setAccessCode(code: any) {
      this.access_code = code;
      this.getTokenCognito();
    },
    setToken(token: any) {
      this.token = token;
    },
    getUsers(
      page: Number = 1,
      rowsPerPage: Number = 25,
      filter: any,
      onlyStudentTeacher: Boolean = false
    ) {
      return new Promise((resolve, reject) => {
        ApiService()
          .get(
            `/api/user/list${`?page=${page}`}&rows=${rowsPerPage}&filter=${filter}&onlyStudentTeacher=${onlyStudentTeacher}`
          )
          .then((response) => {
            // console.log("RESPUESTA USERS:::", response.data);
            this.users = response.data.data.data;
            resolve(response.data.data.data);
          })
          .catch((error) => {
            // console.log("ERROR USERS:::", error);
            reject(error);
          });
      });
    },
    createUser(user: any) {
      return new Promise((resolve, reject) => {
        ApiService()
          .post(`/api/user/create`, user)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => reject(error));
      });
    },
    getUser(id: Number) {
      return new Promise((resolve, reject) => {
        ApiService()
          .get(`/api/user/get/${id}`)
          .then((response) => {
            this.user = response.data.data;
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    updateUser(user: any) {
      user.tipo_personas_id_fk = user.tipo_personas_id_fk.value;
      return new Promise((resolve, reject) => {
        ApiService()
          .put(`/api/user/update`, user)
          .then((response) => {
            console.log("Update usuario:::", response.data);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    deleteUser(id: Number) {
      return new Promise((resolve, reject) => {
        ApiService()
          .remove(`/api/user/delete/${id}`)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
});
