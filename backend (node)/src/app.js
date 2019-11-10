require("dotenv/config");

const express = require("express");
const cors = require("cors");

const routes = require("./routes");

require("./database/index");

class App {
  constructor() {
    this.server = express();

    this.midlewares();
    this.routes();
  }

  midlewares() {
    this.server.use(express.json());
    this.server.use(cors());
  }

  routes() {
    this.server.use(routes);
  }
}

module.exports = new App().server;
