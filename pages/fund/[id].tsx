import { useRouter } from "next/router";
import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { colors, Container, Grid, makeStyles, Paper } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import PortfolioCard from "../../src/component/PortfolioCard";
import theme from "../../src/theme";
const useStyles = makeStyles({
  paperCard: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
  },
});
const Portfolio = () => {
  const classes = useStyles();
  const router = useRouter();
  const [fund, setFund] = useState({
    user: { name: "" },
    history: [],
    portfolio: { marketPortfolio: [] },
  });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (router && router.query.id) {
      axios.get(`/fund/${router.query.id}`).then((res) => {
        console.log(res.data);
        setFund(res.data.data);
        setLoading(false);
      });
    }
  }, [router]);
  if (loading) {
    return <CircularProgress />;
  } else {
    return (
      <React.Fragment>
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

export default Portfolio;
