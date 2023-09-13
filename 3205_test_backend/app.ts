import express, { Express } from "express";

const router = require("./routes/index");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const bodyParser = require("body-parser");
const { errorsLogger } = require("./middlewares/logger");
const { errors } = require("celebrate");
const error = require("./middlewares/error");
const { requestsLogger } = require("./middlewares/logger");
const limiterConfig = require("./utils/limiterConfig");
const { PORT } = require("./config");

const app: Express = express();
const limiter = rateLimit(limiterConfig);

app.use(requestsLogger);
app.use(helmet());
app.use(limiter);
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", router);
app.use(errorsLogger);
app.use(errors());
app.use(error);

app.listen(PORT, (): void => {
  console.log(`App port:${PORT}`);
});
