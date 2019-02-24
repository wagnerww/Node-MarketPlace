const express = require("express");
const routes = express.Router();
const validation = require("express-validation");

const authMiddleware = require("./app/middlewares/auth");

const controllers = require("./app/controllers");

const validators = require("./app/validators");

const handle = require("express-async-handler");

routes.get("/", (req, res) => {
  res.send("tudo certo");
});

routes.post(
  "/users",
  validation(validators.User),
  handle(controllers.UserController.store)
);
routes.post(
  "/sessions",
  validation(validators.Session),
  handle(controllers.SessionController.store)
);

//Daqui para baixo o usuário deve estar autenticado
routes.use(authMiddleware);

routes.get("/ads", handle(controllers.AdController.index));
routes.get("/ads/:id", handle(controllers.AdController.show));
routes.post(
  "/ads",
  validation(validators.Ad),
  handle(controllers.AdController.store)
);
routes.put(
  "/ads/:id",
  validation(validators.Ad),
  handle(controllers.AdController.update)
);
routes.delete("/ads/:id", handle(controllers.AdController.destroy));

routes.post(
  "/purchase",
  validation(validators.Purchase),
  handle(controllers.PurchaseController.store)
);

module.exports = routes;
