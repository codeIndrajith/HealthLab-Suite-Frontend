import { configureStore } from "@reduxjs/toolkit";

// reducers
import AuthReducer from "./slices/authSlice";

const store = configureStore({
  reducer: {
    auth: AuthReducer,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
