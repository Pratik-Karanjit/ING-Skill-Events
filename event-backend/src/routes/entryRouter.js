import { Router } from "express";
import {
  createEvent,
  getAllEvents,
  getEventById,
} from "../controller/eventController.js";
import { upload } from "./fileRouter.js";

let entryRouter = Router();

entryRouter.route("/events").get(getAllEvents);
entryRouter.route("/events/:eventId").get(getEventById);
entryRouter.get("/events/:id", getEventById);
entryRouter.post("/events/create", upload.single("img"), createEvent);

export default entryRouter;
