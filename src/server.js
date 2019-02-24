require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const dataBase = require("./config/database");
const validator = require("express-validation");
const Youch = require("youch");
const Sentry = require("@sentry/node");
const sentryConfig = require("./config/sentry");

class App {
  constructor() {
    this.express = express();
    this.isDec = process.env.NODE_ENV != "production";
    this.sentry();
    this.middlewares();
    this.routes();
    this.database();
    this.exception();
  }

  database() {
    mongoose.connect(dataBase.uri, {
      useCreateIndex: true,
      useNewUrlParser: true
    });
  }

  middlewares() {
    this.express.use(express.json());
    this.express.use(Sentry.Handlers.requestHandler());
  }

  routes() {
    this.express.use(require("./routes"));
  }

  exception() {
    if (process.env.NODE_ENV === "production") {
      this.express.use(Sentry.Handlers.errorHandler());
    }

    this.express.use(async (err, req, res, next) => {
      //Erro de validação
      if (err instanceof validator.ValidationError) {
        return res.status(err.status).json(err);
      }

      if (process.env.NODE_ENV != "production") {
        const youch = new Youch(err);
        const json = await youch.toJSON();
        res.json(json);
      }

      //Erros gerais da pp
      return res
        .status(err.status || 500)
        .json({ error: "Internal server erro" });
    });
  }

  sentry() {
    Sentry.init(sentryConfig);
  }
}
module.exports = new App().express;
