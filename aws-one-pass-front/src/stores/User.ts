import { defineStore } from "pinia";
import ApiService from "../Helpers/ApiService";
import { LocalStorage } from "quasar";
import { Amplify } from "aws-amplify";
import { signIn, signOut, fetchAuthSession } from "aws-amplify/auth";
Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: process.env.COGNITO_USER_POOL_ID || "",
      userPoolClientId: process.env.COGNITO_CLIENT_ID || "",
    },
  },
});
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
    async currentSession() {
      try {
        const token: any = (await fetchAuthSession()).tokens ?? {};
        console.log("TOKEN:::", token);

        if (token && token.idToken) {
          LocalStorage.set("token", {
            id_token: token.idToken.toString(),
          });
          this.setToken({
            id_token: token.idToken.toString(),
          });
        }

        return token;
      } catch (err) {
        console.log(err);
      }
    },
    async logIn(username: string, password: string) {
      try {
        const { isSignedIn, nextStep } = await signIn({ username, password });
        return isSignedIn;
      } catch (error) {
        console.log("error signing in", error);
        return error;
      }
    },
    async logOut() {
      try {
        await signOut({ global: true });
        LocalStorage.clear();
        return true;
      } catch (error) {
        console.log("error signing out: ", error);
        return error;
      }
    },
    setAccessCode(code: any) {
      this.access_code = code;
      this.getTokenCognito();
    },
    setToken(token: any) {
      this.token = token;
    },
  },
});
