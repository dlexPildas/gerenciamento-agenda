const { Router } = require("express");

const UserController = require("./app/controllers/UserController");

const SessionController = require("./app/controllers/SessionController");

const routes = new Router();

/**
 * Session's routes
 */

routes.post("/session", SessionController.store);

/**
 * User's routes
 */
routes.post("/user", UserController.store);

module.exports = routes;
