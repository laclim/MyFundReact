import Head from "next/head";
import React, { useEffect, useState } from "react";
import getConfig from "next/config";
import Button from "@material-ui/core/Button";
import App, { Container } from "next/app";
import { useContextState, useContextDispatch } from "../src/context";
import { Typography } from "@material-ui/core";
import axios from "axios";
import FundCard from "../src/component/FundCard";
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();
function Home() {
  return (
    <div className="container">
      <Head>
        <title>MyFund</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Index />
    </div>
  );
}

function Index() {
  const dispatch = useContextDispatch();

  const { count } = useContextState();
  const [fundList, setFundList] = useState([]);
  useEffect(() => {
    axios.get("/funds").then((res) => {
      console.log(res.data);
      setFundList(res.data.data);
    });
  }, []);
  return (
    <Container>
      {fundList.map((el) => (
        <FundCard fund={el} key={el._id} />
      ))}
    </Container>
  );
}

Home.getInitialProps = async (appContext) => {
  // const appProps = await App.getInitialProps(appContext);
  console.log(publicRuntimeConfig.baseURL);
  return { asd: "sadas" };
};

export default Home;
