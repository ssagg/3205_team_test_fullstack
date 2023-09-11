// const express = require("express");
import express, { Express } from "express";

const router = require("./routes/index");
const cors = require("cors");
const bodyParser = require("body-parser");

const { PORT } = require("./config");

const app: Express = express();
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", router);

app.listen(PORT, (): void => {
  console.log(`App port:${PORT}`);
});
