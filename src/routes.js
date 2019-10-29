const { Router } = require("express");

const authorization = require("./app/middleware/auth");

const UserController = require("./app/controllers/UserController");

const SessionController = require("./app/controllers/SessionController");

const ScheduleController = require("./app/controllers/ScheduleController");

const EventController = require("./app/controllers/EventController");

const routes = new Router();

/**
 * Session's routes
 */
routes.post("/session", SessionController.store);

/**
 * User's routes
 */
routes.post("/user", UserController.store);

/**
 * Schedule's routes
 */
routes.post("/schedule", authorization, ScheduleController.store);

/**
 * event's routes
 */
routes.post("/event", authorization, EventController.store);

module.exports = routes;
