import axios from "axios";
import { parseCookies } from "nookies";

export const api = axios.create({
  baseURL: "http://localhost:8080/api/v1/",
});
api.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

const { fin_auth_token: token } = parseCookies();

if (token) {
  const data = JSON.parse(token);
  console.log(data.token, 55555555);
  
  api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
}
