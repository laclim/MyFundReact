import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../src/theme";
import SiteLayout from "../src/component/SiteLayout";
import { BrowserRouter as Router } from "react-router-dom";
import CustomSnackbar from "../src/component/CustomSnackbar";
import Context from "../src/context";
import axios from "axios";
import getConfig from "next/config";
import cookies from "next-cookies";
import Cookies from "universal-cookie";
import { useRouter } from "next/router";
// Only holds serverRuntimeConfig and publicRuntimeConfig
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();
export default function MyApp(props) {
  const { Component, pageProps, serverProps } = props;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  const router = useRouter();
  const clientCookies = new Cookies();

  axios.defaults.baseURL = publicRuntimeConfig.baseURL;
  axios.defaults.withCredentials = true;
  console.log(publicRuntimeConfig.NODE_ENV);
  if (publicRuntimeConfig.NODE_ENV === "development") {
    axios.defaults.headers.Authorization = `Bearer ${clientCookies.get(
      "token"
    )}`;
  }
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        router.push("/");
      }
      return error;
    }
  );
  return (
    <React.Fragment>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Context loggedIn={serverProps.loggedIn} user={serverProps.user}>
          <SiteLayout>
            <Component {...pageProps} />
            <CustomSnackbar />
          </SiteLayout>
        </Context>
      </ThemeProvider>
    </React.Fragment>
  );
}

MyApp.getInitialProps = async (ctx) => {
  let cookie = { token: "" };
  let loggedIn = false;
  let user = { userId: "", displayName: "" };

  if (ctx.ctx.req) {
    console.log(ctx.ctx.req.headers.cookie);
    cookie.token = cookies(ctx.ctx).token;
    axios.defaults.headers.Authorization = `Bearer ${cookie.token}`;
    await axios
      .get("/me")
      .then((res) => {
        const userData = res.data.data;

        user = { userId: userData._id, displayName: userData.name };
        loggedIn = true;
        console.log(user);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return { pageProps: { cookie }, serverProps: { loggedIn, user } };
};

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
