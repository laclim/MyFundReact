import { useRouter } from "next/router";
import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { colors, Container, Grid, makeStyles, Paper } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import PortfolioCard from "../../src/component/PortfolioCard";
import theme from "../../src/theme";
import { useContextState } from "../../src/context";
import Button from "@material-ui/core/Button/Button";
import Link from "next/link";
const useStyles = makeStyles({
  paperCard: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
  },
});
const Portfolio = () => {
  const classes = useStyles();
  const { userId } = useContextState();
  const router = useRouter();
  const [fund, setFund] = useState({
    user: { name: "" },
    history: [],
    portfolio: { marketPortfolio: [] },
  });
  const [isMyFund, setIsMyFund] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (router && router.query.id) {
      axios.get(`/fund/${router.query.id}`).then((res) => {
        const fund = res.data.data;
        setFund(fund);
        if (fund.user._id == userId) {
          setIsMyFund(true);
        } else {
          setIsMyFund(false);
        }
        setLoading(false);
      });
    }
  }, [router, userId]);
  if (loading) {
    return <CircularProgress />;
  } else {
    return (
      <React.Fragment>
        {isMyFund && (
          <Link href="/fund/manage">
            <Button color="secondary" variant="contained">
              Manage Fund
            </Button>
          </Link>
        )}
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <PortfolioCard marketPortfolio={fund.portfolio.marketPortfolio} />
          </Grid>
          <Grid item xs={6}>
            Daily Changes
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
};

export async function getServerSideProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  };
}

export default Portfolio;
