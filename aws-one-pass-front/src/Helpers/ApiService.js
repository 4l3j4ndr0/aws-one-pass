import a from "axios";
const axios = a.create({
  baseURL: process.env.API_URL,
});

const axiosCognito = a.create({
  baseURL: process.env.COGNITO_URL,
});
import { useUserStore } from "../stores/User";
import { useQuasar } from "quasar";
export default function () {
  const user = useUserStore();
  const getCognitoToken = (code) => {
    return new Promise((resolve, reject) => {
      const data = new URLSearchParams();
      data.append("grant_type", "authorization_code");
      data.append("client_id", process.env.COGNITO_CLIENT_ID);
      data.append("code", code);
      data.append("redirect_uri", window.location.origin);

      axiosCognito
        .post(`/oauth2/token`, data, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        })
        .then((response) => {
          // console.log("RESPONSE:::", response.data);
          user.setToken(response.data);
          resolve(response.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  const post = (url, data) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`${url}`, data, {
          headers: {
            Authorization: `Bearer ${user.token.id_token}`,
          },
        })
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  const get = (url) => {
    return new Promise((resolve, reject) => {
      axios
        .get(`${url}`, {
          headers: {
            Authorization: `Bearer ${user.token.id_token}`,
          },
        })
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          console.log("ERRROR:::::", err);
          reject(err);
        });
    });
  };

  const remove = (url) => {
    return new Promise((resolve, reject) => {
      axios
        .delete(`${url}`, {
          headers: {
            Authorization: ` Bearer ${user.token.id_token}`,
          },
        })
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  const put = (url, data) => {
    return new Promise((resolve, reject) => {
      axios
        .put(`${url}`, data, {
          headers: {
            Authorization: `Bearer ${user.token.id_token}`,
          },
        })
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  return {
    post,
    get,
    remove,
    put,
    getCognitoToken,
  };
}
