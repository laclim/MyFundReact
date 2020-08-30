import classes from "*.module.css";
import {
  Box,
  Container,
  List,
  ListItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
const useStyles = makeStyles({
  table: {
    minWidth: "auto",
  },
});
const PortfolioCard = ({ marketPortfolio }) => {
  const classes = useStyles();
  const [marketCurrentPrice, setMarketCurrentPrice] = useState([]);
  const [portfolioTable, setPortfolioTable] = useState([]);
  const [totalPL, setTotalPL] = useState({
    totalCurrentAmount: 0,
    totalInititalAmount: 0,
    totalUnrealizedProfit: 0,
  });
  useEffect(() => {
    let marketCodes = [];
    marketPortfolio.forEach((el) => {
      marketCodes.push(el.market);
    });
    axios.get(`/market?marketCodes=${marketCodes.toString()}`).then((res) => {
      setMarketCurrentPrice(res.data.data);
    });
  }, []);
  useEffect(() => {
    let table = [];
    if (marketCurrentPrice.length) {
      let totalInititalAmount = 0;
      let totalUnrealizedProfit = 0;
      let totalCurrentAmount = 0;
      marketPortfolio.forEach((el) => {
        const currentMarketPrice = getMarketPrice(el.market);
        const plPercentage = calcProfitPercentage(
          el.avgPrice,
          parseFloat(currentMarketPrice)
        );
        const inititalAmount = el.avgPrice * el.volume;
        const plAmount = currentMarketPrice * el.volume;
        const unRealizedProfit = plAmount - inititalAmount;
        totalUnrealizedProfit += unRealizedProfit;
        totalInititalAmount += inititalAmount;
        totalCurrentAmount += plAmount;
        table.push({
          ...el,
          currentMarketPrice,
          plPercentage,
          inititalAmount,
          unRealizedProfit,
          plAmount,
        });
      });
      setPortfolioTable(table);
      setTotalPL({
        totalInititalAmount,
        totalUnrealizedProfit,
        totalCurrentAmount,
      });
    }
  }, [marketCurrentPrice]);

  const getMarketPrice = (code) => {
    if (marketCurrentPrice.length) {
      const market = marketCurrentPrice.find(function (el) {
        return el._id == code;
      });
      return market.price[0].closingPrice.toFixed(2);
    }
  };

  const calcProfitPercentage = (p1, p2) => {
    return ((p2 - p1) / p1) * 100;
  };
  return (
    <React.Fragment>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">Market</TableCell>
              <TableCell align="right">Volume</TableCell>
              <TableCell align="right">Average Price</TableCell>
              <TableCell align="right">Current Price</TableCell>
              <TableCell align="right">Initital Amount</TableCell>
              <TableCell align="right">Current Amount</TableCell>
              <TableCell align="right">P/L (S)</TableCell>
              <TableCell align="right">P/L (%)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {portfolioTable.map((row) => (
              <TableRow key={row._id}>
                <TableCell scope="row">{row.market}</TableCell>
                <TableCell align="right">{row.volume}</TableCell>
                <TableCell align="right">${row.avgPrice}</TableCell>
                <TableCell align="right">${row.currentMarketPrice}</TableCell>
                <TableCell align="right">
                  ${row.inititalAmount.toFixed(2)}
                </TableCell>
                <TableCell align="right">${row.plAmount.toFixed(2)}</TableCell>
                <TableCell align="right">
                  <Box
                    color={
                      row.unRealizedProfit > 0 ? "success.main" : "error.main"
                    }
                  >
                    ${row.unRealizedProfit.toFixed(2)}
                  </Box>
                </TableCell>
                <TableCell align="right">
                  <Box color={row.plPercentage > 0 ? "success.main" : "error"}>
                    {row.plPercentage.toFixed(2)}%
                  </Box>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell rowSpan={1} />
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell align="right">
                {totalPL.totalInititalAmount.toFixed(2)}
              </TableCell>
              <TableCell align="right">
                {totalPL.totalCurrentAmount.toFixed(2)}
              </TableCell>
              <TableCell align="right">
                <Box
                  color={
                    totalPL.totalUnrealizedProfit > 0 ? "success.main" : "error"
                  }
                >
                  ${totalPL.totalUnrealizedProfit.toFixed(2)}
                </Box>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
};

export default PortfolioCard;
