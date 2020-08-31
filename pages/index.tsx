import Head from "next/head";
import Document from "next/document";
import React, { useEffect, useState } from "react";
import getConfig from "next/config";
import Button from "@material-ui/core/Button";
import App, { Container } from "next/app";
import { useContextState, useContextDispatch } from "../src/context";
import { Typography } from "@material-ui/core";
import axios from "axios";
import FundCard from "../src/component/FundCard";
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();
function Home({ ...props }) {
  return (
    <div className="container">
      <Head>
        <title>My Fund</title>

        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="A long term investment portfolio which target 30% gain each year"
        ></meta>
        <meta
          name="keywords"
          content="invest, portfolio, fund, gold, economic, silver, gold stock"
        />
        <meta
          property="og:title"
          content="A list of portfolio which is managed by Mr Lim An Chong"
          key="title"
        />

        <meta property="og:image" content="/images/fund.jpg" />
      </Head>
      <Index />
    </div>
  );
}

function Index() {
  const dispatch = useContextDispatch();
  const { userId, displayName } = useContextState();
  const [fundList, setFundList] = useState([]);
  useEffect(() => {
    axios.get("/funds").then((res) => {
      setFundList(res.data.data);
    });
  }, []);
  return (
    <Container>
      {userId}
      {displayName}
      {fundList.map((el) => (
        <FundCard fund={el} key={el._id} />
      ))}
    </Container>
  );
}

// export async function getStaticProps({ params }) {
//   console.log(params);
//   return {
//     props: { ada: "123" }, // will be passed to the page component as props
//   };
// }

export default Home;
