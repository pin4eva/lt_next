import React from "react";
import { Provider } from "react-redux";
import App from "next/app";
import withReduxStore from "../lib/with-redux-store";
import { ThemeProvider } from "theme-ui";
import theme from "../theme";

class MyApp extends App {
  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    );
  }
}

export default withReduxStore(MyApp);
