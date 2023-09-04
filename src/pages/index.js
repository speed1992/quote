import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import HomePage from "@/components/organisms/home/home-page/home-page";
import SnackbarProvider from "react-simple-snackbar";
import { persistor, store } from "@/common/redux/store";
import { isServer } from "@/common/utils/utils";

export default function Home() {
  return (
    <Provider store={store}>
      {isServer() ? (
        <HomePage />
      ) : (
        <PersistGate loading={null} persistor={persistor}>
          <SnackbarProvider>
            <HomePage />
          </SnackbarProvider>
        </PersistGate>
      )}
    </Provider>
  );
}
