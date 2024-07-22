import axios from "axios";
// import jwt from "jsonwebtoken";

const BACKEND_APP_API_URL = "http://localhost:3000/";

export const api = axios.create({
  baseURL: BACKEND_APP_API_URL,
});

// api.interceptors.request.use(
//   async (config) => {
//     const token = getCookie("jwt");

//     if (token) {
//       const decodedToken = jwt.decode(token);
//       const currentTime = Date.now() / 1000;

//       if (decodedToken.exp < currentTime) {
//         try {
//           const response = await axios.post(
//             "http://localhost:3000/auth/refresh-token",
//             { token }
//           );
//           const newToken = response.data.access_token;
//           setCookie("jwt", newToken);
//           config.headers["Authorization"] = `Bearer ${newToken}`;
//         } catch (error) {
//           console.error("Error refreshing token", error);
//         }
//       } else {
//         config.headers["Authorization"] = `Bearer ${token}`;
//       }
//     }

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// function getCookie(name) {
//   const value = `; ${document.cookie}`;
//   const parts = value.split(`; ${name}=`);
//   if (parts.length === 2) return parts.pop().split(";").shift();
// }

// function setCookie(name, value) {
//   document.cookie = `${name}=${value}; path=/`;
// }
