// src/pages/HomeWeb.js

import React from "react";
import { Grid, Container } from "@mui/material";
import NetWorth from "../components/NetWorth";
import { Spending } from "../components/Spending";
import News from "../components/News";
import Notifications from "../components/Notifications";
import FutureMe from "../components/FutureMe";

function HomeWeb() {
  return (
    <Container maxWidth="lg">
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <NetWorth />
        </Grid>
        <Grid item xs={12} md={6}>
          <Spending />
        </Grid>
        <Grid item xs={12} md={6}>
          <News />
        </Grid>
        <Grid item xs={12} md={6}>
          <Notifications />
        </Grid>
        <Grid item xs={12}>
          <FutureMe />
        </Grid>
      </Grid>
    </Container>
  );
}

export default HomeWeb;
