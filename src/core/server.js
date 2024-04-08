require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors");
const routes = require("../routes/api");

const app = express();
const port = process.env.PORT || 3100;

const createServer = async () => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(helmet());
  app.use(cors());

  routes(app);

  app.listen(port, () => {
    console.log(`Server started at port: ${port}! 🚀`);
  });
};

module.exports = {
  createServer,
};
