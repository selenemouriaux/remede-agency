import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: {
      firstName: null,
      lastName: null,
      email: "email",
      password: null,
    },
    remember_me: false,
    isLoggedIn: false,
  },
  reducers: {
    setUserFirstName: (state, action) => {
      state.userInfo.firstName = action.payload
    },
    setUserLastName: (state, action) => {
      state.userInfo.lastName = action.payload
    },
    setUserEmail: (state, action) => {
      state.userInfo.email = action.payload
    },
    setUserPassword: (state, action) => {
      state.userInfo.password = action.payload
    },
    setRememberMe: (state, action) => {
      state.remember_me = action.payload
    },
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload
    },
  },
})

export const reducer = userSlice.reducer
export const {
  setUserEmail,
  setUserPassword,
  setUserFirstName,
  setUserLastName,
  setRememberMe,
  setIsLoggedIn,
} = userSlice.actions
