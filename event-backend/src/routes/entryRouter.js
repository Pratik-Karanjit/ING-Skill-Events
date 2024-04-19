import { Router } from "express";
import { getAllEvents, getEventById } from "../controller/eventController.js";

let entryRouter = Router();

entryRouter.route("/events").get(getAllEvents);
entryRouter.route("/events/:eventId").get(getEventById);
entryRouter.get("/events/:id", getEventById);

export default entryRouter;
