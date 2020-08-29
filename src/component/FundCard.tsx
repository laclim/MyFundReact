import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Link from "next/link";

import {
  Box,
  ButtonBase,
  colors,
  Grid,
  IconButton,
  Paper,
} from "@material-ui/core";
import { useState } from "react";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import { timeToDisplay } from "../utils";
import theme from "../theme";
const useStyles = makeStyles({
  root: {
    maxWidth: 500,
    margin: theme.spacing(2),
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 12,
  },
  name: {
    fontSize: 14,
    display: "initial",
    verticalAlign: "middle",
  },
  gain: {
    color: colors.lightGreen[500],
  },
  loss: {
    color: colors.red[500],
  },
  pos: { textAlign: "center" },

  cardAction: {
    display: "block",
    textAlign: "initial",
    width: "100%",
  },
});

export default function FundCard({ fund }) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  const [totalAmountInvested, setTotalAmountInvested] = useState(0);

  useEffect(() => {
    const marketPortfolio = fund.portfolio.marketPortfolio;
    let total = 0;
    marketPortfolio.forEach((el) => {
      total += el.volume * el.avgPrice;
    });
    setTotalAmountInvested(total);
  }, []);

  return (
    <Card className={classes.root} variant="outlined">
      <ButtonBase className={classes.cardAction}>
        <Link href={"/fund/[id]"} as={"/fund/" + fund._id}>
          <CardContent>
            <Box display="flex" flexDirection="row">
              <Box p={1}>
                <PermIdentityIcon />
              </Box>
              <Box p={1}>
                <Typography className={classes.name}>
                  {fund.user.name}
                </Typography>
              </Box>
            </Box>

            <Box
              display="flex"
              flexDirection="row"
              justifyContent="center"
              flexWrap="wrap"
            >
              <Box p={1} className={classes.pos}>
                <Typography>$ {fund.initialAmount}</Typography>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  Initial Amount
                </Typography>
              </Box>
              <Box p={1} className={classes.pos}>
                <Typography>$ {totalAmountInvested}</Typography>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  Invested Amount
                </Typography>
              </Box>
              <Box p={1} className={classes.pos}>
                <Typography
                  className={
                    fund.lastDayGain.profitPercentage > 0
                      ? classes.gain
                      : fund.lastDayGain.profitPercentage < 0
                      ? classes.loss
                      : ""
                  }
                >
                  ${" "}
                  {(
                    fund.initialAmount * fund.lastDayGain.profitPercentage
                  ).toFixed(4)}{" "}
                  ({fund.lastDayGain.profitPercentage > 0 && "+"}
                  {(fund.lastDayGain.profitPercentage * 100).toFixed(4)}%)
                </Typography>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  {timeToDisplay(fund.lastDayGain.createdAt)}
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Link>
      </ButtonBase>
      <CardActions>
        <Button size="small">
          <FormatListBulletedIcon />
        </Button>
      </CardActions>
    </Card>
  );
}
