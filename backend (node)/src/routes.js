const { Router } = require("express");

const authorization = require("./app/middleware/auth");

const UserController = require("./app/controllers/UserController");

const SessionController = require("./app/controllers/SessionController");

const ScheduleController = require("./app/controllers/ScheduleController");

const EventController = require("./app/controllers/EventController");

const EventUserController = require("./app/controllers/EventUserController");

const routes = new Router();

/**
 * Session's routes
 */
routes.post("/session", SessionController.store);

/**
 * User's routes
 */
routes.get("/user", authorization, UserController.index);
routes.post("/user", UserController.store);

/**
 * Schedule's routes
 */
routes.post("/schedule", authorization, ScheduleController.store);

/**
 * event's routes
 */
routes.get("/event", authorization, EventController.index);
routes.get("/event/:all", authorization, EventController.index);
routes.get("/event/:id/:name", authorization, EventController.show);
routes.post("/event", authorization, EventController.store);
routes.put("/event", authorization, EventController.update);
routes.delete("/event", authorization, EventController.delete);

/**
 * EventUser's routes
 */
routes.post("/userToEvent", authorization, EventUserController.store);
routes.get("/userToEvent/:event_id", authorization, EventUserController.index);
module.exports = routes;
