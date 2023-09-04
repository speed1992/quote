import { configureStore } from "@reduxjs/toolkit";
import { getPersistConfig } from "redux-deep-persist";
import { persistReducer, persistStore } from "redux-persist";
import DBstorage from "redux-persist-indexeddb-storage";
import philosophersDataReducer from "../../components/organisms/home/home-page/homePageRedux/homePageRedux";
import { querySync } from "../settings/redux-query-sync";
import { isClient, isServer } from "../utils/utils";
import { createNoopStorage } from "./utils/storageUtils";

console.log("isServer()", isServer());
const newPersistConfig = getPersistConfig({
  key: "root",
  storage: isServer() ? createNoopStorage() : DBstorage("myDB"),
  blacklist: [
    "currentData",
    "originalData",
    "quotesLoaded",
    "currentPhilosopher",
  ],
  rootReducer: philosophersDataReducer,
});

export const philosophersDataSlice = persistReducer(
  newPersistConfig,
  philosophersDataReducer
);

export const store = configureStore({
  reducer: {
    philosophersData: philosophersDataSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV !== "production",
});

if (isClient()) querySync();

export const persistor = persistStore(store);
