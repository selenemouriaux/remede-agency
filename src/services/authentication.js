import { baseApi } from "./baseApi"

export async function signup(email, password, firstName, lastName) {
  return baseApi
    .post("/user/signup", { email, password, firstName, lastName })
    .then((res) => res.data)
}

export async function login(email, password) {
  return baseApi
    .post("/user/login", { email, password })
    .then((res) => res.data)
}
