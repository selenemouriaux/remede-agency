import { createSlice } from "@reduxjs/toolkit"

const signInSlice = createSlice({
  name: "signIn",
  initialState: {
    username: "tartanpion",
    password: "petit_morpion",
    remember_me: true,
  },
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload
    },
    setPassword: (state, action) => {
      state.password = action.payload
    },
    setRememberMe: (state, action) => {
      state.remember_me = action.payload
    },
  },
})

export const reducer = signInSlice.reducer
export const { setUsername, setPassword, setRememberMe } = signInSlice.actions
