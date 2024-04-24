import { Router } from "express";
import {
  createBranding,
  createEvent,
  createManpower,
  createResource,
  getAllEvents,
  getEventById,
} from "../controller/eventController.js";
import { upload } from "./fileRouter.js";

let entryRouter = Router();

entryRouter.route("/events").get(getAllEvents);
entryRouter.route("/events/:eventId").get(getEventById);
entryRouter.get("/events/:id", getEventById);
entryRouter.post("/events/create", upload.single("img"), createEvent);
entryRouter.post("/events/createManpower", createManpower);
entryRouter.post("/events/createResource", createResource);
entryRouter.post("/events/createBranding", createBranding);

export default entryRouter;
