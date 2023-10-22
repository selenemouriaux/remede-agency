import { configureStore } from "@reduxjs/toolkit"
import { reducer } from "./signInSlice"

export const store = configureStore({
  reducer,
})
