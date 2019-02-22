const express = require("express");
const mongoose = require("mongoose");
const dataBase = require("./config/database");

class App {
  constructor() {
    this.express = express();
    this.isDec = process.env.NODE_ENV != "production";
    this.middlewares();
    this.routes();
    this.database();
  }

  database() {
    mongoose.connect(dataBase.uri, {
      useCreateIndex: true,
      useNewUrlParser: true
    });
  }

  middlewares() {
    this.express.use(express.json());
  }

  routes() {
    this.express.use(require("./routes"));
  }
}
module.exports = new App().express;
