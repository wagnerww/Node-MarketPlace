const nodemailer = require("nodemailer");
const mailconfig = require("../../config/mail");
const path = require("path");
const hbs = require("nodemailer-express-handlebars");
const exphbs = require("express-handlebars");

const transport = nodemailer.createTransport(mailconfig);

transport.use(
  "compile",
  hbs({
    viewEngine: exphbs(),
    viewPath: path.resolve(__dirname, "..", "views", "emails"),
    extName: ".hbs"
  })
);

module.exports = transport;
